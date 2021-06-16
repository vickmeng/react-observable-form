import React, { useRef } from "react";

import { Field, FieldControl } from "../../../packages/index";

const Basic = () => {
  const controlRef = useRef(new FieldControl<string>("vick"));

  return (
    <>
      <label className="form-label">name</label>
      <Field<string> control={controlRef.current}>{(props) => <>{props.value}</>}</Field>
    </>
  );
};

export default Basic;
