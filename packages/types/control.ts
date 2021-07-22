import { AbstractControl } from "../controls/abstractControl";

export type GroupValue = {
  [key: string]: any;
};

export type GroupControls = {
  [key: string]: AbstractControl<any>;
};

export type Errors = {
  [key: string]: any;
};

export type ValidatorFn<V = any> = (value: V) => Errors | null;

export interface ControlBasicOptions {
  disabled?: boolean;
  dirty?: boolean;
  validators?: ValidatorFn[];
}

export type FormControlOptions = ControlBasicOptions;

export type CreateControlParams = AbstractControl<any> | [value: any, options?: FormControlOptions];

export type FormGroupControlsConfig = {
  [key: string]: CreateControlParams;
};

export type FormGroupOptions = ControlBasicOptions;

export interface SetValueOptions {
  emitEvent: boolean;
}
