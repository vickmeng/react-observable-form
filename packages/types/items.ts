import { ReactElement } from "react";

import { AbstractControl } from "../controls/abstractControl";
import { FieldControl } from "../controls/fieldControl";
import { GroupControl } from "../controls/groupControl";
import { ListControl } from "../controls/listControl";

import { GroupChildControls, Errors, ListChildControls, Valid } from "./control";

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
  control: FieldControl;
  value: V;
  setValue: FieldControl<V>["setValue"];
  markAsDirty: FieldControl<V>["markAsDirty"];
  markAsPristine: FieldControl<V>["markAsPristine"];
  validateAndUpdateErrors: FieldControl<V>["validateAndUpdateErrors"];
  asyncValidateAndUpdateErrors: FieldControl<V>["asyncValidateAndUpdateErrors"];
  disabled: boolean;
  errors: Errors | null;
  asyncErrors?: Errors | null;
  valid: Valid;
  dirty: boolean;
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
  disabled: boolean;
  control: GroupControl;
  childControls: GroupChildControls;
}

export type GroupWithNameProps = ItemWithNameProps<GroupInternalProps>;
export type GroupWithControlProps = ItemWithControlProps<GroupInternalProps, GroupControl>;

export type GroupProps = GroupWithNameProps | GroupWithControlProps;
/**
 * end
 */

/**
 * start
 * List
 */
export interface ListInternalProps {
  name?: string;
  control: ListControl;
  disabled: boolean;
  childControls: ListChildControls;
}

export type ListWithNameProps = ItemWithNameProps<ListInternalProps>;
export type ListWithControlProps = ItemWithControlProps<ListInternalProps, ListControl<any>>;

export type ListProps = ListWithNameProps | ListWithControlProps;
/**
 * end
 */

/**
 * start
 * Error
 */

export interface ErrorInternalProps {
  name?: string;
  errors: Errors | null;
  valid: Valid;
  dirty: boolean;
  disabled: boolean;
  control: AbstractControl<any>;
}
export type ErrorWithNameProps = ItemWithNameProps<ErrorInternalProps>;
export type ErrorWithControlProps = ItemWithControlProps<ErrorInternalProps, AbstractControl>;

export type ErrorProps = ErrorWithNameProps | ErrorWithControlProps;
