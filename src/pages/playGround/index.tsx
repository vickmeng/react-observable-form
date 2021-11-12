import React from "react";
import { TextField } from "@material-ui/core";

import { Field, FieldControl } from "../../../packages/index";
import { requiredValidator } from "../../../packages/validators";

const nameControl = new FieldControl("vick", {
  validators: [requiredValidator],
});

const PlayGroundPage = () => {
  return (
    <Field control={nameControl}>
      {({ value, setValue, valid, errors, dirty }) => {
        return (
          <>
            <TextField label="name" value={value} onChange={(e) => setValue(e.target.value)} />
            <br />
            {valid + ""}
            <br />
            {dirty + ""}
            <br />
            {JSON.stringify(errors)}
          </>
        );
      }}
    </Field>
  );
};

export default PlayGroundPage;
