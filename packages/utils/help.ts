import { isEmpty } from "lodash";

import { Errors, Validator } from "../types/control";
import { FieldAsChildAttributes, FieldAttributes, GroupAsChildAttributes, GroupAttributes } from "../types/item";

export const isFieldAsChildAttributes = (props: FieldAttributes): props is FieldAsChildAttributes => {
  return (props as FieldAsChildAttributes).name !== undefined;
};

export const isGroupAsChildAttributes = (props: GroupAttributes): props is GroupAsChildAttributes => {
  return (props as GroupAsChildAttributes).name !== undefined;
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
