import React, { useContext } from "react";

import { isListWithNameProps } from "../utils";
import { ListInternalProps, ListProps } from "../types/items";
import {
  useControlControls,
  useControlDirty,
  useControlDisabled,
  useControlErrors,
  useControlValid,
  useControlValue,
} from "../hooks";
import { ListValue } from "../types/control";
import { ListControl } from "../controls/listControl";

import { ParentFormContext } from "./context";

export const List = (props: ListProps) => {
  const { children } = props;

  const parent = useContext(ParentFormContext);

  const { name = undefined, control } = isListWithNameProps(props)
    ? { name: props.name, control: parent!.get<ListControl<any>>(props.name) }
    : { control: props.control };

  const value = useControlValue<ListValue>(control);
  const disabled = useControlDisabled(control);
  const dirty = useControlDirty(control);
  const valid = useControlValid(control);
  const errors = useControlErrors(control);
  const controls = useControlControls<ListControl>(control);

  const childProps: ListInternalProps = {
    name,
    value,
    disabled,
    enabled: !disabled,
    errors,
    valid: valid,
    invalid: !valid,
    dirty,
    pristine: !dirty,
    controls,
  };

  return <ParentFormContext.Provider value={control}>{children(childProps)}</ParentFormContext.Provider>;
};
