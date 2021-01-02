<div align="center">
  <img src="https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/Logo.png" />
</div>

## Concept

Allow this library to contain all state management of forms whether they be
single step, or multiple.

## Components

There are two exposed components that can be used as of now:

- [Form][form]
- [Field][field]

Field has several underlying components:

- [Checkbox][checkbox]
  - This contains checkbox groups
- [Input][input]
  - This contains [input field types][types]:
    - Text
    - Password
    - Email
    - Search
    - Number
    - Tel
    - Range
    - File
    - Date
    - Datetime Local
- [Radio][radio]
- [Select][select]
- [Textarea][textarea]

## Props

You can pass any props into the exposed components and they'll be passed to the primary element. However, there are a few exceptions:

- ### Form

`Form` exposes a single prop which is controlled by the component: `store`.

You can either allow `Form` to control it completely, and use the `let:` directive to pass the store back:

```html
<script lang="ts">
  import { Form } from '@phorm-utils/multi';
</script>

<Form let:store>
...
</Form>
```

Or, you can created your own `IndexableJsonValue` store that you control:

```html
<script lang="ts">
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import { Form } from '@phorm-utils/multi';
  import type { IndexableJsonValue } from '@phorm-utils/multi';

  const store: Writable<IndexableJsonValue> = writable({});
</script>

<Form {store}>
...
</Form>
```

`Form` also controls a few function directives with returned `CustomEvent`s:

- `on:submit`, with preventDefault, to pass the store back to you (**THIS DOES PREVENT ACTION FROM BEING USED**):

```html
<script lang="ts">
  import { Form } from '@phorm-utils/multi';
  import type { SubmitType } from '@phorm-utils/multi';

  const onSubmit = (ev: CustomEvent<SubmitType>) => {
    const {
      e,      // Original submit event
      store,  // Will either be form controll store, or one you declared
    } = ev.detail;

    console.log(e, store);
  };
</script>

<Form let:store on:submit={onSubmit}>
...
</Form>
```

- `on:contextmenu`:

```html
<script lang="ts">
  import { Form } from '@phorm-utils/multi';

  const onContextMenu = (ev: CustomEvent) => {
    const {
      e,      // Original submit event
    } = ev.detail;

    console.log(e);
  };
</script>

<Form let:store on:contextmenu={onContextMenu}>
...
</Form>
```

- `on:click`:

```html
<script lang="ts">
  import { Form } from '@phorm-utils/multi';

  const onClick = (ev: CustomEvent) => {
    const {
      e,      // Original submit event
    } = ev.detail;

    console.log(e);
  };
</script>

<Form let:store on:click={onClick}>
...
</Form>
```

- ### Field

`Field` is a bit more complex as it takes `store`, `field` (which are the field props), and `initial`.

- `store`, this is the form controlled or store you created (**THE BELOW CODE WILL ERROR, FIELD PROP IS REQUIRED**):

```html
<script lang="ts">
  import { Form, Field } from '@phorm-utils/multi';
</script>

<Form let:store>
  <Field {store} />
</Form>
```

- `field` consists of the following information:

```typescript
type FieldProps = {
  id: string;
  name: string;
  type: FieldType;
  disabled?: Maybe<boolean>;
  readonly?: Maybe<boolean>;

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
  /** For radio and checkbox fields */
  items?: Maybe<Item[]>;
};
```

The only required props are `id`, `name`, and `type`.

You'll notice a few other types in here, which consist of `FieldType`, `LabelProps`, `Path`, and `Item`; here they are:

- `FieldType`

```typescript
enum FieldType {
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
```

- `LabelProps`

```typescript
type LabelProps = {
  /** Printed text of label */
  text: string;

  /** Optional prop for label */
  classes?: string;
};
```

- `Path`

```typescript
/** Array of strings and numbers that allow access to deep nested values in form stores. */
type Path = Array<string | number>;
```

- `Item`

```typescript
type Item = {
  /** Unique ID of item */
  id: string;

  /** Internal value of item */
  value: string;

  /** Printed text of item */
  text: string;

  /** Classes used by item wrapper */
  wrapper_classes?: string;

  /** Classes used by item text */
  text_classes?: string;
};
```

That's a bit much, but it's fairly straight forward.
- `FieldType` are the types that are allowed without adverse effects.
- `LabelProps` are the props passed to the optional label.
- `Path` is used with the `store` to access nested values:

```html
<script lang="ts">
  import { writable } from 'svelte/store';
  import { Form, Field, FieldType } from '@phorm-utils/multi';

  const store = writable({
    test: {
      testing: [
        {
          value: '',
        },
      ],
    },
  });
</script>

<Form {store}>
  <Field
    {store}
    field={{ id: '1', name: '1', type: FieldType.Text, path: ['test', 'testing', 0, 'value'] }} />
</Form>
```

This allows for the value in store to be updated properly in the nest.

- `Item` is used with radio and checkbox as these are group fields:

```html
<script lang="ts">
  import { Form, Field, FieldType } from '@phorm-utils/multi';
</script>

<Form let:store>
  <Field
    {store}
    field={{
      id: '1',
      name: '1',
      type: FieldType.Radio,
      items: [
        { id: 'item1', value: 'item1', text: 'item1' },
        { id: 'item2', value: 'item2', text: 'item2' }
      ],
    }} />
</Form>
```

Note that radio will return a string value, and checkbox will return an array of string values.




[form]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/Form.svelte
[field]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/Field.svelte
[types]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/types.ts#L17
[checkbox]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Checkbox.svelte
[input]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Input.svelte
[radio]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Radio.svelte
[select]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Select.svelte
[textarea]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Textarea.svelte
