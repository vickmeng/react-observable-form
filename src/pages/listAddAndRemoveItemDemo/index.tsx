import React from "react";
import { Button, Input } from "antd";

import { List } from "../../../packages/items/list";
import { Field } from "../../../packages/items/field";
import { ListControl } from "../../../packages/controls/listControl";
import { Group } from "../../../packages/items/group";
import { GroupControl } from "../../../packages/controls/groupControl";
import { FieldControl } from "../../../packages/controls/fieldControl";

const formList = new ListControl([new FieldControl("vick")]);

// eslint-disable-next-line no-console
// formList.controlsChange.subscribe(console.log);

const ListAddAndRemoveItemDemo = () => {
  const onAddOneRow = () => {
    formList.push(new FieldControl("vick"));
  };

  const onAddTwoRows = () => {
    // formList.push(
    //   new GroupControl({
    //     name: [],
    //     address: [],
    //   }),
    //   new GroupControl({
    //     name: [],
    //     address: [],
    //   })
    // );
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <List control={formList}>
            {({ controls, ...rest }) => {
              return (
                <>
                  {controls.map((control, i) => {
                    return (
                      <tr key={i}>
                        <td>{i}</td>
                        <td>
                          <Field<string> name={`${i}`}>
                            {({ value, setValue }) => {
                              return (
                                <Input
                                  onChange={(e) => {
                                    setValue(e.target.value);
                                  }}
                                  value={value}
                                />
                              );
                            }}
                          </Field>
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              formList.remove(i);
                            }}
                          >
                            delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            }}
          </List>
        </tbody>
      </table>

      <Button type="primary" onClick={onAddOneRow}>
        add one row
      </Button>

      <Button type="primary" onClick={onAddTwoRows}>
        add two rows
      </Button>
    </>
  );
};

export default ListAddAndRemoveItemDemo;
