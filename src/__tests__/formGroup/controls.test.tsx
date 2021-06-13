import { FieldControl, GroupControl } from "../../rrform";

describe("group controls", () => {
    it("addControl", () => {
        const employedControl = new FieldControl({
            value: true,
        });

        const formGroup = new GroupControl({
            controls: {
                employed: employedControl,
            },
        });

        const controlsChangeCb = jest.fn();
        const valueChangeCb = jest.fn();

        formGroup.controlsChange.subscribe(controlsChangeCb);
        formGroup.valueChange.subscribe(valueChangeCb);

        const marriedControl = new FieldControl({
            value: true,
        });

        formGroup.addControl("married", marriedControl);

        expect(controlsChangeCb).toHaveBeenCalledTimes(1);

        expect(controlsChangeCb).toHaveBeenCalledWith({
            employed: employedControl,
            married: marriedControl,
        });

        expect(formGroup.controls).toEqual({
            employed: employedControl,
            married: marriedControl,
        });

        expect(valueChangeCb).toHaveBeenCalledTimes(1);
        expect(valueChangeCb).toHaveBeenCalledWith({
            employed: true,
            married: true,
        });
        expect(formGroup.value).toEqual({
            employed: true,
            married: true,
        });
    });
});
