import React, { useRef } from "react";
import { Field, FieldControl } from "react-observable-form";
import { Input, Form } from "antd";
import { TextField } from "@material-ui/core";

export const BasicWithAntd = () => {
  const controlRef = useRef(new FieldControl<string>(""));

  return (
    <Field control={controlRef.current}>
      {({ value, setValue }) => {
        return (
          <Form.Item label={"Ant Design"}>
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
          </Form.Item>
        );
      }}
    </Field>
  );
};

export const BasicWithMui = () => {
  const controlRef = useRef(new FieldControl<string>(""));

  return (
    <Field control={controlRef.current}>
      {({ value, setValue }) => {
        return <TextField label="material-ui" value={value} onChange={(e) => setValue(e.target.value)} />;
      }}
    </Field>
  );
};
