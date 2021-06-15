import React, { ChangeEvent, useRef } from "react";

import { Field, FieldControl, FieldInternalProps } from "../../../react-rxjs-form-dist";

const Input = (props: FieldInternalProps) => {
  const value = props.value as string;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setValue(e.target.value);
  };

  return <input className="form-control" value={value} onChange={onChange} />;
};

const Basic = () => {
  const controlRef = useRef(
    new FieldControl({
      value: "vick",
    })
  );

  return (
    <>
      <label className="form-label">name</label>
      <Field control={controlRef.current}>{Input}</Field>
    </>
  );
};

export default Basic;
