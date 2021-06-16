import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { isEqual } from "lodash";

import { ControlBasicOptions, Errors, Validator } from "../types/control";
import { getErrorsBy } from "../utils";

export abstract class AbstractControl<V = any> {
  get value() {
    return this._value;
  }

  get errors() {
    return this._errors;
  }

  get valid() {
    return this._valid;
  }

  get invalid() {
    return !this._valid;
  }

  get enabled() {
    return this._enabled;
  }

  get disabled() {
    return !this._enabled;
  }

  get valueChange() {
    return this.valueSubject$.asObservable().pipe(takeUntil(this.destroy$));
  }

  get errorsChange() {
    return this.errorsSubject$.asObservable().pipe(takeUntil(this.destroy$));
  }

  get enabledChange() {
    return this.enabledSubject$.asObservable().pipe(takeUntil(this.destroy$));
  }

  get validChange() {
    return this.validSubject$.asObservable().pipe(takeUntil(this.destroy$));
  }

  abstract setValue(value: V, options?: Object): void;

  protected abstract checkValid(): boolean;

  protected _value!: V;
  protected _errors!: Errors | null;
  protected _enabled!: boolean;
  protected _valid!: boolean;
  protected _validators!: Validator[];

  protected valueSubject$ = new Subject<any>();
  protected enabledSubject$ = new Subject<boolean>();
  protected validSubject$ = new Subject<boolean>();
  protected errorsSubject$ = new Subject<Errors | null>();
  protected destroy$ = new Subject<true>();

  protected initBasicParams(value: V, { disabled = false, validators = [] }: ControlBasicOptions) {
    this.initValue(value);
    this.initValidators(validators);
    this.initEnabled(!disabled);
    this.initErrors(getErrorsBy(value, validators));
    this.initValid(this.checkValid());

    this.validChange.subscribe(this.updatePrivateValid);
    this.errorsChange.subscribe(this.updatePrivateErrors);
    this.enabledChange.subscribe(this.updatePrivateEnabledStatus);
    this.valueChange.subscribe(this.updatePrivateValue);
    this.valueChange.subscribe(this.validateAndUpdateErrors);
  }

  destroy = () => {
    this.destroy$.next(true);
  };

  setErrors = (errors: Errors | null) => {
    if (isEqual(errors, this.errors)) {
      return;
    }
    this.errorsSubject$.next(errors);
  };

  setValidators = (validators: Validator[]) => {
    this._validators = validators;
    this.validateAndUpdateErrors(this.value);
  };

  disable = () => {
    this.setEnabled(false);
  };

  enable = () => {
    this.setEnabled(true);
  };

  setValid = (valid: boolean) => {
    if (valid === this.valid) {
      return;
    }
    this.validSubject$.next(valid);
  };

  protected initValue = (value: V) => {
    this.updatePrivateValue(value);
  };

  protected initEnabled = (enabled: boolean) => {
    this._enabled = enabled;
  };

  protected initErrors = (errors: Errors | null) => {
    this._errors = errors;
  };

  protected initValid = (valid: boolean) => {
    this._valid = valid;
  };

  protected initValidators = (validators: Validator[]) => {
    this._validators = validators;
  };

  protected updatePrivateValue = (value: V) => {
    this._value = value;
  };

  protected updatePrivateValid = (valid: boolean) => {
    this._valid = valid;
  };

  protected updatePrivateErrors = (errors: Errors | null) => {
    this._errors = errors;
  };

  protected updatePrivateEnabledStatus = (enabled: boolean) => {
    this._enabled = enabled;
  };

  protected validateAndUpdateErrors = (value: V) => {
    const errors = getErrorsBy(value, this._validators);

    this.setErrors(errors);
    this.setValid(this.checkValid());
  };

  private setEnabled = (enabled: boolean) => {
    if (enabled === this.enabled) {
      return;
    }

    this.enabledSubject$.next(enabled);
  };
}
