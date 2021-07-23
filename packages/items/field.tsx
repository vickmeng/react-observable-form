import { useContext } from "react";

import { FieldProps } from "../types/items";
import { isFieldWithNameProps } from "../utils";
import { useControlDirty, useControlDisabled, useControlErrors, useControlValid, useControlValue } from "../hooks";
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

  const value = useControlValue<V>(control);
  const disabled = useControlDisabled(control);
  const dirty = useControlDirty(control);
  const valid = useControlValid(control);
  const errors = useControlErrors(control);

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
