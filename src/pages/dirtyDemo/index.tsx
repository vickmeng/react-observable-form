import React from "react";

import { Field, FieldControl } from "../../../packages/index";
import Input from "../../components/Input";

const formControl = new FieldControl<string>("vick");

const DirtyDemo = () => {
  return (
    <>
      {/* <button */}
      {/*  className="btn btn-primary btn-lg" */}
      {/*  onClick={() => { */}
      {/*    formControl.disable(); */}
      {/*  }} */}
      {/* > */}
      {/*  disable */}
      {/* </button> */}

      {/* <button */}
      {/*  className="btn btn-primary btn-lg" */}
      {/*  onClick={() => { */}
      {/*    formControl.enable(); */}
      {/*  }} */}
      {/* > */}
      {/*  enable */}
      {/* </button> */}

      <label className="form-label">name</label>
      <Field control={formControl}>{Input}</Field>
    </>
  );
};

export default DirtyDemo;
