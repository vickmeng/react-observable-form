import React, { useContext } from "react";

import { GroupProps, GroupInternalProps } from "../types/items";
import { isGroupWithNameProps } from "../utils";
import { GroupControl } from "../controls/groupControl";
import { useSubscribe } from "../hooks";
import { Controls, Errors } from "../types/control";

import { formGroupContext } from "./context";

export const Group = (props: GroupProps) => {
  const { children } = props;

  const parentGroup = useContext(formGroupContext);

  const { name = undefined, control } = isGroupWithNameProps(props)
    ? { name: props.name, control: parentGroup!.get<GroupControl>(props.name) }
    : { control: props.control };

  const value = useSubscribe<GroupInternalProps["value"]>(control, control.value, control.valueChange);
  const controls = useSubscribe<Controls>(control, control.controls, control.controlsChange);
  const enabled = useSubscribe<boolean>(control, control.disabled, control.disabledChange);
  const valid = useSubscribe<boolean>(control, control.valid, control.validChange);
  const errors = useSubscribe<Errors | null>(control, control.errors, control.errorsChange);

  const childProps: GroupInternalProps = {
    name,
    value,
    enabled,
    disabled: !enabled,
    errors,
    valid: valid,
    invalid: !valid,
    controls,
  };

  return <formGroupContext.Provider value={control}>{children(childProps)}</formGroupContext.Provider>;
};
