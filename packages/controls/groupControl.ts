import { merge, Observable, Subject, Subscription } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

import {
  CreateControlParams,
  FormGroupControlsConfig,
  FormGroupOptions,
  GroupControls,
  GroupValue,
} from "../types/control";
import { createControl } from "../utils";

import { AbstractControl } from "./abstractControl";

export class GroupControl extends AbstractControl<GroupValue> {
  get controls(): GroupControls {
    return this._controls;
  }

  get controlsChange() {
    return this.controlsSubject.asObservable().pipe(takeUntil(this.destroy$));
  }

  private _controls!: GroupControls;

  private controlsSubject = new Subject<GroupControls>();

  /**
   * @private controlsChangeNotifyLock
   * Prevent frequent triggering of ValueChangeCallback when setting Value
   */
  private valueChangesSubscription!: Subscription;
  private validChangesSubscription!: Subscription;

  constructor(controlsConfig: FormGroupControlsConfig, options: FormGroupOptions = {}) {
    super();
    this.initControls(controlsConfig);
    this.initBasicParams(this.getGroupValueFromControls(), options);

    this.resetGraph();
    this.controlsChange.subscribe(this.updatePrivateControlsAndResetSubscribeGraph);
  }

  get = <C extends AbstractControl<any>>(name: string): C => {
    return this._controls[name] as C;
  };

  override setValue = (value: GroupValue) => {
    if (value === this.value) {
      return;
    }
    /**
     * destroyGraph avoid multiple trigger group valueChange
     */
    this.destroyGraph();

    this.setValueToControls(value);

    this.valueSubject$.next(this.getGroupValueFromControls());
    this.validSubject$.next(this.checkValid());

    this.resetGraph();
  };

  override reset = () => {
    this.destroyGraph();

    Object.values(this.controls).forEach((control) => control.reset());

    this.valueSubject$.next(this.getGroupValueFromControls());
    this.validSubject$.next(this.checkValid());

    this.resetGraph();
  };

  add = (name: string, params: CreateControlParams) => {
    /**
     * reject control of the same name
     */
    if (this.controls[name]) {
      // eslint-disable-next-line no-console
      console.warn(`already has control named ${name} in formGroup`);
      return;
    }

    const controls = Object.assign({}, this.controls, {
      [name]: createControl(params),
    });

    this.controlsSubject.next(controls);
  };

  remove = (name: string) => {
    /**
     * reject control of the same name
     */
    if (!this.controls[name]) {
      // eslint-disable-next-line no-console
      console.warn(`cannot find control named ${name} in formGroup`);
      return;
    }

    const controls = Object.assign({}, this.controls);
    delete controls[name];

    this.controlsSubject.next(controls);
  };

  /**
   * has group level error or has invalid controls
   */
  protected checkValid = () => {
    return !(this.errors || Object.values(this._controls).some((control) => control.invalid));
  };

  private initControls = (controlsConfig: FormGroupControlsConfig) => {
    const controls: GroupControls = {};

    for (const controlKey in controlsConfig) {
      if (Object.prototype.hasOwnProperty.call(controlsConfig, controlKey)) {
        const config = controlsConfig[controlKey];
        const childControl = createControl(config);
        childControl.parent = this;
        controls[controlKey] = childControl;
      }
    }

    this._controls = controls;
  };

  private setValueToControls = (value: GroupValue) => {
    Object.keys(this._controls).forEach((name) => {
      const hasKey = Object.prototype.hasOwnProperty.call(value, name);
      hasKey && this._controls[name].setValue(value[name]);
    });
  };

  private updatePrivateControlsAndResetSubscribeGraph = (controls: GroupControls) => {
    this.updatePrivateControls(controls);
    this.valueSubject$.next(this.getGroupValueFromControls());
    this.resetGraph();
  };

  private updatePrivateControls = (controls: GroupControls) => {
    this._controls = controls;
  };

  private getGroupValueFromControls = () => {
    const value: GroupValue = {};
    Object.keys(this._controls).forEach((name) => {
      const control = this._controls[name];
      if (control.enabled) {
        value[name] = control.value;
      }
    });

    return value;
  };

  /**
   * build the flow of group and children controls
   */
  private resetGraph = () => {
    const controls = Object.values(this._controls);
    const valueChanges = controls.map((control) => control.valueChange);
    const validChanges = controls.map((control) => control.validChange);
    const disabledChanges = controls.map((control) => control.disabledChange);

    this.resetValueGraph([...valueChanges, ...disabledChanges]);
    this.resetValidGraph(validChanges);
  };

  private destroyGraph = () => {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }

    if (this.validChangesSubscription) {
      this.validChangesSubscription.unsubscribe();
    }
  };

  private resetValueGraph(changes: Observable<any>[]) {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }

    this.valueChangesSubscription = merge(...changes)
      .pipe(
        takeUntil(this.destroy$),
        map(() => this.getGroupValueFromControls())
      )
      .subscribe((v) => {
        this.valueSubject$.next(v);
      });
  }

  private resetValidGraph = (validChanges: Observable<boolean>[]) => {
    if (this.validChangesSubscription) {
      this.validChangesSubscription.unsubscribe();
    }

    this.validChangesSubscription = merge(...validChanges)
      .pipe(
        takeUntil(this.destroy$),
        map(() => this.checkValid())
      )
      .subscribe(this.setValid);
  };
}
