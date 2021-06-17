import { useContext } from "react";

import { FieldProps } from "../types/items";
import { isFieldWithNameProps } from "../utils";
import { useSubscribe } from "../hooks";
import { Errors } from "../types/control";
import { FieldControl } from "../controls/fieldControl";
import { GroupControl } from "../controls/groupControl";

import { formGroupContext } from "./context";

export function Field<V>(props: FieldProps<V>) {
  const { children } = props;

  const parentGroup = useContext(formGroupContext);

  /**
   * Two and only two way can get formControl,from props or formGroupContext or TODO formArrayContext
   */
  const { name = undefined, control } = isFieldWithNameProps(props)
    ? { name: props.name, control: parentGroup!.get<GroupControl>(props.name) }
    : { control: props.control };

  if (!(control instanceof FieldControl)) {
    throw new Error("props error:Field can only receive FieldControl as control");
  }

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
