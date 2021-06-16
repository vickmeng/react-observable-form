import React, { useContext } from "react";

import { FieldProps, FieldWithControlProps, FieldWithNameProps } from "../types/items";
import { isFieldWithNameProps } from "../utils";
import { useSubscribe } from "../hooks";
import { Errors } from "../types/control";
import { FieldControl } from "../controls/fieldControl";

import { formGroupContext } from "./context";

function FieldWithName<V>({ name, children }: FieldWithNameProps<V>) {
  const parentGroup = useContext(formGroupContext);
  const control = parentGroup!.get<FieldControl<V>>(name);

  const value = useSubscribe<V>(control, control.value, control.valueChange);
  const enabled = useSubscribe<boolean>(control, control.enabled, control.enabledChange);
  const valid = useSubscribe<boolean>(control, control.valid, control.validChange);
  const errors = useSubscribe<Errors | null>(control, control.errors, control.errorsChange);

  const childrenProps = {
    name,
    value,
    setValue: control.setValue,
    errors,
    disabled: !enabled,
    enabled,
    valid,
    invalid: !valid,
  };

  return children(childrenProps);
}

function FieldWithControl<V>({ control, children }: FieldWithControlProps<V>) {
  const value = useSubscribe<V>(control, control.value, control.valueChange);
  const enabled = useSubscribe<boolean>(control, control.enabled, control.enabledChange);
  const valid = useSubscribe<boolean>(control, control.valid, control.validChange);
  const errors = useSubscribe<Errors | null>(control, control.errors, control.errorsChange);

  const childrenProps = {
    value,
    setValue: control.setValue,
    errors,
    disabled: !enabled,
    enabled,
    valid,
    invalid: !valid,
  };

  return children(childrenProps);
}

export function Field<V>(props: FieldProps<V>) {
  /**
   * Two and only two way can get formControl,from props or formGroupContext or TODO formArrayContext
   */

  if (isFieldWithNameProps(props)) {
    const { children, ...rest } = props;
    return <FieldWithName {...rest}>{children}</FieldWithName>;
  } else {
    const { children, ...rest } = props;
    return <FieldWithControl {...rest}>{children}</FieldWithControl>;
  }
}
