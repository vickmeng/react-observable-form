import { useContext } from "react";

import { FieldProps } from "../types/items";
import { isFieldWithNameProps } from "../utils";
import { useSubscribe } from "../hooks";
import { Errors } from "../types/control";
import { FieldControl } from "../controls/fieldControl";

import { ParentFormContext } from "./context";

export function Field<V>(props: FieldProps<V>) {
  const { children } = props;

  const parent = useContext(ParentFormContext);

  /**
   * Two and only two way can get formControl,from props or formGroupContext or TODO formArrayContext
   */
  const { name = undefined, control } = isFieldWithNameProps<V>(props)
    ? { name: props.name, control: parent!.get<FieldControl<V>>(props.name) }
    : { control: props.control };

  if (!(control instanceof FieldControl)) {
    throw new Error("props error:Field can only receive FieldControl as control");
  }

  const value = useSubscribe<V>(control, control.value, control.valueChange);
  const disabled = useSubscribe<boolean>(control, control.disabled, control.disabledChange);
  const dirty = useSubscribe<boolean>(control, control.dirty, control.dirtyChange);
  const valid = useSubscribe<boolean>(control, control.valid, control.validChange);
  const errors = useSubscribe<Errors | null>(control, control.errors, control.errorsChange);

  const childrenProps = {
    name,
    value,
    setValue: control.setValue,
    errors,
    disabled,
    enabled: !disabled,
    valid,
    invalid: !valid,
    dirty,
    pristine: !dirty,
  };

  return children(childrenProps);
}
