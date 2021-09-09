import React from "react";
import { Button, TextField } from "@material-ui/core";

import { Field, Group, GroupControl } from "../../../packages/index";

const group = new GroupControl({
  consignee: ["Vick"],
  address: ["No.1,Chaowai Street,Chaoyang District,Beijing City"],
});

group.valueChange.subscribe((v) => {
  console.log(v);
});

const PlayGroundPage = () => {
  return (
    <Group control={group}>
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
                group.setValue({ consignee: "consignee", address: "address" });
              }}
            >
              set
            </Button>

            <Button
              variant="contained"
              color={"primary"}
              onClick={() => {
                group.reset();
              }}
            >
              reset
            </Button>

            <Button
              variant="contained"
              color={"primary"}
              onClick={() => {
                console.log(group.value);
              }}
            >
              在控制台中打印数据
            </Button>
          </>
        );
      }}
    </Group>
  );
};

export default PlayGroundPage;
