import { AbstractControl } from "../controls/abstractControl";

export type GroupValue = Record<string, any>;

export type Controls = {
  [key: string]: AbstractControl<any>;
};

export type Errors = Record<string, any>;

export type Validator<V = any> = (value: V) => Errors | null;

export interface ControlBasicOptions {
  disabled?: boolean;
  validators?: Validator[];
}

export type FormControlOptions = ControlBasicOptions;

export type FormGroupParams = ControlBasicOptions;
