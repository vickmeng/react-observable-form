import { useContext } from "react";

import { ErrorProps } from "../types/items";
import { isErrorWithNameProps } from "../utils";
import { GroupControl } from "../controls/groupControl";
import { useSubscribe } from "../hooks";
import { Errors } from "../types/control";

import { formGroupContext } from "./context";

const Error = (props: ErrorProps) => {
  const { children } = props;

  const parentGroup = useContext(formGroupContext);

  const { name = undefined, control } = isErrorWithNameProps(props)
    ? { name: props.name, control: parentGroup!.get<GroupControl>(props.name) }
    : { control: props.control };

  const valid = useSubscribe<boolean>(control, control.valid, control.validChange);
  const errors = useSubscribe<Errors | null>(control, control.errors, control.errorsChange);

  const childrenProps = {
    name,
    valid,
    errors,
  };
  return children(childrenProps);
};

export default Error;
