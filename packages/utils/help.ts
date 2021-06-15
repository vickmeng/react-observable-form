import { isEmpty } from "lodash";

import { Errors, Validator } from "../types/control";
import { FieldWithNameProps, GroupWithNameProps, GroupProps, FieldProps } from "../types/items";

export const isFieldWithNameProps = (props: FieldProps): props is FieldWithNameProps => {
  return (props as FieldWithNameProps).name !== undefined;
};

export const isGroupWithNameProps = (props: GroupProps): props is GroupWithNameProps => {
  return (props as GroupWithNameProps).name !== undefined;
};

export const getErrorsBy = (value: any, validators: Validator[]) => {
  const errors: Errors = validators.reduce((acc, cur) => {
    const error = cur(value);
    if (error) {
      acc = { ...acc, ...error };
    }
    return acc;
  }, {});

  return isEmpty(errors) ? null : errors;
};
