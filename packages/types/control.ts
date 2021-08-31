import { AbstractControl } from "../controls/abstractControl";

export type GroupValue = {
  [key: string]: any;
};

export type GroupControls = {
  [key: string]: AbstractControl<any>;
};

export type ListValue<V = any> = V[];

export type ListControls<V = any> = AbstractControl<V>[];

export type Errors = {
  [key: string]: any;
};

export type ValidatorFn<V = any> = (control: AbstractControl<V>) => Errors | null;

export interface ControlBasicOptions {
  disabled?: boolean;
  validators?: ValidatorFn[];
  dirty?: boolean;
  autoMarkAsDirty?: boolean;
}

export type FormControlOptions = ControlBasicOptions;

export type FormGroupOptions = ControlBasicOptions;

export type FormListOptions = ControlBasicOptions;
// TODO 泛型？
export type CreateControlParams = AbstractControl<any> | [value?: any, options?: FormControlOptions];

export type FormGroupControlsConfig = {
  [key: string]: CreateControlParams;
};

export type FormListControlsConfig = CreateControlParams[];
