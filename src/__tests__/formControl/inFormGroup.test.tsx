import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Field, FieldControl, Group, GroupControl } from "../../rrform";
import { TestInput } from "../../testUtils/testInput/testInput";

describe("inFormGroup", () => {
    it("should get formControl from context by name", async () => {
        const formControl = new FieldControl({
            value: true,
            validators: [
                (value: string) => {
                    return value ? null : { canOnlyBeTrue: true };
                },
            ],
        });

        const formGroup = new GroupControl({
            controls: {
                employed: formControl,
            },
        });

        const { getByTestId } = render(
            <Group control={formGroup}>
                {() => {
                    return <Field name="employed">{TestInput}</Field>;
                }}
            </Group>
        );

        const inputElement = getByTestId("testInputFormItem") as HTMLInputElement;
        expect(inputElement.checked).toBe(true);

        await userEvent.click(inputElement);

        expect(inputElement.checked).toBe(false);
        expect(formControl.value).toBe(false);
    });
});
