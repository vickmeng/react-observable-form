import { ReactElement } from "react";

import { FieldControl, GroupControl } from "../index";
import { AbstractControl } from "../controls/abstractControl";

import { Controls, Errors } from "./control";

export interface IItemBasicAttributes<T> {
  children: (props: T) => ReactElement;
}

export interface ItemWithNameProps<T> extends IItemBasicAttributes<T> {
  name: string;
}

export interface ItemWithControlProps<T, U extends AbstractControl<any>> extends IItemBasicAttributes<T> {
  control: U;
}

/**
 * start
 * Field
 */

export interface FieldInternalProps {
  name?: string;
  value: any;
  setValue(value: any): void;
  enabled: boolean;
  disabled: boolean;
  errors: Errors | null;
  valid: boolean;
  invalid: boolean;
}

export type FieldWithNameProps = ItemWithNameProps<FieldInternalProps>;
export type FieldWithControlProps = ItemWithControlProps<FieldInternalProps, FieldControl>;

export type FieldProps = FieldWithNameProps | FieldWithControlProps;

/**
 * end
 */

/**
 * start
 * Group
 */
export interface GroupInternalProps {
  name?: string;
  group: GroupControl;
  enabled: boolean;
  disabled: boolean;
  errors: Errors | null;
  valid: boolean;
  invalid: boolean;
  controls: Controls;
}

export type GroupWithNameProps = ItemWithNameProps<GroupInternalProps>;
export type GroupWithControlProps = ItemWithControlProps<GroupInternalProps, GroupControl>;

export type GroupProps = GroupWithNameProps | GroupWithControlProps;
/**
 * end
 */
