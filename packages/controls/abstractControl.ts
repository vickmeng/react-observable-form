import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { isEqual } from "lodash";

import { ControlBasicOptions, Errors, ValidatorFn } from "../types/control";
import { getErrorsBy } from "../utils";

import { GroupControl } from "./groupControl";
import { ListControl } from "./listControl";

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

  get disabled() {
    return this._disabled;
  }

  get enabled() {
    return !this._disabled;
  }

  get dirty() {
    return this._dirty;
  }

  get pristine() {
    return !this._dirty;
  }

  get valueChange() {
    return this.valueSubject$.asObservable().pipe(takeUntil(this.destroy$));
  }

  get errorsChange() {
    return this.errorsSubject$.asObservable().pipe(takeUntil(this.destroy$));
  }

  get disabledChange() {
    return this.disabledSubject$.asObservable().pipe(takeUntil(this.destroy$));
  }

  get dirtyChange() {
    return this.dirtySubject$.asObservable().pipe(takeUntil(this.destroy$));
  }

  get validChange() {
    return this.validSubject$.asObservable().pipe(takeUntil(this.destroy$));
  }

  abstract setValue(value: V): void;

  abstract reset(): void;

  protected abstract checkValid(): boolean;

  protected _value!: V;
  protected _errors!: Errors | null;
  protected _disabled!: boolean;
  protected _dirty!: boolean;
  protected _valid!: boolean;
  protected _validators!: ValidatorFn[];
  protected autoValidate!: boolean;

  protected valueSubject$ = new Subject<V>();
  protected disabledSubject$ = new Subject<boolean>();
  protected validSubject$ = new Subject<boolean>();
  protected dirtySubject$ = new Subject<boolean>();
  protected errorsSubject$ = new Subject<Errors | null>();
  protected destroy$ = new Subject<true>();

  protected initBasicParams(
    value: V,
    {
      disabled = false,
      dirty = false,
      validators = [],
      asyncValidators = [],
      autoValidate = true,
      autoMarkAsDirty = true,
    }: ControlBasicOptions
  ) {
    this.initValue(value);
    this.initValidators(validators);
    this.initDisabled(disabled);
    this.autoValidate = autoValidate;

    if (autoValidate) {
      this.initErrors(getErrorsBy(this, validators));
    }
    this.initDirty(dirty);

    this.initValid(this.checkValid());

    this.validChange.subscribe(this.updatePrivateValid);
    this.errorsChange.subscribe(this.updatePrivateErrors);
    this.disabledChange.subscribe(this.updatePrivateDisabled);
    this.dirtyChange.subscribe(this.updatePrivateDirty);
    this.valueChange.subscribe(this.updatePrivateValue);

    if (autoValidate) {
      this.valueChange.subscribe(this.validateAndUpdateErrors);
    }

    if (autoMarkAsDirty) {
      this.valueChange.subscribe(this.markAsDirty);
    }
  }

  parent?: GroupControl | ListControl;

  destroy = () => {
    this.destroy$.next(true);
  };

  setErrors = (errors: Errors | null) => {
    if (isEqual(errors, this.errors)) {
      return;
    }
    this.errorsSubject$.next(errors);
  };

  setValidators = (validators: ValidatorFn[]) => {
    this._validators = validators;
    if (this.autoValidate) {
      this.validateAndUpdateErrors();
    }
  };

  disable = () => {
    this.setDisabled(true);
  };

  enable = () => {
    this.setDisabled(false);
  };

  setValid = (valid: boolean) => {
    if (valid === this.valid) {
      return;
    }
    this.validSubject$.next(valid);
  };

  markAsDirty = () => {
    this.setDirty(true);
  };

  markAsPristine = () => {
    this.setDirty(false);
  };

  protected initValue = (value: V) => {
    this.updatePrivateValue(value);
  };

  protected initDisabled = (disabled: boolean) => {
    this._disabled = disabled;
  };

  protected initDirty = (dirty: boolean) => {
    this._dirty = dirty;
  };

  protected initErrors = (errors: Errors | null) => {
    this._errors = errors;
  };

  protected initValid = (valid: boolean) => {
    this._valid = valid;
  };

  protected initValidators = (validators: ValidatorFn[]) => {
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

  protected updatePrivateDisabled = (disabled: boolean) => {
    this._disabled = disabled;
  };

  protected updatePrivateDirty = (dirty: boolean) => {
    this._dirty = dirty;
  };

  protected validateAndUpdateErrors = () => {
    const errors = getErrorsBy(this, this._validators);

    this.setErrors(errors);
    this.setValid(this.checkValid());
  };

  private setDisabled = (disabled: boolean) => {
    if (disabled === this.disabled) {
      return;
    }

    this.disabledSubject$.next(disabled);
  };

  private setDirty = (dirty: boolean) => {
    if (dirty === this.dirty) {
      return;
    }

    this.dirtySubject$.next(dirty);
  };
}
