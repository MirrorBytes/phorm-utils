import type { Writable } from 'svelte/store';

import type {
  Maybe,
  JsonPrim,
  IndexableJsonValue,
  Item as CommonItem,
  LabelProps as CommonLabelProps,
  FieldProps as CommonFieldProps,
} from '@phorm-utils/common';

/** Array of strings and numbers that allow access to deep nested values in form stores. */
export type Path = Array<string | number>;

export interface LabelProps extends CommonLabelProps {
  /** Optional prop for label */
  classes?: Maybe<string>;
}

export interface Item extends CommonItem {
  /** Classes used by item wrapper */
  wrapperClasses?: Maybe<string>;

  /** Classes used by item text */
  textClasses?: Maybe<string>;
}

export interface FieldProps extends CommonFieldProps {
  /** Optional prop for any field */
  label?: Maybe<LabelProps>;
  /** Optional prop for any field */
  classes?: string;

  /** Optional path for nested values in store */
  path?: Maybe<Path>;
  /** For radio, select, and checkbox fields */
  items?: Maybe<Item[]>;
}

export type FieldConfig = {
  props: FieldProps;
  initial?: Maybe<JsonPrim>;
  selectOptions?: Maybe<string[]>;
  classes?: Maybe<string>;
};

export type Line = {
  fields: FieldConfig[];
  classes?: Maybe<string>;
};

export type Section = {
  heading?: Maybe<string>;
  lines: Line[];
  classes?: Maybe<string>;
};

export type Step = {
  heading: string;
  sections: Section[];
};

export type FormConfig = {
  /** Form Name */
  heading: string;
  /** Form Contents */
  contents: Step[] | Section[];
};

/** Return type of forms */
export type SubmitType = {
  e: Event;

  store: Writable<IndexableJsonValue>;
};
