import { useContext } from "react";

import { ErrorProps } from "../types/items";
import { isErrorWithNameProps } from "../utils";
import { GroupControl } from "../controls/groupControl";
import { useSubscribe } from "../hooks";
import { Errors } from "../types/control";

import { ParentFormContext } from "./context";

const Error = (props: ErrorProps) => {
  const { children } = props;

  const parentGroup = useContext(ParentFormContext);

  const { name = undefined, control } = isErrorWithNameProps(props)
    ? { name: props.name, control: parentGroup!.get<GroupControl>(props.name) }
    : { control: props.control };

  const valid = useSubscribe<boolean>(control, control.valid, control.validChange);
  const dirty = useSubscribe<boolean>(control, control.dirty, control.dirtyChange);
  const errors = useSubscribe<Errors | null>(control, control.errors, control.errorsChange);

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

export default Error;
