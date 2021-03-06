import { isEmpty } from "lodash";

import { CreateControlParams, Errors, GroupValue, ValidatorFn } from "../types/control";
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

export const isGroupWithNameProps = <V extends GroupValue>(props: GroupProps<V>): props is GroupWithNameProps<V> => {
  return (props as GroupWithNameProps<V>).name !== undefined;
};

export const isListWithNameProps = <V>(props: ListProps<V>): props is ListWithNameProps<V> => {
  return (props as ListWithNameProps<V>).name !== undefined;
};

export function isErrorWithNameProps(props: ErrorProps): props is ErrorWithNameProps {
  return (props as ErrorWithNameProps).name !== undefined;
}

export const getErrorsBy = (control: AbstractControl, validators: ValidatorFn[]) => {
  const errors: Errors = validators.reduce((acc, cur) => {
    const error = cur(control);
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
