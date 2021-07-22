import React, { useContext } from "react";

import { isListWithNameProps } from "../utils";
import { ListInternalProps, ListProps } from "../types/items";
import { useSubscribe } from "../hooks";
import { Errors, ListControls } from "../types/control";
import { ListControl } from "../controls/listControl";

import { ParentFormContext } from "./context";

export const List = (props: ListProps) => {
  const { children } = props;

  const parentGroup = useContext(ParentFormContext);

  const { name = undefined, control } = isListWithNameProps(props)
    ? { name: props.name, control: parentGroup!.get<ListControl<any>>(props.name) }
    : { control: props.control };

  const value = useSubscribe<ListInternalProps["value"]>(control, control.value, control.valueChange);
  const controls = useSubscribe<ListControls>(control, control.controls, control.controlsChange);
  const disabled = useSubscribe<boolean>(control, control.disabled, control.disabledChange);
  const dirty = useSubscribe<boolean>(control, control.dirty, control.dirtyChange);
  const valid = useSubscribe<boolean>(control, control.valid, control.validChange);
  const errors = useSubscribe<Errors | null>(control, control.errors, control.errorsChange);

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
