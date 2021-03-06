import React from "react";
import { render } from "@testing-library/react";

import { GroupControl } from "../controls/groupControl";
import { Field } from "../items/field";
import { Group } from "../items/group";
import { Error } from "../items/error";
import { List } from "../items/list";
import { ListControl } from "../controls/listControl";
import { requiredValidator } from "../validators";

describe("nest components", () => {
  it("should render correctly", () => {
    const groupControl = new GroupControl({
      name: ["", { validators: [requiredValidator] }],
      familyMembers: new ListControl([
        new GroupControl({
          name: ["Tom"],
          tel: ["13133333333"],
        }),
      ]),
    });

    const { asFragment } = render(
      <Group control={groupControl}>
        {(props) => (
          <>
            <Field<string> name="name">{({ value }) => <input value={value} readOnly />}</Field>
            <Error name="name">{({ errors }) => <>{errors?.required && "至少填一名家庭成员"}</>}</Error>

            <List name="familyMembers">
              {({ childControls }) => {
                return (
                  <>
                    {childControls.map((control, i) => {
                      return (
                        <Group name={`${i}`} key={`${i}`}>
                          {() => {
                            return (
                              <>
                                <Field<string> name="name">{({ value }) => <input value={value} readOnly />}</Field>
                                <Field<string> name="tel">{({ value }) => <input value={value} readOnly />}</Field>
                              </>
                            );
                          }}
                        </Group>
                      );
                    })}
                  </>
                );
              }}
            </List>
          </>
        )}
      </Group>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
