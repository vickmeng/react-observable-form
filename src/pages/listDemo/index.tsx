import React from "react";

import { ListControl } from "../../../packages/controls/listControl";
import { List } from "../../../packages/items/list";
import { Field } from "../../../packages/items/field";
import Input from "../../components/Input";

const formList = new ListControl([["vick"], [""]]);

const ListDemo = () => {
  return (
    <List control={formList}>
      {({ controls, ...rest }) => {
        return (
          <>
            <pre>{JSON.stringify(rest, null, 2)}</pre>
            {controls.map((control, i) => {
              return (
                <Field name={`${i}`} key={`key${i}`}>
                  {Input}
                </Field>
              );
            })}
          </>
        );
      }}
    </List>
  );
};

export default ListDemo;
