import React from "react";

import { GroupControl } from "../../../packages/controls/groupControl";
import { FieldControl } from "../../../packages/controls/fieldControl";
import { Field } from "../../../packages/items/field";
import Input from "../../components/Input";
import { Group } from "../../../packages/items/group";

const formGroup = new GroupControl({
  name: new FieldControl("vick"),
  detail: new GroupControl({
    tel: new FieldControl("13100000000"),
    address: new FieldControl("Beijing China"),
  }),
});

const NestedGroupDemo = () => {
  return (
    <Group control={formGroup}>
      {(props) => {
        return (
          <>
            <div className="text-info">整个Form的value: {JSON.stringify(props.value)}</div>

            <label className="form-label">name</label>
            <Field name="name">{Input}</Field>
            <div className="card p-3 bg-secondary">
              <Group name="detail">
                {(props) => {
                  return (
                    <>
                      <label className="form-label">tel</label>
                      <Field name="tel">{Input}</Field>
                      <label className="form-label">address</label>
                      <Field name="address">{Input}</Field>
                    </>
                  );
                }}
              </Group>
            </div>
          </>
        );
      }}
    </Group>
  );
};

export default NestedGroupDemo;
