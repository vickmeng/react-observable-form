import React from "react";

import { Field, Group, GroupControl } from "../../../packages/index";
import Input from "../../components/Input";

const formGroup = new GroupControl({
  name: ["vick"],
});

const GroupDynamicControlDemo = () => {
  return (
    <>
      <div>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            formGroup.get("name").disable();
          }}
        >
          disable name
        </button>

        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            formGroup.get("name").enable();
          }}
        >
          enable name
        </button>
      </div>

      <div>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            formGroup.add("address", ["Beijing China"]);
          }}
        >
          add address
        </button>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            formGroup.remove("address");
          }}
        >
          remove address
        </button>
      </div>

      <Group control={formGroup}>
        {(props) => {
          return (
            <>
              {JSON.stringify(props.value)}
              <Field name="name">{Input}</Field>
              {props.controls.address && <Field name="address">{Input}</Field>}
            </>
          );
        }}
      </Group>
    </>
  );
};

export default GroupDynamicControlDemo;
