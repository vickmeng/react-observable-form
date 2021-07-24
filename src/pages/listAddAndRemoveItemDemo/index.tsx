import React from "react";
import { Button, Input } from "antd";

import { List } from "../../../packages/items/list";
import { Field } from "../../../packages/items/field";
import { ListControl } from "../../../packages/controls/listControl";
import { Group } from "../../../packages/items/group";
import { GroupControl } from "../../../packages/controls/groupControl";
import { FieldControl } from "../../../packages/controls/fieldControl";

const formList = new ListControl([
  new GroupControl({
    name: new FieldControl("vick"),
    address: new FieldControl(""),
  }),
]);

// eslint-disable-next-line no-console
formList.valueChange.subscribe(console.log);

const ListAddAndRemoveItemDemo = () => {
  const onAddOneRow = () => {
    formList.push(
      new GroupControl({
        name: [],
        address: [],
      })
    );
  };

  const onAddTwoRows = () => {
    formList.push(
      new GroupControl({
        name: [],
        address: [],
      }),
      new GroupControl({
        name: [],
        address: [],
      })
    );
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">address</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <List control={formList}>
            {({ controls, value }) => {
              return (
                <>
                  {controls.map((control, i) => {
                    return (
                      <tr key={`key${i}`}>
                        <Group name={`${i}`}>
                          {() => {
                            return (
                              <>
                                <td>{i}</td>
                                <td>
                                  <Field<string> name="name">
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
                                  <Field<string> name="address">
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
                                  <Button
                                    onClick={() => {
                                      formList.insert(
                                        i + 1,
                                        new GroupControl({
                                          name: [],
                                          address: [],
                                        })
                                      );
                                    }}
                                  >
                                    insert
                                  </Button>
                                </td>
                              </>
                            );
                          }}
                        </Group>
                      </tr>
                    );
                  })}

                  <pre>{JSON.stringify(value, null, 2)}</pre>
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
