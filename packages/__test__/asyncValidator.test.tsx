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
  it("should trigger asyncValidators correctly when init control given wrong default value", async () => {
    const asyncErrorsChangeCbSpy = jest.fn();
    const validChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl("wrong", {
      asyncValidators: [asyncValidator],
    });
    fieldControl.validChange.subscribe(validChangeCbSpy);
    fieldControl.asyncErrorsChange.subscribe(asyncErrorsChangeCbSpy);

    expect(fieldControl.valid).toBe(true);
    expect(fieldControl.asyncErrors).toBe(null);

    await Promise.resolve()
      .then()
      .catch()
      .finally(() => {
        expect(fieldControl.valid).toBe(false);
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

  it("should trigger asyncValidators correctly when setValue called", async () => {
    const asyncErrorsChangeCbSpy = jest.fn();
    const validChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl("", {
      asyncValidators: [asyncValidator],
    });

    fieldControl.validChange.subscribe(validChangeCbSpy);
    fieldControl.asyncErrorsChange.subscribe(asyncErrorsChangeCbSpy);

    fieldControl.setValue("wrong");

    expect(fieldControl.valid).toBe(true);
    expect(fieldControl.asyncErrors).toBe(null);

    await Promise.resolve()
      .then()
      .catch()
      .finally(() => {
        expect(fieldControl.valid).toBe(false);
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

    fieldControl.setValue("right");

    await Promise.resolve()
      .then()
      .catch()
      .finally(() => {
        expect(fieldControl.valid).toBe(true);
        expect(fieldControl.asyncErrors).toEqual(null);

        expect(validChangeCbSpy).toBeCalledTimes(2);
        expect(validChangeCbSpy).toBeCalledWith(true);

        expect(asyncErrorsChangeCbSpy).toBeCalledTimes(2);
        expect(asyncErrorsChangeCbSpy).toBeCalledWith(null);
      });
  });

  it("should handle async validate correctly when setAsyncValidate called", async () => {
    const asyncErrorsChangeCbSpy = jest.fn();
    const validChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl("wrong", {});

    fieldControl.validChange.subscribe(validChangeCbSpy);
    fieldControl.asyncErrorsChange.subscribe(asyncErrorsChangeCbSpy);

    expect(fieldControl.valid).toBe(true);
    expect(fieldControl.asyncErrors).toEqual(null);

    fieldControl.setAsyncValidators([asyncValidator]);

    await Promise.resolve()
      .then()
      .catch()
      .finally(() => {
        expect(fieldControl.valid).toBe(false);
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

  it("should not trigger async validate when autoAsyncValidate is false", async () => {
    const asyncErrorsChangeCbSpy = jest.fn();
    const validChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl("wrong", { autoAsyncValidate: false, asyncValidators: [asyncValidator] });

    fieldControl.validChange.subscribe(validChangeCbSpy);
    fieldControl.asyncErrorsChange.subscribe(asyncErrorsChangeCbSpy);

    expect(fieldControl.valid).toBe(true);
    expect(fieldControl.asyncErrors).toEqual(null);

    await Promise.resolve()
      .then()
      .catch()
      .finally(() => {
        expect(fieldControl.valid).toBe(true);
        expect(fieldControl.asyncErrors).toEqual(null);
        expect(validChangeCbSpy).not.toHaveBeenCalled();
        expect(asyncErrorsChangeCbSpy).not.toHaveBeenCalled();
      });
  });

  it("should trigger async validate only one time when call setValue continuously", async () => {
    const asyncValidator = (control: AbstractControl<string>) => {
      if (control.value.length > 1) {
        return Promise.resolve({
          asyncError: true,
        });
      } else {
        return Promise.resolve(null);
      }
    };

    const asyncErrorsChangeCbSpy = jest.fn();
    const validChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl("", { asyncValidators: [asyncValidator] });

    fieldControl.validChange.subscribe(validChangeCbSpy);
    fieldControl.asyncErrorsChange.subscribe(asyncErrorsChangeCbSpy);

    fieldControl.setValue("1");
    fieldControl.setValue("12");
    fieldControl.setValue("123");
    fieldControl.setValue("1234");

    expect(fieldControl.valid).toBe(true);
    expect(fieldControl.asyncErrors).toEqual(null);

    await Promise.resolve()
      .then()
      .catch()
      .finally(() => {
        expect(fieldControl.valid).toBe(false);
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
