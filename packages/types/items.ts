import { FC } from "react";

import { AbstractControl } from "../controls/abstractControl";
import { FieldControl } from "../controls/fieldControl";
import { GroupControl } from "../controls/groupControl";

import { Controls, Errors } from "./control";

export interface IItemBasicProps<P> {
  children: FC<P>;
}

export interface ItemWithNameProps<P> extends IItemBasicProps<P> {
  name: string;
}

export interface ItemWithControlProps<P, C extends AbstractControl<any>> extends IItemBasicProps<P> {
  control: C;
}

/**
 * start
 * Field
 */

export interface FieldInternalProps<V = any> {
  name?: string;
  value: V;
  setValue(value: V): void;
  enabled: boolean;
  disabled: boolean;
  errors: Errors | null;
  valid: boolean;
  invalid: boolean;
}

export type FieldWithNameProps<V> = ItemWithNameProps<FieldInternalProps<V>>;
export type FieldWithControlProps<V> = ItemWithControlProps<FieldInternalProps<V>, FieldControl<V>>;

export type FieldProps<V = any> = FieldWithNameProps<V> | FieldWithControlProps<V>;

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
