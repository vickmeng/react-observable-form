import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import { Field, FieldControl } from "../../rrform";
import { TestInput } from "../../testUtils/testInput/testInput";

describe("value", () => {
    it("should show initValue correctly", () => {
        const formControl = new FieldControl({ value: true });
        const { getByTestId } = render(<Field control={formControl}>{TestInput}</Field>);

        const inputElement = getByTestId("testInputFormItem") as HTMLInputElement;

        expect(inputElement.checked).toBe(true);
    });

    describe("setValue", () => {
        it("should change value by manual operation and trigger formControl valueChange cb", async () => {
            const formControl = new FieldControl({ value: false });

            const { getByTestId } = render(<Field control={formControl}>{TestInput}</Field>);

            const inputElement = getByTestId("testInputFormItem") as HTMLInputElement;
            await userEvent.click(inputElement);

            expect(inputElement.checked).toBe(true);
        });

        it("should update view when formControl setValue called", async () => {
            const valueChangeCb = jest.fn();

            const formControl = new FieldControl({ value: false });

            formControl.valueChange.subscribe(valueChangeCb);

            const { getByTestId } = render(<Field control={formControl}>{TestInput}</Field>);

            const inputElement = getByTestId("testInputFormItem") as HTMLInputElement;

            act(() => {
                formControl.setValue(true);
            });

            expect(inputElement.checked).toBe(true);
            expect(valueChangeCb).toHaveBeenCalledWith(true);
        });
    });

    describe("distinct value change", () => {
        it("should trigger valueChangeCb when setValue called given different value", () => {
            const valueChangeCb = jest.fn();
            const formControl = new FieldControl({ value: false });
            formControl.valueChange.subscribe(valueChangeCb);

            formControl.setValue(formControl.value);
            expect(valueChangeCb).not.toHaveBeenCalled();

            formControl.setValue(!formControl.value);
            expect(valueChangeCb).toHaveBeenCalledTimes(1);
        });
    });
});
