import React, { ChangeEvent } from "react";

import { FieldInternalProps } from "../../../packages/types/items";

const Input = (props: FieldInternalProps) => {
  const value = props.value;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setValue(e.target.value);
  };

  return (
    <>
      <input className="form-control" value={value} onChange={onChange} />
      <div>value: {JSON.stringify(props.value)}</div>
      <div>invalid: {JSON.stringify(props.invalid)}</div>
      <div>errors: {JSON.stringify(props.errors)}</div>
      <div>disabled: {JSON.stringify(props.disabled)}</div>
    </>
  );
};

export default Input;
