import { ReactElement } from "react";
import { FieldControl, GroupControl } from "../index";
import { AbstractControl } from "../control/abstractControl";
import { Controls, Errors } from "./control";
export interface IItemBasicAttributes<T> {
    children: (props: T) => ReactElement;
}
export interface IItemAsChildAttributes<T> extends IItemBasicAttributes<T> {
    name: string;
}
export interface IItemWithControlAttributes<T, U extends AbstractControl<any>> extends IItemBasicAttributes<T> {
    control: U;
}
/**
 * start
 * Field
 */
export interface IFieldProps {
    name?: string;
    value: any;
    setValue(value: any): void;
    enabled: boolean;
    disabled: boolean;
    errors: Errors | null;
    valid: boolean;
    invalid: boolean;
}
export declare type FieldAsChildAttributes = IItemAsChildAttributes<IFieldProps>;
export declare type FieldWithControlAttributes = IItemWithControlAttributes<IFieldProps, FieldControl>;
export declare type FieldAttributes = FieldAsChildAttributes | FieldWithControlAttributes;
/**
 * end
 */
/**
 * start
 * Group
 */
export interface IGroupProps {
    name?: string;
    group: GroupControl;
    enabled: boolean;
    disabled: boolean;
    errors: Errors | null;
    valid: boolean;
    invalid: boolean;
    controls: Controls;
}
export declare type GroupAsChildAttributes = IItemAsChildAttributes<IGroupProps>;
export declare type GroupWithControlAttributes = IItemWithControlAttributes<IGroupProps, GroupControl>;
export declare type GroupAttributes = GroupAsChildAttributes | GroupWithControlAttributes;
/**
 * end
 */
