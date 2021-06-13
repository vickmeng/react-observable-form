import { act } from "react-dom/test-utils";

import { FieldControl } from "../../rrform";

describe("destroy", () => {
    it("should unsubscribe status change and value change formControl destroy called", async () => {
        const valueChangeCb = jest.fn();

        const formControl = new FieldControl({ value: false, disabled: false });

        formControl.valueChange.subscribe(valueChangeCb);

        act(() => {
            formControl.setValue(true);
        });

        expect(valueChangeCb).toBeCalledTimes(1);
        expect(valueChangeCb).toBeCalledWith(true);

        formControl.destroy();

        formControl.setValue(false);
        expect(valueChangeCb).toBeCalledTimes(1);
    });
});
