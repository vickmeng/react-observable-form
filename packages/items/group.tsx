import React, { useContext } from "react";

import { GroupProps, GroupInternalProps } from "../types/items";
import { isGroupWithNameProps } from "../utils";
import { GroupControl } from "../controls/groupControl";
import { useSubscribe } from "../hooks";
import { GroupControls, Errors } from "../types/control";

import { formGroupContext } from "./context";

export const Group = (props: GroupProps) => {
  const { children } = props;

  const parentGroup = useContext(formGroupContext);

  const { name = undefined, control } = isGroupWithNameProps(props)
    ? { name: props.name, control: parentGroup!.get<GroupControl>(props.name) }
    : { control: props.control };

  const value = useSubscribe<GroupInternalProps["value"]>(control, control.value, control.valueChange);
  const controls = useSubscribe<GroupControls>(control, control.controls, control.controlsChange);
  const disabled = useSubscribe<boolean>(control, control.disabled, control.disabledChange);
  const dirty = useSubscribe<boolean>(control, control.dirty, control.dirtyChange);
  const valid = useSubscribe<boolean>(control, control.valid, control.validChange);
  const errors = useSubscribe<Errors | null>(control, control.errors, control.errorsChange);

  const childProps: GroupInternalProps = {
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

  return <formGroupContext.Provider value={control}>{children(childProps)}</formGroupContext.Provider>;
};
