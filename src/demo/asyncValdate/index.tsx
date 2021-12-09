import React, { useRef } from "react";
import { InputAdornment, OutlinedInput } from "@material-ui/core";
import { Sync, CheckCircle, ErrorOutline } from "@material-ui/icons";

import { FieldControl } from "../../../packages/controls/fieldControl";
import { Field } from "../../../packages/items/field";
import { AbstractControl } from "../../../packages/controls/abstractControl";
import { Errors } from "../../../packages/types/control";
import "./index.less";

const asyncValidator = (control: AbstractControl<string>) => {
  return new Promise<Errors | null>((resolve) => {
    setTimeout(() => {
      if (control.value === "existed") {
        resolve({ existed: true });
      } else {
        resolve(null);
      }
    }, 2000);
  });
};

export const AsyncValidateUsername = () => {
  const controlRef = useRef(
    new FieldControl<string>("", {
      autoAsyncValidate: false,
      asyncValidators: [asyncValidator],
      autoMarkAsDirty: false,
    })
  );

  return (
    <Field control={controlRef.current}>
      {({ value, setValue, markAsDirty, asyncValidateAndUpdateErrors, valid, dirty }) => {
        return (
          <OutlinedInput
            label="username"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => {
              markAsDirty();
              asyncValidateAndUpdateErrors();
            }}
            endAdornment={
              <InputAdornment position="end">
                <>
                  {valid === "pending" && <Sync className={"pending-icon"} />}
                  {dirty && valid === true && <CheckCircle className={"success-icon"} />}
                  {dirty && valid === false && <ErrorOutline className={"failed-icon"} />}
                </>
              </InputAdornment>
            }
          />
        );
      }}
    </Field>
  );
};
