import { Errors, Validator } from "../types/control";
import { FieldAsChildAttributes, FieldAttributes, GroupAsChildAttributes, GroupAttributes } from "../types/item";
export declare const isFieldAsChildAttributes: (props: FieldAttributes) => props is FieldAsChildAttributes;
export declare const isGroupAsChildAttributes: (props: GroupAttributes) => props is GroupAsChildAttributes;
export declare const getErrorsBy: (value: any, validators: Validator[]) => Errors | null;
