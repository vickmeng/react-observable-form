import React, { useRef } from "react";

import { Field, FieldControl } from "../../../packages/index";
import Input from "../../components/Input";

const Basic = () => {
  const controlRef = useRef(new FieldControl<string>("vick"));

  return (
    <>
      <label className="form-label">name</label>
      <Field control={controlRef.current}>{Input}</Field>
    </>
  );
};

export default Basic;
