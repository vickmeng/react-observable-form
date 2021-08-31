import { isEmpty } from "lodash";

import { CreateControlParams, Errors, ValidatorFn } from "../types/control";
import {
  ErrorProps,
  ErrorWithNameProps,
  FieldProps,
  FieldWithNameProps,
  GroupProps,
  GroupWithNameProps,
  ListProps,
  ListWithNameProps,
} from "../types/items";
import { AbstractControl } from "../controls/abstractControl";
import { FieldControl } from "../controls/fieldControl";

export function isFieldWithNameProps<V>(props: FieldProps<V>): props is FieldWithNameProps<V> {
  return (props as FieldWithNameProps<V>).name !== undefined;
}

export const isGroupWithNameProps = (props: GroupProps): props is GroupWithNameProps => {
  return (props as GroupWithNameProps).name !== undefined;
};

export const isListWithNameProps = (props: ListProps): props is ListWithNameProps => {
  return (props as ListWithNameProps).name !== undefined;
};

export function isErrorWithNameProps(props: ErrorProps): props is ErrorWithNameProps {
  return (props as ErrorWithNameProps).name !== undefined;
}

export const getErrorsBy = (control: AbstractControl, validators: ValidatorFn[]) => {
  const errors: Errors = validators.reduce((acc, cur) => {
    const error = cur(control.value);
    if (error) {
      acc = { ...acc, ...error };
    }
    return acc;
  }, {});

  return isEmpty(errors) ? null : errors;
};

export const createControl = (params: CreateControlParams) => {
  if (params instanceof AbstractControl) {
    return params;
  } else {
    return new FieldControl(...params);
  }
};
