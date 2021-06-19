import { ReactElement } from "react";

import { AbstractControl } from "../controls/abstractControl";
import { FieldControl } from "../controls/fieldControl";
import { GroupControl } from "../controls/groupControl";

import { Controls, Errors } from "./control";

export interface IItemBasicProps<P> {
  children: (props: P) => ReactElement;
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
  dirty: boolean;
  pristine: boolean;
}

export type FieldWithNameProps<V = any> = ItemWithNameProps<FieldInternalProps<V>>;
export type FieldWithControlProps<V = any> = ItemWithControlProps<FieldInternalProps<V>, FieldControl<V>>;

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
  value: Record<string, any>;
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

/**
 * start
 * Error
 */
// TODO get type from Control
export interface ErrorInternalProps {
  name?: string;
  errors: Errors | null;
  dirty: AbstractControl["dirty"];
}
export type ErrorWithNameProps = ItemWithNameProps<ErrorInternalProps>;
export type ErrorWithControlProps = ItemWithControlProps<ErrorInternalProps, AbstractControl>;

export type ErrorProps = ErrorWithNameProps | ErrorWithControlProps;
