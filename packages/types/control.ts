import { AbstractControl } from "../controls/abstractControl";

export type GroupValue = {
  [key: string]: any;
};

export type GroupChildControls = {
  [key: string]: AbstractControl<any>;
};

export type ListValue<V = any> = V[];

export type ListChildControls<V = any> = AbstractControl<V>[];

export type Errors = {
  [key: string]: any;
};

export type ValidatorFn<V = any> = (control: AbstractControl<V>) => Errors | null;
export type AsyncValidatorFn<V = any> = (control: AbstractControl<V>) => Promise<Errors | null>;

export interface ControlBasicOptions {
  disabled?: boolean;
  autoValidate?: boolean;
  validators?: ValidatorFn[];
  autoAsyncValidate?: boolean;
  asyncValidators?: AsyncValidatorFn[];
  dirty?: boolean;
  autoMarkAsDirty?: boolean;
}

export type FormControlOptions = ControlBasicOptions;

export type FormGroupOptions = ControlBasicOptions;

export type FormListOptions = ControlBasicOptions;

export type CreateControlParams<V = any> = AbstractControl<V> | [value?: V, options?: FormControlOptions];

export type FormGroupControlsConfig = {
  [key: string]: CreateControlParams;
};

export type FormListControlsConfig = CreateControlParams[];
