import React, { useRef } from "react";

import { Field, FieldControl } from "../../../react-rxjs-form-dist";
import MyInput from "../../components/myInput";

const Basic = () => {
  const controlRef = useRef(
    new FieldControl({
      value: "vick",
    })
  );

  return (
    <>
      <label className="form-label">name</label>
      <Field control={controlRef.current}>{MyInput}</Field>
    </>
  );
};

export default Basic;
