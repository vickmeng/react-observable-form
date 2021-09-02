import React from "react";
import { TextField, FormHelperText } from "@material-ui/core";

import { Field, Group, GroupControl } from "../../../packages/index";
import { requiredValidator } from "../../../packages/validators";
import { ValidatorFn } from "../../../packages/types/control";
import { Error } from "../../../packages/items/error";
import { ErrorInternalProps } from "../../../packages/types/items";

interface FormValue {
  passWord: string;
  confirmPassWord: string;
}

const confirmPassword: ValidatorFn<FormValue> = (control) => {
  return control.value.confirmPassWord === control.value.passWord ? null : { confirmPassword: true };
};

const formGroup = new GroupControl(
  {
    passWord: ["", { validators: [requiredValidator] }],
    confirmPassWord: ["", { validators: [requiredValidator] }],
  },
  { validators: [confirmPassword] }
);

const RequiredErrorMessage = (props: ErrorInternalProps) => (
  <>{props.dirty && props.errors?.required && <FormHelperText error>{"必填项"}</FormHelperText>}</>
);

const UnitValidateDemo = () => {
  return (
    <>
      <Group control={formGroup}>
        {(props) => {
          return (
            <>
              <Field name="passWord">
                {({ value, setValue }) => {
                  return (
                    <TextField
                      label="密码"
                      variant="outlined"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  );
                }}
              </Field>
              <Error name="passWord">{RequiredErrorMessage}</Error>

              <br />
              <br />

              <Field name="confirmPassWord">
                {({ value, setValue }) => {
                  return (
                    <TextField
                      label="再次确认密码"
                      variant="outlined"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  );
                }}
              </Field>
              <Error name="confirmPassWord">{RequiredErrorMessage}</Error>
            </>
          );
        }}
      </Group>

      <Error control={formGroup}>
        {(props) => (
          <>{props.dirty && props.errors?.confirmPassword && <FormHelperText error>两次密码不一致</FormHelperText>}</>
        )}
      </Error>
    </>
  );
};

export default UnitValidateDemo;
