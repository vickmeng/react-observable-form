import { Observable } from "rxjs";
import { Controls, IFormGroupParams, IGroupValue } from "../types/control";
import { AbstractControl } from "./abstractControl";
export declare class GroupControl extends AbstractControl<IGroupValue> {
    get controls(): Controls;
    get controlsChange(): Observable<Controls>;
    private _controls;
    private controlsSubject;
    /**
     * @private controlsChangeNotifyLock
     * Prevent frequent triggering of ValueChangeCallback when setting Value
     */
    private controlsChangeNotifyLock;
    private valueChangesSubscription;
    private validChangesSubscription;
    private enabledChangesSubscription;
    constructor({ controls, disabled, validators }: IFormGroupParams);
    get: <T extends AbstractControl<any>>(name: string) => T;
    setValue: (value: IGroupValue) => void;
    addControl: (name: string, control: AbstractControl<any>) => void;
    private initControls;
    private setValueToControls;
    /**
     * has group level error or has invalid control
     */
    protected checkValid: () => boolean;
    private updatePrivateControlsAndResetValue;
    private updatePrivateControls;
    private getGroupValueFromControls;
    private reSubscribeControls;
    private reSubscribeControlValueChanges;
    private reSubscribeControlValidChanges;
    private reSubscribeControlEnabledChanges;
}
