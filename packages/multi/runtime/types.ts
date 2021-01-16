import type { Writable } from 'svelte/store';

export type Maybe<T> = T | null;

export type JsonPrim =
  | string
  | number
  | boolean
  | JsonPrim[]
  | null
  | undefined;

export type IndexableJsonValue = {
  [K in string | number]: JsonPrim | IndexableJsonValue | IndexableJsonValue[];
};

export enum FieldType {
  Text = 'text',
  Password = 'password',
  Email = 'email',
  Search = 'search',
  Number = 'number',
  Textarea = 'textarea',
  Date = 'date',
  DatetimeLocal = 'datetime-local',
  Tel = 'tel',
  Range = 'range',
  File = 'file',
  Checkbox = 'checkbox',
  Select = 'select',
  Radio = 'radio',
}

/** Label props for fields */
export type LabelProps = {
  /** Printed text of label */
  text: string;

  /** Optional prop for label */
  classes?: Maybe<string>;
};

/** Array of strings and numbers that allow access to deep nested values in form stores. */
export type Path = Array<string | number>;

/** Item props for radio/checkbox */
export type Item = {
  /** Unique ID of item */
  id: string;

  /** Internal value of item */
  value: string;

  /** Printed text of item */
  text: string;

  /** Classes used by item wrapper */
  wrapperClasses?: Maybe<string>;

  /** Classes used by item text */
  textClasses?: Maybe<string>;
};

/** Generic form field props */
export type FieldProps = {
  id: string;
  name: string;
  /**
   * Text, password, email, search, number, select, radio,
   * checkbox, textarea, file, date, datetime-local, tel, or range
   */
  type: FieldType;
  disabled?: Maybe<boolean>;
  readonly?: Maybe<boolean>;

  /**
   * Self explanatory.
   *
   * TODO: Implement for checkbox.
   * ------- With trigger option (function).
   */
  required?: Maybe<boolean>;

  /** For text, password, email, search, tel, textarea, or number fields */
  placeholder?: Maybe<string>;
  /** For text, password, email, search, tel, select, or textarea fields */
  autocomplete?: Maybe<boolean>;
  /** For number, range, date, and datetime-local fields */
  step?: Maybe<number>;
  /** For number, range, date, and datetime-local fields */
  min?: Maybe<number>;
  /** For number, range, date, and datetime-local fields */
  max?: Maybe<number>;
  /** For select and file fields */
  multiple?: Maybe<boolean>;
  /** For textarea fields */
  rows?: Maybe<number>;
  /** For textarea fields */
  cols?: Maybe<number>;
  /** For tel fields */
  pattern?: Maybe<string>;
  /** For file fields */
  accept?: Maybe<string>;

  /** Optional prop for any field */
  label?: Maybe<LabelProps>;
  /** Optional prop for any field */
  classes?: string;

  /** Optional path for nested values in store */
  path?: Maybe<Path>;
  /** For radio, select, and checkbox fields */
  items?: Maybe<Item[]>;
};

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
