import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { FieldControl, Field } from "../../rrform";
import { TestInput } from "../../testUtils/testInput/testInput";

describe("enabled", () => {
    it("should init enabled status correctly", async () => {
        const formControl = new FieldControl({ value: "a", disabled: true });

        const { getByTestId } = render(<Field control={formControl}>{TestInput}</Field>);

        expect(formControl.enabled).toBe(false);
        expect(formControl.disabled).toBe(true);

        const disabledElement = getByTestId("testDisabled");

        expect(disabledElement.innerHTML).toBe("true");
    });

    it("should trigger enabledChange when formControl.disable called", async () => {
        const enabledStatusChangeCb = jest.fn();

        const formControl = new FieldControl({ value: true });

        formControl.enabledChange.subscribe(enabledStatusChangeCb);

        const { getByTestId } = render(<Field control={formControl}>{TestInput}</Field>);

        const disabledElement = getByTestId("testDisabled");

        expect(disabledElement.innerHTML).toBe("false");

        act(() => {
            formControl.disable();
        });

        expect(enabledStatusChangeCb).toBeCalledWith(false);
        expect(disabledElement.innerHTML).toBe("true");
    });

    it("should trigger enabledChange when formControl.enable called", async () => {
        const enabledStatusChangeCb = jest.fn();

        const formControl = new FieldControl({
            value: true,
            disabled: true,
        });

        formControl.enabledChange.subscribe(enabledStatusChangeCb);
        formControl.setValue(false);

        const { getByTestId } = render(<Field control={formControl}>{TestInput}</Field>);

        const disabledElement = getByTestId("testDisabled");

        expect(disabledElement.innerHTML).toBe("true");

        act(() => {
            formControl.enable();
        });

        expect(enabledStatusChangeCb).toBeCalledWith(true);
        expect(disabledElement.innerHTML).toBe("false");
    });

    describe("distinct enabled change", () => {
        it("should trigger errorsChangeCb when setErrors called given different errors", () => {
            const enabledChange = jest.fn();
            const formControl = new FieldControl({ value: false });
            formControl.enabledChange.subscribe(enabledChange);
            formControl.disable();
            expect(enabledChange).toHaveBeenCalledWith(false);
            expect(enabledChange).toHaveBeenCalledTimes(1);
            formControl.disable();
            expect(enabledChange).toHaveBeenCalledTimes(1);
            formControl.enable();
            expect(enabledChange).toHaveBeenCalledWith(true);
            expect(enabledChange).toHaveBeenCalledTimes(2);
        });
    });
});
