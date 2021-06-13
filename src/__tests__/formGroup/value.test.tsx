import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GroupControl, Field, FieldControl, Group } from "../../rrform";
import { TestInput } from "../../testUtils/testInput/testInput";

describe("group value", () => {
    it("should init get value correctly", () => {
        const formGroup = new GroupControl({
            controls: {
                employed: new FieldControl({
                    value: true,
                }),
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

        expect(formGroup.value).toEqual({
            employed: true,
        });
    });

    it("should get value with disabled inner controls", () => {
        const formGroup = new GroupControl({
            controls: {
                employed: new FieldControl({
                    value: true,
                    disabled: true,
                }),
            },
        });

        expect(formGroup.value).toEqual({});
    });

    it("should update value correctly when formControl value change ", async () => {
        const valueChangeCb = jest.fn();

        const formGroup = new GroupControl({
            controls: {
                employed: new FieldControl({
                    value: true,
                }),
            },
        });

        formGroup.valueChange.subscribe(valueChangeCb);

        const { getByTestId } = render(
            <Group control={formGroup}>
                {() => {
                    return <Field name="employed">{TestInput}</Field>;
                }}
            </Group>
        );

        const inputElement = getByTestId("testInputFormItem") as HTMLInputElement;
        expect(formGroup.value).toEqual({
            employed: true,
        });

        await userEvent.click(inputElement);

        expect(formGroup.value).toEqual({
            employed: false,
        });
    });

    it("should update value correctly when formControl disabled or enabled change", () => {
        const valueChangeCb = jest.fn();

        const formControl = new FieldControl({
            value: true,
        });

        const formGroup = new GroupControl({
            controls: {
                employed: formControl,
            },
        });

        formGroup.valueChange.subscribe(valueChangeCb);

        expect(valueChangeCb).not.toHaveBeenCalled();
        expect(formGroup.value).toEqual({
            employed: true,
        });

        formControl.disable();

        expect(valueChangeCb).toHaveBeenCalledWith({});
        expect(valueChangeCb).toHaveBeenCalledTimes(1);

        formControl.enable();

        expect(formGroup.value).toEqual({
            employed: true,
        });
        expect(valueChangeCb).toHaveBeenCalledWith({
            employed: true,
        });
        expect(valueChangeCb).toHaveBeenCalledTimes(2);
    });

    it("should update when setValue called", () => {
        const valueChangeCb = jest.fn();

        const formGroup = new GroupControl({
            controls: {
                employed: new FieldControl({
                    value: true,
                }),
                adult: new FieldControl({
                    value: true,
                }),
            },
        });

        formGroup.valueChange.subscribe(valueChangeCb);
        const value = { employed: false, adult: false };
        formGroup.setValue(value);

        expect(valueChangeCb).toBeCalledWith(value);
        expect(valueChangeCb).toBeCalledTimes(1);
    });

    describe("distinct value change", () => {
        it("should trigger valueChangeCb when setValue called given different value", () => {
            const valueChangeCb = jest.fn();

            const formGroup = new GroupControl({
                controls: {
                    employed: new FieldControl({
                        value: true,
                    }),
                },
            });

            formGroup.valueChange.subscribe(valueChangeCb);

            formGroup.setValue(formGroup.value);
            expect(valueChangeCb).not.toHaveBeenCalled();

            formGroup.setValue({ employed: true });

            expect(valueChangeCb).toHaveBeenCalledTimes(1);
        });
    });
});
