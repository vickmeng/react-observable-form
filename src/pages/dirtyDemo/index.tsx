import React from "react";

import { Field, FieldControl } from "../../../packages/index";
import Input from "../../components/Input";
import { required } from "../../../packages/validators";
import { Error } from "../../../packages/items/error";

const formControl = new FieldControl<string>("", { validators: [required] });

const DirtyDemo = () => {
  return (
    <>
      <div>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            formControl.markAsPristine();
          }}
        >
          Pristine
        </button>
      </div>

      <label className="form-label">name</label>
      <Field control={formControl}>{Input}</Field>
      <Error control={formControl}>
        {(props) => <p className="text-danger">{props.dirty && props.errors?.required && "必填项"}</p>}
      </Error>
    </>
  );
};

export default DirtyDemo;
