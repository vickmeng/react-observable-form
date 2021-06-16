import { AbstractControl } from "../controls/abstractControl";

export type ControlValue<V = any> = V | undefined | null;

export type GroupValue = Record<string, ControlValue>;

export type Controls = {
  [key: string]: AbstractControl<any>;
};

export type Errors = Record<string, any>;

export type Validator<V = any> = (value: V) => Errors | null;

export interface ControlBasicParams<V> {
  value?: V;
  disabled?: boolean;
  validators?: Validator[];
}

export type FormControlParams<V> = ControlBasicParams<V>;

export type FormGroupParams = ControlBasicParams<any>;
