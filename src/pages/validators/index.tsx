import React from "react";

import { Field, FieldControl, Group, GroupControl } from "../../../packages/index";
import Input from "../../components/Input";
import { required } from "../../../packages/validators";
import { ValidatorFn } from "../../../packages/types/control";

interface FormValue {
  passWord: string;
  confirmPassWord: string;
}

const confirmPassword: ValidatorFn<FormValue> = (value) => {
  return value.confirmPassWord === value.passWord ? null : { confirmPassword: true };
};

const formGroup = new GroupControl(
  {
    passWord: new FieldControl("", { validators: [required] }),
    confirmPassWord: new FieldControl("", { validators: [required] }),
  },
  { validators: [confirmPassword] }
);

const ValidatorsDemo = () => {
  return (
    <>
      <Group control={formGroup}>
        {(props) => {
          return (
            <>
              <label className="form-label">form级errors</label>
              <pre className="text-info">{JSON.stringify(props.errors, null, 2)}</pre>

              <label className="form-label">密码</label>
              <Field name="passWord">{Input}</Field>
              <label className="form-label">再次确认密码</label>
              <Field name="confirmPassWord">{Input}</Field>
            </>
          );
        }}
      </Group>
    </>
  );
};

export default ValidatorsDemo;
