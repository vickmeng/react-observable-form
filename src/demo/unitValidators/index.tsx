import React from "react";

import { Field, Group, GroupControl } from "../../../packages/index";
import Input from "../../components/Input";
import { required } from "../../../packages/validators";
import { ValidatorFn } from "../../../packages/types/control";
import { Error } from "../../../packages/items/error";
import { ErrorInternalProps } from "../../../packages/types/items";

interface FormValue {
  passWord: string;
  confirmPassWord: string;
}

const confirmPassword: ValidatorFn<FormValue> = (value) => {
  return value.confirmPassWord === value.passWord ? null : { confirmPassword: true };
};

const formGroup = new GroupControl(
  {
    passWord: ["", { validators: [required] }],
    confirmPassWord: ["", { validators: [required] }],
  },
  { validators: [confirmPassword] }
);

const RequiredErrorMessage = (props: ErrorInternalProps) => (
  <p className="text-danger">{props.errors?.required && "必填项"}</p>
);

const UnitValidateDemo = () => {
  return (
    <>
      <Group control={formGroup}>
        {(props) => {
          return (
            <>
              <div>
                <label className="form-label">密码</label>
                <Field name="passWord">{Input}</Field>
                <Error name="passWord">{RequiredErrorMessage}</Error>
              </div>
              <div>
                <label className="form-label">再次确认密码</label>
                <Field name="confirmPassWord">{Input}</Field>
                <Error name="confirmPassWord">{RequiredErrorMessage}</Error>
              </div>
            </>
          );
        }}
      </Group>

      <Error control={formGroup}>
        {(props) => <p className="text-danger">{props.errors?.confirmPassword && "两次密码不一致"}</p>}
      </Error>
    </>
  );
};

export default UnitValidateDemo;
