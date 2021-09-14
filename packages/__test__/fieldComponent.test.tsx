import { render } from "@testing-library/react";
import React from "react";

import { Field } from "../items/field";
import { FieldControl } from "../controls/fieldControl";

describe("<Field/>", () => {
  it("should render <Field/>", () => {
    const fieldControl = new FieldControl("Tom");

    const { asFragment } = render(
      <Field control={fieldControl}>
        {({ value }) => {
          return <input value={value} />;
        }}
      </Field>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
