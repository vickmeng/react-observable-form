import React, { useRef } from "react";
import { Button, Input, Radio } from "antd";

import { GroupControl } from "../../../packages/controls/groupControl";
import { Group } from "../../../packages/items/group";
import { Field } from "../../../packages/items/field";
import { FieldInternalProps } from "../../../packages/types/items";
import { ListControl } from "../../../packages/controls/listControl";
import { List } from "../../../packages/items/list";
import { requiredValidator } from "../../../packages/validators";
import { Error } from "../../../packages/items/error";

const requiredFamilyMembers = (value: string[]) => {
  if (value.every((v: any) => !v)) {
    return { required: true };
  } else {
    return null;
  }
};

const createForm = () => {
  const group = new GroupControl({
    married: [true],
    familyMembers: new ListControl([["", { validators: [requiredValidator] }]], {
      validators: [requiredValidator],
    }),
  });

  group.get("married").valueChange.subscribe((v) => {
    if (v) {
      group.get("familyMembers").setValidators([requiredValidator]);
    } else {
      group.get("familyMembers").setValidators([]);
    }
  });

  return group;
};

const input = ({ value, setValue }: FieldInternalProps) => {
  return (
    <Input
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
    />
  );
};

const radio = ({ value, setValue }: FieldInternalProps) => {
  return (
    <Radio.Group
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
    >
      <Radio value={true}>已婚</Radio>
      <Radio value={false}>未婚</Radio>
    </Radio.Group>
  );
};

const ListInGroupDemo = () => {
  const fromGroupRef = useRef(createForm());

  return (
    <Group control={fromGroupRef.current}>
      {(v) => (
        <>
          <Field name="married">{radio}</Field>

          <br />
          <br />
          <br />

          <List name="familyMembers">
            {({ controls, value }) => {
              return (
                <>
                  家庭成员
                  <ol>
                    {controls.map((control, i) => (
                      <li key={i}>
                        姓名：
                        <Error name={`${i}`}>
                          {({ errors, dirty }) => (
                            <>{dirty && errors?.required && <p className="text-danger">{"必填项"}</p>}</>
                          )}
                        </Error>
                        <Field name={`${i}`}>{input}</Field>
                      </li>
                    ))}
                  </ol>
                </>
              );
            }}
          </List>

          <Button
            onClick={() => {
              fromGroupRef.current.get<ListControl>("familyMembers").push(["", { validators: [requiredValidator] }]);
            }}
          >
            加一名
          </Button>
          <Error name="familyMembers">
            {({ errors, dirty }) => <>{errors?.required && <p className="text-danger">{"至少填一个家庭成员"}</p>}</>}
          </Error>
        </>
      )}
    </Group>
  );
};

export default ListInGroupDemo;
