import React, { useContext } from "react";

import { GroupInternalProps, GroupProps } from "../types/items";
import { isGroupWithNameProps } from "../utils";
import { GroupControl } from "../controls/groupControl";
import {
  useControlControls,
  useControlDirty,
  useControlDisabled,
  useControlErrors,
  useControlValid,
  useControlValue,
} from "../hooks";
import { GroupValue } from "../types/control";
import { ListControl } from "../controls/listControl";

import { ParentFormContext } from "./context";

export const Group = (props: GroupProps) => {
  const { children } = props;

  const parent = useContext(ParentFormContext);

  const { name = undefined, control } = isGroupWithNameProps(props)
    ? { name: props.name, control: parent!.get<GroupControl>(props.name) }
    : { control: props.control };

  if (!(control instanceof GroupControl)) {
    throw new Error("props error:Group can only receive GroupControl as control");
  }

  const value = useControlValue<GroupValue>(control);
  const disabled = useControlDisabled(control);
  const dirty = useControlDirty(control);
  const valid = useControlValid(control);
  const errors = useControlErrors(control);
  const controls = useControlControls<GroupControl>(control);

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

  return <ParentFormContext.Provider value={control}>{children(childProps)}</ParentFormContext.Provider>;
};
