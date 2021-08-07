import { useContext } from "react";

import { ErrorProps } from "../types/items";
import { isErrorWithNameProps } from "../utils";
import { GroupControl } from "../controls/groupControl";
import { useControlDirty, useControlErrors, useControlValid } from "../hooks";

import { ParentFormContext } from "./context";

export const Error = (props: ErrorProps) => {
  const { children } = props;

  const parentGroup = useContext(ParentFormContext);

  const { name = undefined, control } = isErrorWithNameProps(props)
    ? { name: props.name, control: parentGroup!.get<GroupControl>(props.name) }
    : { control: props.control };

  const valid = useControlValid(control);
  const dirty = useControlDirty(control);
  const errors = useControlErrors(control);

  const childrenProps = {
    name,
    errors,
    valid,
    invalid: valid,
    dirty,
    pristine: !dirty,
  };
  return children(childrenProps);
};
