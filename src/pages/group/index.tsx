import React from "react";

import { Field, FieldControl, Group, GroupControl } from "../../../packages/index";
import Input from "../../components/Input";

const formGroup = new GroupControl({
  name: new FieldControl("vick"),
  address: new FieldControl(""),
});

const GroupDemo = () => {
  return (
    <Group control={formGroup}>
      {(props) => {
        return (
          <>
            {JSON.stringify(props.value)}
            <Field name="name">{Input}</Field>
            <Field name="address">{Input}</Field>
          </>
        );
      }}
    </Group>
  );
};

export default GroupDemo;
