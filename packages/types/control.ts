import { AbstractControl } from "../controls/abstractControl";

export type GroupValue = Record<string, any>;

export type Controls = {
  [key: string]: AbstractControl<any>;
};

export type Errors = Record<string, any>;

export type ValidatorFn<V = any> = (value: V) => Errors | null;

export interface ControlBasicOptions {
  disabled?: boolean;
  validators?: ValidatorFn[];
}

export type FormControlOptions = ControlBasicOptions;

export type FormGroupControlsConfig = {
  [key: string]: AbstractControl<any> | [value: any, options?: FormControlOptions];
};

export type FormGroupOptions = ControlBasicOptions;
