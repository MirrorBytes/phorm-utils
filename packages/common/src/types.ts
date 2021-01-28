export type Maybe<T> = T | null;

export type JsonPrim =
  | string
  | number
  | boolean
  | JsonPrim[]
  | null
  | undefined;

export type IndexableJsonValue = {
  [K in string | number]: IndexableJsonValue | IndexableJsonValue[] | JsonPrim;
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
export interface LabelProps {
  /** Printed text of label */
  text: string;
}

/** Item props for radio/checkbox */
export interface Item {
  /** Unique ID of item */
  id: string;

  /** Internal value of item */
  value: string;

  /** Printed text of item */
  text: string;
}

export interface FieldProps {
  id: string;
  name: string;
  type: FieldType;
  disabled?: Maybe<boolean>;
  readonly?: Maybe<boolean>;

  /** Self explanatory. */
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

  /** For radio, select, and checkbox fields */
  items?: Maybe<Item[]>;
}

export interface FieldConfig {
  props: FieldProps;

  width?: Maybe<number>;
}

export interface Line {
  fields: FieldConfig[];
}

export interface Section {
  heading: string;
  lines: Line[];

  row?: Maybe<number>;
  width?: Maybe<number>;
}
