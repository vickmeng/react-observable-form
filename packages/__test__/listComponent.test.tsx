import React from "react";
import { render } from "@testing-library/react";

import { ListControl } from "../controls/listControl";
import { Field } from "../items/field";
import { List } from "../items/list";

describe("<List/>", () => {
  it("should render <List/>", () => {
    const listControl = new ListControl([["Vick"], ["Tom"]]);
    const { asFragment } = render(
      <List control={listControl}>
        {({ controls }) => {
          return (
            <>
              {controls.map((control, i) => {
                return (
                  <Field<string> name={`${i}`} key={`${i}`}>
                    {({ value }) => {
                      return <input value={value} />;
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
