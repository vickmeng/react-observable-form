import { isEmpty } from "lodash";

import { Errors, ValidatorFn } from "../types/control";
import { FieldWithNameProps, GroupWithNameProps, GroupProps, FieldProps } from "../types/items";

export function isFieldWithNameProps<V>(props: FieldProps<V>): props is FieldWithNameProps<V> {
  return (props as FieldWithNameProps<V>).name !== undefined;
}

export const isGroupWithNameProps = (props: GroupProps): props is GroupWithNameProps => {
  return (props as GroupWithNameProps).name !== undefined;
};

export const getErrorsBy = (value: any, validators: ValidatorFn[]) => {
  const errors: Errors = validators.reduce((acc, cur) => {
    const error = cur(value);
    if (error) {
      acc = { ...acc, ...error };
    }
    return acc;
  }, {});

  return isEmpty(errors) ? null : errors;
};
