import React, { useRef } from "react";
import { InputAdornment, TextField, Button } from "@material-ui/core";
import { Sync, CheckCircle, ErrorOutline } from "@material-ui/icons";
import { take } from "rxjs/operators";

import "./index.less";
import { Field } from "../../../packages/items/field";
import { AsyncValidatorFn } from "../../../packages/types/control";
import { useControlValid } from "../../../packages/hooks";
import { requiredValidator } from "../../../packages/validators";
import { FieldControl } from "../../../packages/controls/fieldControl";

const asyncValidator: AsyncValidatorFn<string> = (control) => {
  return new Promise((resolve) => {
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
      validators: [requiredValidator],
      asyncValidators: [asyncValidator],
      autoAsyncValidate: false,
      autoMarkAsDirty: false,
    })
  );

  const valid = useControlValid(controlRef.current);

  const onSubmit = () => {
    const handleSubmit = () => {
      // eslint-disable-next-line no-console
      console.log("提交成功", {
        username: usernameControl.value,
      });
    };

    const usernameControl = controlRef.current;

    if (usernameControl.valid === true) {
      handleSubmit();
    }

    if (usernameControl.valid === "pending") {
      usernameControl.validChange.pipe(take(1)).subscribe((valid) => {
        if (valid) {
          handleSubmit();
        }
      });
    }
  };

  return (
    <>
      <Field control={controlRef.current}>
        {({ value, setValue, markAsDirty, asyncValidateAndUpdateErrors, valid, dirty }) => {
          return (
            <TextField
              label="username"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={(e) => {
                markAsDirty();
                asyncValidateAndUpdateErrors();
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <>
                      {valid === "pending" && <Sync className={"pending-icon"} />}
                      {dirty && valid === true && <CheckCircle className={"success-icon"} />}
                      {dirty && valid === false && <ErrorOutline className={"failed-icon"} />}
                    </>
                  </InputAdornment>
                ),
              }}
            />
          );
        }}
      </Field>

      <div>
        <Button disabled={valid === false} onClick={onSubmit}>
          submit
        </Button>
      </div>
    </>
  );
};
