import React from "react";
import { Input } from "antd";

import { Field, FieldControl } from "../../../packages/index";
import { requiredValidator } from "../../../packages/validators";
import { Error } from "../../../packages/items/error";

const formControl = new FieldControl<string>("Tommy", { validators: [requiredValidator], autoMarkAsDirty: false });

const ManualMarkAsDirty = () => {
  return (
    <>
      <label className="form-label">name</label>
      <Field control={formControl}>
        {(props) => {
          return (
            <Input
              value={props.value}
              onFocus={() => {
                props.markAsPristine();
              }}
              onBlur={() => {
                props.markAsDirty();
              }}
              onChange={(e) => {
                props.setValue(e.target.value);
              }}
            ></Input>
          );
        }}
      </Field>
      <Error control={formControl}>
        {(props) => <p className="text-danger">{props.dirty && props.errors?.required && "必填项"}</p>}
      </Error>
    </>
  );
};

export default ManualMarkAsDirty;
