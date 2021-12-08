import { useContext } from "react";

import { ErrorInternalProps, ErrorProps } from "../types/items";
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

  const dirty = useControlDirty(control);
  const errors = useControlErrors(control);
  const valid = useControlValid(control);

  const childrenProps: ErrorInternalProps = {
    name,
    errors,
    dirty,
    pristine: !dirty,
    valid,
    invalid: !valid,
  };
  return children(childrenProps);
};
