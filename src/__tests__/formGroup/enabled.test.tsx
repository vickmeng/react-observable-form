import { FieldControl, GroupControl } from "../../rrform";

describe("enabled", () => {
    it("should init enabled correctly ", () => {
        const formGroup = new GroupControl({
            controls: {
                employed: new FieldControl({
                    value: true,
                }),
            },
            disabled: true,
        });

        expect(formGroup.enabled).toBe(false);
        expect(formGroup.disabled).toBe(true);
    });

    it("should trigger enabledChange when call disable or enabled", () => {
        const enabledChangeCb = jest.fn();
        const formGroup = new GroupControl({
            controls: {
                employed: new FieldControl({
                    value: true,
                }),
            },
        });

        formGroup.enabledChange.subscribe(enabledChangeCb);

        expect(enabledChangeCb).not.toHaveBeenCalled();
        formGroup.disable();
        expect(enabledChangeCb).toHaveBeenCalledWith(false);
        expect(enabledChangeCb).toHaveBeenCalledTimes(1);

        formGroup.enable();
        expect(enabledChangeCb).toHaveBeenCalledWith(true);
        expect(enabledChangeCb).toHaveBeenCalledTimes(2);
    });
});
