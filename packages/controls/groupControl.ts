import { merge, Observable, Subject, Subscription } from "rxjs";
import { map, skipWhile, takeUntil } from "rxjs/operators";

import { Controls, FormGroupControlsConfig, FormGroupOptions, GroupValue } from "../types/control";

import { AbstractControl } from "./abstractControl";
import { FieldControl } from "./fieldControl";

export class GroupControl extends AbstractControl<GroupValue> {
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
  private disabledChangesSubscription!: Subscription;

  constructor(controlsConfig: FormGroupControlsConfig, options: FormGroupOptions = {}) {
    super();
    const { disabled = false, validators = [] } = options;
    this.initControls(controlsConfig);
    // TODO initBasicParams FIND A BETTER WAY
    this.initBasicParams(this.getGroupValueFromControls(), { disabled, validators });

    // TODO reSubscribeControls when controlsChange maybe a bug
    this.controlsChange.subscribe(this.updatePrivateControlsAndResetValue);

    this.reSubscribeControls();
  }

  get = <T extends AbstractControl<any>>(name: string): T => {
    return this._controls[name] as T;
  };

  setValue = (value: GroupValue) => {
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

  private initControls = (controlsConfig: FormGroupControlsConfig) => {
    const controls: Controls = {};

    for (const controlKey in controlsConfig) {
      if (Object.prototype.hasOwnProperty.call(controlsConfig, controlKey)) {
        const val = controlsConfig[controlKey];
        if (val instanceof AbstractControl) {
          controls[controlKey] = val;
        } else {
          controls[controlKey] = new FieldControl(...val);
        }
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

  private updatePrivateControlsAndResetValue = (controls: Controls) => {
    this.updatePrivateControls(controls);
    this.valueSubject$.next(this.getGroupValueFromControls());
  };

  private updatePrivateControls = (controls: Controls) => {
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

  private reSubscribeControls = () => {
    const controls = Object.values(this._controls);
    const valueChanges = controls.map((control) => control.valueChange);
    const validChanges = controls.map((control) => control.validChange);
    const disabledChanges = controls.map((control) => control.disabledChange);

    this.reSubscribeControlsValueChange(valueChanges);
    this.reSubscribeControlsValidChange(validChanges);
    this.reSubscribeControlsDisabledChange(disabledChanges);
  };

  private reSubscribeControlsValueChange(valueChanges: Observable<any>[]) {
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

  private reSubscribeControlsValidChange = (validChanges: Observable<boolean>[]) => {
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

  /**
   * FormGroup ignore disabled field's value,
   * when one of controls change the disabled status, update group value.
   */
  private reSubscribeControlsDisabledChange = (disabledChanges: Observable<boolean>[]) => {
    if (this.disabledChangesSubscription) {
      this.disabledChangesSubscription.unsubscribe();
    }

    this.disabledChangesSubscription = merge(...disabledChanges)
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
