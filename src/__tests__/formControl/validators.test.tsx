import { render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";

import { Field, FieldControl } from "../../rrform";
import { TestInput } from "../../testUtils/testInput/testInput";

describe("validators", () => {
    it("should set errors and mark valid as false when init item given wrong value", async () => {
        const formControl = new FieldControl({
            value: false,
            validators: [
                (value: string) => {
                    return value ? null : { canOnlyBeTrue: true };
                },
            ],
        });

        const { getByTestId } = render(<Field control={formControl}>{TestInput}</Field>);

        expect(formControl.valid).toBe(false);
        expect(formControl.invalid).toBe(true);

        expect(getByTestId("testInvalid").innerHTML).toEqual("true");
        expect(getByTestId("testValid").innerHTML).toEqual("false");
        expect(getByTestId("testErrors").innerHTML).toEqual('{"canOnlyBeTrue":true}');
    });

    it("should set valid as false and trigger statusChange when setValue given wrong value ", async () => {
        const validStatusChangeCb = jest.fn();
        const formControl = new FieldControl({
            value: true,
            validators: [
                (value: string) => {
                    return value ? null : { canOnlyBeTrue: true };
                },
            ],
        });

        formControl.validChange.subscribe(validStatusChangeCb);
        expect(validStatusChangeCb).not.toHaveBeenCalled();

        const { getByTestId } = render(<Field control={formControl}>{TestInput}</Field>);

        act(() => {
            formControl.setValue(false);
        });

        expect(getByTestId("testValue").innerHTML).toEqual("false");
        expect(getByTestId("testInvalid").innerHTML).toEqual("true");
        expect(getByTestId("testValid").innerHTML).toEqual("false");
        expect(getByTestId("testErrors").innerHTML).toEqual('{"canOnlyBeTrue":true}');
        expect(validStatusChangeCb).toBeCalledWith(false);
        expect(validStatusChangeCb).toHaveBeenCalledTimes(1);
    });

    it("should re-valid and update errors when trigger setValidators", async () => {
        const formControl = new FieldControl({
            value: false,
            validators: [],
        });

        const { getByTestId } = render(<Field control={formControl}>{TestInput}</Field>);

        expect(getByTestId("testErrors").innerHTML).toEqual("null");

        act(() => {
            formControl.setValidators([
                (value: string) => {
                    return value ? null : { canOnlyBeTrue: true };
                },
            ]);
        });

        expect(getByTestId("testErrors").innerHTML).toEqual('{"canOnlyBeTrue":true}');
    });
});
