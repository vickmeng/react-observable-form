import React, { useRef } from "react";
import { TextField, FormHelperText } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { requiredValidator } from "../../../packages/validators";
import { Error } from "../../../packages/items/error";
import { Field } from "../../../packages/items/field";
import { FieldControl } from "../../../packages/controls/fieldControl";
export const ValidateDemo = () => {
  const controlRef = useRef(new FieldControl("", { validators: [requiredValidator] }));

  return (
    <>
      <Field control={controlRef.current}>
        {({ value, setValue, dirty, errors }) => {
          return (
            <>
              <TextField
                variant="outlined"
                label={"姓名"}
                error={Boolean(dirty && errors)}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {/*  同样可以在<Field/>中消费errors */}
              {dirty && errors?.required && <ErrorOutlineIcon color={"error"} />}
            </>
          );
        }}
      </Field>
      <Error control={controlRef.current}>
        {({ dirty, errors }) => {
          return <FormHelperText error>{dirty && errors?.required && "请填写姓名"}</FormHelperText>;
        }}
      </Error>
    </>
  );
};

export default ValidateDemo;
