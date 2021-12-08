import { Observable, Subject } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { isEmpty, isEqual } from "lodash";

import { AsyncValidatorFn, ControlBasicOptions, Errors, ValidatorFn } from "../types/control";
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

  get asyncErrors() {
    return this._asyncErrors;
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

  get asyncErrorsChange() {
    return this.asyncErrorsSubject$.asObservable().pipe(takeUntil(this.destroy$));
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

  private get asyncValidSubjectNotifierChange(): Observable<Errors | null> {
    return this.asyncValidSubjectNotifier$.asObservable().pipe(
      takeUntil(this.destroy$),
      switchMap((control) => {
        const asyncValidatorsPromiseList = control._asyncValidators.map((asyncValidator) => {
          const error = asyncValidator(control);
          return error;
        });

        return Promise.all(asyncValidatorsPromiseList).then((errorList) => {
          return errorList.reduce((acc, cur) => {
            if (cur) {
              acc = Object.assign({}, acc, cur);
            }
            return acc;
          }, null);
        });
      })
    );
  }

  abstract setValue(value: V): void;

  abstract reset(): void;

  protected abstract checkValid(): boolean;

  protected _value!: V;
  protected _errors: Errors | null = null;
  protected _asyncErrors: Errors | null = null;
  protected _disabled!: boolean;
  protected _dirty!: boolean;
  protected _valid!: boolean;
  protected _validators!: ValidatorFn<V>[];
  protected _asyncValidators!: AsyncValidatorFn<V>[];
  protected _autoValidate!: boolean;
  protected _autoAsyncValidate!: boolean;

  protected valueSubject$ = new Subject<V>();
  protected disabledSubject$ = new Subject<boolean>();
  protected validSubject$ = new Subject<boolean>();
  protected dirtySubject$ = new Subject<boolean>();
  protected errorsSubject$ = new Subject<Errors | null>();
  protected asyncErrorsSubject$ = new Subject<Errors | null>();
  protected destroy$ = new Subject<true>();

  private asyncValidSubjectNotifier$ = new Subject<AbstractControl<V>>();

  protected initBasicParams = (
    value: V,
    {
      disabled = false,
      dirty = false,
      autoValidate = true,
      validators = [],
      autoAsyncValidate = false,
      asyncValidators = [],
      autoMarkAsDirty = true,
    }: ControlBasicOptions
  ) => {
    this._value = value;
    this._validators = validators;
    this._asyncValidators = asyncValidators;
    this._disabled = disabled;
    this._dirty = dirty;
    this._autoValidate = autoValidate;
    this._autoAsyncValidate = autoAsyncValidate;
    if (autoValidate && !isEmpty(this._validators)) {
      this._errors = getErrorsBy(this, validators);
    }
    this._valid = this.checkValid();

    this.validChange.subscribe((valid) => {
      this._valid = valid;
    });

    this.errorsChange.subscribe((errors) => {
      this._errors = errors;
    });

    this.asyncValidSubjectNotifierChange.subscribe((errors) => {
      this.setAsyncErrors(errors);
      this.setValid(this.checkValid());
    });

    this.asyncErrorsChange.subscribe((errors) => {
      this._asyncErrors = errors;
    });

    this.disabledChange.subscribe((disabled) => {
      this._disabled = disabled;
    });

    this.dirtyChange.subscribe((dirty) => {
      this._dirty = dirty;
    });

    this.valueChange.subscribe((value) => {
      this._value = value;
    });

    if (autoValidate) {
      this.valueChange.subscribe(this.validateAndUpdateErrors);
    }

    if (autoAsyncValidate) {
      this.asyncValidateAndUpdateErrors();
      this.valueChange.subscribe(this.asyncValidateAndUpdateErrors);
    }

    if (autoMarkAsDirty) {
      this.valueChange.subscribe(this.markAsDirty);
    }
  };

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

  setAsyncErrors = (errors: Errors | null) => {
    if (isEqual(errors, this.asyncErrors)) {
      return;
    }
    this.asyncErrorsSubject$.next(errors);
  };

  setValidators = (validators: ValidatorFn[]) => {
    this._validators = validators;
    if (this._autoValidate) {
      this.validateAndUpdateErrors();
    }
  };

  setAsyncValidators = (asyncValidators: AsyncValidatorFn[]) => {
    this._asyncValidators = asyncValidators;
    if (this._autoAsyncValidate) {
      this.asyncValidateAndUpdateErrors();
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

  validateAndUpdateErrors = () => {
    const errors = getErrorsBy(this, this._validators);

    this.setErrors(errors);
    this.setValid(this.checkValid());
  };

  asyncValidateAndUpdateErrors = () => {
    this.asyncValidSubjectNotifier$.next(this);
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
