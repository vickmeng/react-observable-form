import React, { useRef } from "react";
import { Button, TextField } from "@material-ui/core";

import { Field, Group, GroupControl } from "../../../packages/index";

const GroupDemo = () => {
  // const groupControlRef = useRef(
  //   new GroupControl({
  //     consignee: new FieldControl("vick"),
  //     address: new FieldControl("No.1,Chaowai Street,Chaoyang District,Beijing City"),
  //   })
  // );

  const groupControlRef = useRef(
    new GroupControl({
      consignee: ["vick"],
      address: ["No.1,Chaowai Street,Chaoyang District,Beijing City"],
    })
  );

  return (
    <Group control={groupControlRef.current}>
      {(props) => {
        return (
          <>
            <Field name="consignee">
              {({ value, setValue }) => {
                return (
                  <TextField
                    label="consignee"
                    variant="outlined"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                );
              }}
            </Field>

            <br />
            <br />

            <Field name="address">
              {({ value, setValue }) => {
                return (
                  <TextField
                    label="address"
                    variant="outlined"
                    multiline
                    maxRows={14}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                );
              }}
            </Field>
            <br />
            <br />

            <Button
              variant="contained"
              color={"primary"}
              onClick={() => {
                console.log(groupControlRef.current.value);
              }}
            >
              打印数据
            </Button>
          </>
        );
      }}
    </Group>
  );
};

export default GroupDemo;
