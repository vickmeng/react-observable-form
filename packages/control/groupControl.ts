import { merge, Observable, Subject, Subscription } from "rxjs";
import { map, skipWhile, takeUntil } from "rxjs/operators";

import { Controls, IFormGroupParams, IGroupValue } from "../types/control";

import { AbstractControl } from "./abstractControl";

export class GroupControl extends AbstractControl<IGroupValue> {
  get controls(): Controls {
    return this._controls;
  }

  get controlsChange() {
    return this.controlsSubject.asObservable().pipe(takeUntil(this.destroy$));
  }

  private _controls!: Controls;

  private controlsSubject = new Subject<Controls>();

  /**
   * @private controlsChangeNotifyLock
   * Prevent frequent triggering of ValueChangeCallback when setting Value
   */
  private controlsChangeNotifyLock = false;
  private valueChangesSubscription!: Subscription;
  private validChangesSubscription!: Subscription;
  private enabledChangesSubscription!: Subscription;

  constructor({ controls, disabled = false, validators = [] }: IFormGroupParams) {
    super();
    this.initControls(controls);
    // TODO initBasicParams FIND A BETTER WAY
    this.initBasicParams({ value: this.getGroupValueFromControls(), disabled, validators });
    this.controlsChange.subscribe(this.updatePrivateControlsAndResetValue);

    this.reSubscribeControls();
  }

  get = <T extends AbstractControl<any>>(name: string): T => {
    return this._controls[name] as T;
  };

  setValue = (value: IGroupValue) => {
    if (value === this.value) {
      return;
    }

    this.setValueToControls(value);

    this.valueSubject$.next(value);
  };

  addControl = (name: string, control: AbstractControl<any>) => {
    const controls = Object.assign({}, this.controls, {
      [name]: control,
    });
    this.controlsSubject.next(controls);
  };

  // TODO =>
  private initControls = (controls: Controls) => {
    this._controls = controls;
  };

  private setValueToControls = (value: IGroupValue) => {
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
   * has group level error or has invalid control
   */
  protected checkValid = () => {
    return !(this.errors || Object.values(this._controls).some((control) => control.invalid));
  };

  private updatePrivateControlsAndResetValue = (controls: Controls) => {
    this.updatePrivateControls(controls);
    this.valueSubject$.next(this.getGroupValueFromControls());
  };

  private updatePrivateControls = (controls: Controls) => {
    this._controls = controls;
  };

  private getGroupValueFromControls = () => {
    const value: IGroupValue = {};
    Object.keys(this._controls).forEach((name) => {
      const control = this._controls[name];
      if (control.enabled) {
        value[name] = control.value;
      }
    });

    return value;
  };

  private reSubscribeControls = () => {
    const controls = Object.values(this._controls);
    const valueChanges = controls.map((control) => control.valueChange);
    const validChanges = controls.map((control) => control.validChange);
    const enabledChanges = controls.map((control) => control.enabledChange);

    this.reSubscribeControlValueChanges(valueChanges);
    this.reSubscribeControlValidChanges(validChanges);
    this.reSubscribeControlEnabledChanges(enabledChanges);
  };

  private reSubscribeControlValueChanges(valueChanges: Observable<any>[]) {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }

    this.valueChangesSubscription = merge(...valueChanges)
      .pipe(
        takeUntil(this.destroy$),
        skipWhile(() => this.controlsChangeNotifyLock),
        map(() => this.getGroupValueFromControls())
      )
      .subscribe((v) => {
        this.valueSubject$.next(v);
      });
  }

  private reSubscribeControlValidChanges = (validChanges: Observable<boolean>[]) => {
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

  // TODO ?? merge with reSubscribeControlValueChanges
  private reSubscribeControlEnabledChanges = (enabledChanges: Observable<boolean>[]) => {
    if (this.enabledChangesSubscription) {
      this.enabledChangesSubscription.unsubscribe();
    }

    this.enabledChangesSubscription = merge(...enabledChanges)
      .pipe(
        takeUntil(this.destroy$),
        skipWhile(() => this.controlsChangeNotifyLock),
        map(() => this.getGroupValueFromControls())
      )
      .subscribe((v) => {
        this.valueSubject$.next(v);
      });
  };
}
