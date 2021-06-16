import React, { useRef } from "react";

import Input from "../../components/Input";
import { FieldControl, Field } from "../../../packages/index";

const Basic = () => {
  const controlRef = useRef(
    new FieldControl<string>({
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
