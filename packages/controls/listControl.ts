import { map, skipWhile, takeUntil } from "rxjs/operators";
import { merge, Observable, Subject, Subscription } from "rxjs";

import {
  CreateControlParams,
  FormListControlsConfig,
  FormListOptions,
  ListControls,
  ListValue,
} from "../types/control";
import { createControl } from "../utils";

import { AbstractControl } from "./abstractControl";

export class ListControl<V = any> extends AbstractControl<ListValue<V>> {
  get controls(): ListControls<V> {
    return this._controls;
  }

  get controlsChange() {
    return this.controlsSubject.asObservable().pipe(takeUntil(this.destroy$));
  }

  private _controls!: ListControls<V>;

  private controlsSubject = new Subject<ListControls<V>>();

  /**
   * @private controlsChangeNotifyLock
   * Prevent frequent triggering of ValueChangeCallback when setting Value
   */
  private controlsChangeNotifyLock = false;
  private valueChangesSubscription!: Subscription;
  private validChangesSubscription!: Subscription;

  constructor(controlsConfig: FormListControlsConfig, options: FormListOptions = {}) {
    super();
    this.initControls(controlsConfig);
    this.initBasicParams(this.getListValueFromControls(), options);

    this.resetGraph();
    this.controlsChange.subscribe(this.updatePrivateControlsAndResetSubscribeGraph);
  }

  /**
   * @param name
   * for list, we use index as name
   */
  get = <C extends AbstractControl<any>>(name: string | number): C => {
    return this._controls[+name] as C;
  };

  insert = (start: number, ...rest: CreateControlParams[]) => {
    const controls = [...this.controls];
    const newControls = rest.map((params) => createControl(params));

    controls.splice(start, 0, ...newControls);

    this.controlsSubject.next(controls);
  };

  push = (...rest: CreateControlParams[]) => {
    this.insert(this.controls.length, ...rest);
  };

  remove = (start: number, deleteCount = 1) => {
    const controls = [...this.controls];
    controls.splice(start, deleteCount);

    this.controlsSubject.next(controls);
  };

  override setValue = (value: ListValue<V>) => {
    this.destroyGraph();

    this.setValueToControls(value);

    this.valueSubject$.next(this.getListValueFromControls());
    this.validSubject$.next(this.checkValid());

    this.resetGraph();
  };

  override reset = () => {
    this.destroyGraph();

    this.controls.forEach((control) => control.reset());

    this.valueSubject$.next(this.getListValueFromControls());
    this.validSubject$.next(this.checkValid());

    this.resetGraph();
  };

  /**
   * has list level error or has invalid controls
   */
  protected checkValid = () => {
    return !(this.errors || this.asyncErrors || this._controls.some((control) => control.invalid));
  };

  private initControls = (controlsConfig: FormListControlsConfig) => {
    this._controls = controlsConfig.map((config) => {
      const childControl = createControl(config);
      childControl.parent = this;
      return childControl;
    });
  };

  private setValueToControls = (value: ListValue) => {
    this._controls.forEach((control, i) => {
      const hasKey = Object.prototype.hasOwnProperty.call(value, i);
      hasKey && control.setValue(value[i]);
    });
  };

  private updatePrivateControlsAndResetSubscribeGraph = (controls: ListControls) => {
    this.updatePrivateControls(controls);
    this.valueSubject$.next(this.getListValueFromControls());
    this.resetGraph();
  };

  private updatePrivateControls = (controls: ListControls) => {
    this._controls = controls;
  };

  private getListValueFromControls = () => {
    const value: ListValue<V> = [];
    Object.keys(this._controls).forEach((name, i) => {
      const control = this._controls[i];
      if (control.enabled) {
        value[i] = control.value;
      }
    });

    return value;
  };

  /**
   * build the flow of group and children controls
   */
  private resetGraph = () => {
    const valueChanges = this._controls.map((control) => control.valueChange);
    const validChanges = this._controls.map((control) => control.validChange);
    const disabledChanges = this._controls.map((control) => control.disabledChange);

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
        skipWhile(() => this.controlsChangeNotifyLock),
        map(() => this.getListValueFromControls())
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
