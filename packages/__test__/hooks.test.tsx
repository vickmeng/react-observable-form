import { act, renderHook } from "@testing-library/react-hooks";

import { FieldControl } from "../controls/fieldControl";
import { useControlDirty, useControlDisabled, useControlValid, useControlValue } from "../hooks";
import { AbstractControl } from "../controls/abstractControl";
import { requiredValidator } from "../validators";

describe("hooks", () => {
  it("useControlValue", () => {
    let control: undefined | AbstractControl = new FieldControl("Vick");

    const { result, rerender } = renderHook(() => useControlValue(control));

    expect(result.current).toBe("Vick");

    act(() => {
      control!.setValue("Tom");
    });

    expect(result.current).toBe("Tom");

    control = new FieldControl("Bob");
    rerender();

    expect(result.current).toBe("Bob");

    control = undefined;
    rerender();

    expect(result.current).toBe(undefined);
  });

  it("useControlDisabled", () => {
    let control: undefined | AbstractControl = new FieldControl("", { disabled: true });

    const { result, rerender } = renderHook(() => useControlDisabled(control));

    expect(result.current).toBe(true);

    act(() => {
      control!.enable();
    });

    expect(result.current).toBe(false);

    control = new FieldControl("", { disabled: true });
    rerender();

    expect(result.current).toBe(true);

    control = undefined;
    rerender();

    expect(result.current).toBe(undefined);
  });

  it("useControlDirty", () => {
    let control: undefined | AbstractControl = new FieldControl("", { dirty: true });

    const { result, rerender } = renderHook(() => useControlDirty(control));

    expect(result.current).toBe(true);

    act(() => {
      control!.markAsPristine();
    });

    expect(result.current).toBe(false);

    control = new FieldControl("", { dirty: true });
    rerender();

    expect(result.current).toBe(true);

    control = undefined;
    rerender();

    expect(result.current).toBe(undefined);
  });

  it("useControlValid", () => {
    let control: undefined | AbstractControl = new FieldControl("", {});

    const { result, rerender } = renderHook(() => useControlValid(control));

    expect(result.current).toBe(true);

    act(() => {
      control!.setValidators([requiredValidator]);
    });

    expect(result.current).toBe(false);

    control = new FieldControl("", { validators: [] });
    rerender();

    expect(result.current).toBe(true);

    control = undefined;
    rerender();

    expect(result.current).toBe(undefined);
  });
});
