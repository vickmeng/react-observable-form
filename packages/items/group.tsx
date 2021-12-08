import React, { useContext } from "react";

import { GroupInternalProps, GroupProps } from "../types/items";
import { isGroupWithNameProps } from "../utils";
import { GroupControl } from "../controls/groupControl";
import { useControlControls, useControlDirty, useControlDisabled, useControlErrors, useControlValid } from "../hooks";

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
  const disabled = useControlDisabled(control);
  const dirty = useControlDirty(control);
  const valid = useControlValid(control);
  const errors = useControlErrors(control);
  const controls = useControlControls<GroupControl>(control);

  const childProps: GroupInternalProps = {
    name,
    disabled,
    enabled: !disabled,
    control,
    errors,
    valid: valid,
    invalid: !valid,
    dirty,
    pristine: !dirty,
    childControls: controls,
  };

  return <ParentFormContext.Provider value={control}>{children(childProps)}</ParentFormContext.Provider>;
};
