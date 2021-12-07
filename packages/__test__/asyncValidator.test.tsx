import { FieldControl } from "../controls/fieldControl";
import { AbstractControl } from "../controls/abstractControl";

const asyncValidator = (control: AbstractControl<string>) => {
  if (control.value === "wrong") {
    return Promise.resolve({
      asyncError: true,
    });
  } else {
    return Promise.resolve(null);
  }
};

describe("asyncValidator", () => {
  it("should trigger asyncValidators correctly when init control given wrong default value", () => {
    const asyncErrorsChangeCbSpy = jest.fn();
    const validChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl("wrong", {
      asyncValidators: [asyncValidator],
    });
    fieldControl.validChange.subscribe(validChangeCbSpy);
    fieldControl.asyncErrorsChange.subscribe(asyncErrorsChangeCbSpy);

    expect(fieldControl.valid).toBe(true);
    expect(fieldControl.asyncErrors).toBe(null);

    Promise.resolve()
      .then()
      .catch()
      .finally(() => {
        expect(fieldControl.asyncErrors).toEqual({
          asyncError: true,
        });

        expect(validChangeCbSpy).toBeCalledTimes(1);
        expect(validChangeCbSpy).toBeCalledWith(false);

        expect(asyncErrorsChangeCbSpy).toBeCalledTimes(1);
        expect(asyncErrorsChangeCbSpy).toBeCalledWith({
          asyncError: true,
        });
      });
  });
});
