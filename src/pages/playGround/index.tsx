import React, { useRef } from "react";
import { TextField } from "@material-ui/core";

import { Field, FieldControl } from "../../../packages/index";
import { requiredValidator } from "../../../packages/validators";
import { AbstractControl } from "../../../packages/controls/abstractControl";

const asyncV1 = (control: AbstractControl<any>) => {
  if (control.value === "wrong") {
    return Promise.resolve({
      asyncError: true,
    });
  } else {
    return Promise.resolve(null);
  }
};

const PlayGroundPage = () => {
  const nameControl = useRef(
    new FieldControl("", {
      validators: [requiredValidator],
      asyncValidators: [asyncV1],
    })
  );

  return (
    <Field control={nameControl.current}>
      {({ value, setValue, valid, errors, asyncErrors }) => {
        return (
          <>
            <TextField label="name" value={value} onChange={(e) => setValue(e.target.value)} />
            <br />
            valid: {JSON.stringify(valid)}
            <br />
            errors:{JSON.stringify(errors)}
            <br />
            asyncErrors:{JSON.stringify(asyncErrors)}
          </>
        );
      }}
    </Field>
  );
};

export default PlayGroundPage;
