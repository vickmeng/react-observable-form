import { merge, Observable, Subject, Subscription } from "rxjs";
import { map, skipWhile, takeUntil } from "rxjs/operators";

import {
  ControlMap,
  CreateControlParams,
  FormGroupControlsConfig,
  FormGroupOptions,
  GroupValue,
} from "../types/control";
import { createControl } from "../utils";

import { AbstractControl } from "./abstractControl";

export class GroupControl extends AbstractControl<GroupValue> {
  get controls(): ControlMap {
    return this._controls;
  }

  get controlsChange() {
    return this.controlsSubject.asObservable().pipe(takeUntil(this.destroy$));
  }

  private _controls!: ControlMap;

  private controlsSubject = new Subject<ControlMap>();

  /**
   * @private controlsChangeNotifyLock
   * Prevent frequent triggering of ValueChangeCallback when setting Value
   */
  private controlsChangeNotifyLock = false;
  private valueChangesSubscription!: Subscription;
  private validChangesSubscription!: Subscription;

  constructor(controlsConfig: FormGroupControlsConfig, options: FormGroupOptions = {}) {
    super();
    const { disabled = false, validators = [] } = options;
    this.initControls(controlsConfig);
    // TODO initBasicParams FIND A BETTER WAY
    this.initBasicParams(this.getGroupValueFromControls(), { disabled, validators });

    this.resetGraph();
    // TODO resetGraph when controlsChange maybe a bug
    this.controlsChange.subscribe(this.updatePrivateControlsAndResetSubscribeGraph);
  }

  get = <T extends AbstractControl<any>>(name: string): T => {
    return this._controls[name] as T;
  };

  override setValue = (value: GroupValue) => {
    if (value === this.value) {
      return;
    }

    this.setValueToControls(value);

    this.valueSubject$.next(value);
  };

  addControl = (name: string, control: CreateControlParams) => {
    /**
     * reject control of the same name
     */
    if (this.controls[name]) {
      // eslint-disable-next-line no-console
      console.warn(`already has control named ${name} in formGroup`);
      return;
    }

    const controls = Object.assign({}, this.controls, {
      [name]: createControl(control),
    });

    this.controlsSubject.next(controls);
  };

  removeControl = (name: string) => {
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

  private initControls = (controlsConfig: FormGroupControlsConfig) => {
    const controls: ControlMap = {};

    for (const controlKey in controlsConfig) {
      if (Object.prototype.hasOwnProperty.call(controlsConfig, controlKey)) {
        const val = controlsConfig[controlKey];
        controls[controlKey] = createControl(val);
      }
    }

    this._controls = controls;
  };

  private setValueToControls = (value: GroupValue) => {
    /**
     * open the lock and prevent trigger valueChange,validChange callback by controls value change
     */
    this.controlsChangeNotifyLock = true;

    Object.keys(this._controls).forEach((name) => {
      const hasKey = Object.prototype.hasOwnProperty.call(value, name);
      this._controls[name].setValue(hasKey ? value[name] : null);
    });
    /**
     * close the lock
     */
    this.controlsChangeNotifyLock = false;
  };

  /**
   * has group level error or has invalid controls
   */
  protected checkValid = () => {
    return !(this.errors || Object.values(this._controls).some((control) => control.invalid));
  };

  private updatePrivateControlsAndResetSubscribeGraph = (controls: ControlMap) => {
    this.updatePrivateControls(controls);
    this.valueSubject$.next(this.getGroupValueFromControls());
    this.resetGraph();
  };

  private updatePrivateControls = (controls: ControlMap) => {
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

  private resetValueGraph(changes: Observable<any>[]) {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }

    this.valueChangesSubscription = merge(...changes)
      .pipe(
        takeUntil(this.destroy$),
        skipWhile(() => this.controlsChangeNotifyLock),
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
        skipWhile(() => this.controlsChangeNotifyLock),
        map(() => this.checkValid())
      )
      .subscribe(this.setValid);
  };
}
