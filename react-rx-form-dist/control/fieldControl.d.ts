import { IFormControlParams } from "../types/control";
import { AbstractControl } from "./abstractControl";
export declare class FieldControl extends AbstractControl<any> {
    constructor({ value, disabled, validators }: IFormControlParams);
    setValue: (value: any) => void;
    protected checkValid: () => boolean;
}
