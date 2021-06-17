import React from "react";

import { Field, FieldControl } from "../../../packages/index";
import Input from "../../components/Input";

const formControl = new FieldControl<string>("vick");

const Basic = () => {
  return (
    <>
      <label className="form-label">name</label>
      <Field control={formControl}>{Input}</Field>
    </>
  );
};

export default Basic;
