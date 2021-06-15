import { useContext } from "react";

import { FieldProps } from "../types/items";
import { isFieldWithNameProps } from "../utils";
import { FieldControl } from "../controls/fieldControl";
import { useSubscribe } from "../hooks";
import { Errors } from "../types/control";

import { formGroupContext } from "./context";

export const Field = (props: FieldProps) => {
  const { children } = props;
  /**
   * Two and only two way can get formControl,from props or formGroupContext or TODO formArrayContext
   */
  const parentGroup = useContext(formGroupContext);

  const { name = undefined, control } = isFieldWithNameProps(props)
    ? { name: props.name, control: parentGroup!.get<FieldControl>(props.name) }
    : { control: props.control };

  const value = useSubscribe<any>(control, control.value, control.valueChange);
  const enabled = useSubscribe<boolean>(control, control.enabled, control.enabledChange);
  const valid = useSubscribe<boolean>(control, control.valid, control.validChange);
  const errors = useSubscribe<Errors | null>(control, control.errors, control.errorsChange);

  const childProps = {
    name,
    value,
    setValue: control.setValue,
    errors,
    disabled: !enabled,
    enabled,
    valid,
    invalid: !valid,
  };

  return children(childProps);
};
