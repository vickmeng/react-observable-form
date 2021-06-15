import React, { useContext } from "react";

import { GroupAttributes, IGroupProps } from "../../types/item";
import { isGroupAsChildAttributes } from "../../utils";
import { GroupControl } from "../../control/groupControl";
import { useSubscribe } from "../../utils/hook";
import { Controls, Errors } from "../../types/control";

import { formGroupContext } from "./context";

export const Group = (props: GroupAttributes) => {
  const { children } = props;

  const parentGroup = useContext(formGroupContext);

  const { name = undefined, control } = isGroupAsChildAttributes(props)
    ? { name: props.name, control: parentGroup!.get<GroupControl>(props.name) }
    : { control: props.control };

  const controls = useSubscribe<Controls>(control, control.controls, control.controlsChange);
  const enabled = useSubscribe<boolean>(control, control.enabled, control.enabledChange);
  const valid = useSubscribe<boolean>(control, control.valid, control.validChange);
  const errors = useSubscribe<Errors | null>(control, control.errors, control.errorsChange);

  const childProps: IGroupProps = {
    name,
    enabled,
    disabled: !enabled,
    errors,
    valid: valid,
    invalid: !valid,
    group: control,
    controls,
  };

  return <formGroupContext.Provider value={control}>{children(childProps)}</formGroupContext.Provider>;
};
