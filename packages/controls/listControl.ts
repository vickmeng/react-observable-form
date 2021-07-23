import { map, skipWhile, takeUntil } from "rxjs/operators";
import { merge, Observable, Subject, Subscription } from "rxjs";

import { FormListControlsConfig, FormListOptions, ListControls, ListValue } from "../types/control";
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
    const { disabled = false, validators = [] } = options;
    this.initControls(controlsConfig);
    // TODO initBasicParams FIND A BETTER WAY
    this.initBasicParams(this.getListValueFromControls(), { disabled, validators });

    this.resetGraph();
    // // TODO resetGraph when controlsChange maybe a bug
    this.controlsChange.subscribe(this.updatePrivateControlsAndResetSubscribeGraph);
  }

  /**
   * @param name
   * for list, we use index as name
   */
  get = <C extends AbstractControl<any>>(name: string | number): C => {
    return this._controls[+name] as C;
  };

  insert = (start: number, ...rest: AbstractControl<V>[]) => {
    const controls = [...this.controls];
    controls.splice(start, 0, ...rest);

    this.controlsSubject.next(controls);
  };

  push = (...rest: AbstractControl<V>[]) => {
    this.insert(this.controls.length, ...rest);
  };

  remove = (start: number, deleteCount = 1) => {
    const controls = [...this.controls];
    controls.splice(start, deleteCount);

    this.controlsSubject.next(controls);
  };

  override setValue = (value: ListValue<V>) => {
    if (value === this.value) {
      return;
    }
    // TODO
    // this.setValueToControls(value);

    this.valueSubject$.next(value);
  };

  /**
   * has list level error or has invalid controls
   */
  protected checkValid = () => {
    return !(this.errors || this._controls.some((control) => control.invalid));
  };

  private initControls = (controlsConfig: FormListControlsConfig) => {
    this._controls = controlsConfig.map((config) => createControl(config));
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
