import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { TestInput } from "../../testUtils/testInput/testInput";
import { GroupControl, FieldControl, Group, Field } from "../../rrform";

describe("group validators", () => {
    describe("errors", () => {
        it("should init errors correctly", () => {
            const formGroup = new GroupControl({
                controls: {
                    married: new FieldControl({
                        value: true,
                    }),
                    mateName: new FieldControl({
                        value: null,
                    }),
                },
                validators: [
                    (v: any) => {
                        return v.married && !v.mateName
                            ? {
                                  mateNameNoFound: true,
                              }
                            : null;
                    },
                ],
            });

            expect(formGroup.errors).toEqual({
                mateNameNoFound: true,
            });
        });

        it("should trigger errorsChange cb when setValue", () => {
            const errorsChangeCb = jest.fn();

            const formGroup = new GroupControl({
                controls: {
                    married: new FieldControl({
                        value: true,
                    }),
                    mateName: new FieldControl({
                        value: null,
                    }),
                },
                validators: [
                    (v: any) => {
                        return v.married && !v.mateName
                            ? {
                                  mateNameNoFound: true,
                              }
                            : null;
                    },
                ],
            });

            formGroup.errorsChange.subscribe(errorsChangeCb);
            expect(errorsChangeCb).not.toHaveBeenCalled();

            formGroup.setValue({
                married: false,
                mateName: "",
            });

            expect(errorsChangeCb).toHaveBeenCalledWith(null);
            expect(errorsChangeCb).toHaveBeenCalledTimes(1);

            formGroup.setValue({
                married: true,
                mateName: "",
            });

            expect(errorsChangeCb).toHaveBeenCalledWith({
                mateNameNoFound: true,
            });
            expect(errorsChangeCb).toHaveBeenCalledTimes(2);
        });
    });

    describe("valid", () => {
        describe("should init valid correctly", () => {
            it("given valid group with valid controls", () => {
                const formGroup = new GroupControl({
                    controls: {
                        married: new FieldControl({
                            value: true,
                        }),
                    },
                });

                expect(formGroup.valid).toBe(true);
                expect(formGroup.invalid).toBe(false);
            });

            it("given invalid group with valid controls", () => {
                const formGroup = new GroupControl({
                    controls: {
                        married: new FieldControl({
                            value: false,
                        }),
                    },
                    validators: [
                        (v: any) => {
                            return v.married
                                ? null
                                : {
                                      mustBeMarried: true,
                                  };
                        },
                    ],
                });

                expect(formGroup.valid).toBe(false);
            });

            it("given valid group with invalid controls", () => {
                const formGroup = new GroupControl({
                    controls: {
                        married: new FieldControl({
                            value: false,
                            validators: [
                                (value: string) => {
                                    return value ? null : { canOnlyBeTrue: true };
                                },
                            ],
                        }),
                    },
                });

                expect(formGroup.valid).toBe(false);
            });
        });

        describe("valid change", () => {
            it("group value change will trigger valid change", () => {
                const formGroup = new GroupControl({
                    controls: {
                        married: new FieldControl({
                            value: false,
                        }),
                    },
                    validators: [
                        (v: any) => {
                            return v.married
                                ? null
                                : {
                                      mustBeMarried: true,
                                  };
                        },
                    ],
                });
                const validChangeCb = jest.fn();
                formGroup.validChange.subscribe(validChangeCb);

                expect(validChangeCb).not.toHaveBeenCalled();

                formGroup.setValue({ married: true });
                expect(validChangeCb).toHaveBeenCalledWith(true);
                expect(validChangeCb).toHaveBeenCalledTimes(1);

                formGroup.setValue({ married: false });

                expect(validChangeCb).toHaveBeenCalledWith(false);
                expect(validChangeCb).toHaveBeenCalledTimes(2);
            });

            it("controls value change will trigger valid change ", async () => {
                const formControl = new FieldControl({
                    value: false,
                    validators: [
                        (value: boolean) => {
                            return value ? null : { canOnlyBeTrue: true };
                        },
                    ],
                });

                const formGroup = new GroupControl({
                    controls: {
                        married: formControl,
                    },
                });

                const { getByTestId } = render(
                    <Group control={formGroup}>
                        {() => {
                            return <Field name="married">{TestInput}</Field>;
                        }}
                    </Group>
                );

                const validChangeCb = jest.fn();
                formGroup.validChange.subscribe(validChangeCb);

                const inputElement = getByTestId("testInputFormItem") as HTMLInputElement;

                expect(validChangeCb).not.toHaveBeenCalled();

                await userEvent.click(inputElement);

                expect(validChangeCb).toHaveBeenCalledWith(true);
                expect(validChangeCb).toHaveBeenCalledTimes(1);

                await userEvent.click(inputElement);

                expect(validChangeCb).toHaveBeenCalledWith(false);
                expect(validChangeCb).toHaveBeenCalledTimes(2);
            });

            it("controls set validators will trigger valid change ", () => {
                const formControl = new FieldControl({
                    value: false,
                    validators: [],
                });

                const formGroup = new GroupControl({
                    controls: {
                        married: formControl,
                    },
                });

                const validChangeCb = jest.fn();
                formGroup.validChange.subscribe(validChangeCb);

                expect(validChangeCb).not.toHaveBeenCalled();

                formControl.setValidators([
                    (value: string) => {
                        return value ? null : { canOnlyBeTrue: true };
                    },
                ]);

                expect(validChangeCb).toHaveBeenCalledWith(false);
                expect(validChangeCb).toHaveBeenCalledTimes(1);

                formControl.setValidators([]);

                expect(validChangeCb).toHaveBeenCalledWith(true);
                expect(validChangeCb).toHaveBeenCalledTimes(2);
            });
        });
    });

    describe("setValidators", () => {
        it("group set validators will trigger valid change and error change", () => {
            const formGroup = new GroupControl({
                controls: {
                    married: new FieldControl({
                        value: false,
                    }),
                },
            });

            const errorsChangeCb = jest.fn();
            const validChangeCb = jest.fn();

            formGroup.errorsChange.subscribe(errorsChangeCb);
            formGroup.validChange.subscribe(validChangeCb);

            expect(errorsChangeCb).not.toHaveBeenCalled();
            expect(validChangeCb).not.toHaveBeenCalled();

            formGroup.setValidators([
                (v: any) => {
                    return v.married
                        ? null
                        : {
                              mustBeMarried: true,
                          };
                },
            ]);

            expect(errorsChangeCb).toHaveBeenCalledWith({
                mustBeMarried: true,
            });
            expect(errorsChangeCb).toHaveBeenCalledTimes(1);

            expect(validChangeCb).toHaveBeenCalledWith(false);
            expect(validChangeCb).toHaveBeenCalledTimes(1);

            formGroup.setValidators([]);

            expect(errorsChangeCb).toHaveBeenCalledWith(null);
            expect(errorsChangeCb).toHaveBeenCalledTimes(2);

            expect(validChangeCb).toHaveBeenCalledWith(true);
            expect(validChangeCb).toHaveBeenCalledTimes(2);
        });
    });
});
