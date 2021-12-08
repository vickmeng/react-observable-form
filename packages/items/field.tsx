import { useContext } from "react";

import { FieldInternalProps, FieldProps } from "../types/items";
import { isFieldWithNameProps } from "../utils";
import {
  useControlAsyncErrors,
  useControlDirty,
  useControlDisabled,
  useControlErrors,
  useControlValid,
  useControlValue,
} from "../hooks";
import { FieldControl } from "../controls/fieldControl";

import { ParentFormContext } from "./context";

export function Field<V>(props: FieldProps<V>) {
  const { children } = props;

  const parent = useContext(ParentFormContext);

  /**
   * Two and only two way can get formControl,from props or 、Context
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
  const asyncErrors = useControlAsyncErrors(control);

  const childrenProps: FieldInternalProps = {
    name,
    value,
    control,
    setValue: control.setValue,
    markAsDirty: control.markAsDirty,
    markAsPristine: control.markAsPristine,
    validateAndUpdateErrors: control.validateAndUpdateErrors,
    asyncValidateAndUpdateErrors: control.asyncValidateAndUpdateErrors,
    errors,
    asyncErrors: asyncErrors,
    disabled,
    enabled: !disabled,
    valid,
    invalid: !valid,
    dirty,
    pristine: !dirty,
  };

  return children(childrenProps);
}
