import React from "react";
import { render } from "@testing-library/react";

import { ListControl } from "../controls/listControl";
import { Field } from "../items/field";
import { List } from "../items/list";

describe("<List/>", () => {
  it("should render <List/>", () => {
    const listControl = new ListControl<string>([["Vick"], ["Tom"]]);
    const { asFragment } = render(
      <List<string> control={listControl}>
        {({ childControls }) => {
          return (
            <>
              {childControls.map((control, i) => {
                return (
                  <Field<string> name={`${i}`} key={`${i}`}>
                    {({ value }) => {
                      return <input value={value} readOnly />;
                    }}
                  </Field>
                );
              })}
            </>
          );
        }}
      </List>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
