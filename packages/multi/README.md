<div align="center">
  <img src="https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/Logo.png" />
</div>

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Concept](#concept)
- [Components](#components)
- [Props](#props)
  - [Form](#form)
  - [Step](#step)
  - [Field](#field)
- [Example](#example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Concept

Allow this library to contain all state management of forms whether they be
single step, or multiple.

## Components

There are three exposed components that can be used as of now:

- [Form][form]
- [Step][step]
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

### Form

`Form` exposes several props which are related to the multi-step control:

- `prev`, this is a function for form control
- `next`, this is a function for form control
- `controls_class`, custom class passed to the controls container

`Form` sets two contexts as well: `store` and `multi`. These can be accessed:

```typescript
import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';
import { STORE, MULTI, IndexableJsonValue } from '@phorm-utils/multi';

const store: Writable<IndexableJsonValue> = getContext(STORE);
const multi: Writable<IndexableJsonValue> = getContext(MULTI);
```

`store` can be passed into `Form` if there's a separate implentation of `IndexableJsonValue` you'd prefer (this will be saved to the context):

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

`Form` also controls a few built-in function directives with returned `CustomEvent`s:

- `on:submit`, with preventDefault, to pass the store back to you (**THIS DOES PREVENT ACTION FROM BEING USED**):

```html
<script lang="ts">
  import { Form } from '@phorm-utils/multi';
  import type { SubmitType } from '@phorm-utils/multi';

  const onSubmit = (ev: CustomEvent<SubmitType>) => {
    const {
      e,      // Original submit event
      store,  // Will either be form control store, or one you declared
    } = ev.detail;

    console.log(e, store);
  };
</script>

<Form on:submit={onSubmit}>
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

<Form on:contextmenu={onContextMenu}>
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

<Form on:click={onClick}>
...
</Form>
```

Finally, `Form` has a few named slots that can be used as controls, `prev`, `next`, and `submit`:

```html
<script lang="ts">
  import { Form } from '@phorm-utils/multi';
</script>

<Form let:prev let:next>
...

  <button slot="prev" on:click|preventDefault={prev}>Prev</button>
  <button slot="next" on:click|preventDefault={next}>Next</button>
  <input slot="submit" type="submit" placeholder="Submit" />
</Form>
```

### Step

`Step` is technically just a wrapper, and exposes only a single prop:

- `name`, which is used as the overall header/label for the step.

### Field

`Field` is a bit more complex as it takes `field` (which are the field props) and `initial`.

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
    field={{ id: '1', name: '1', type: FieldType.Text, path: ['test', 'testing', 0, 'value'] }} />
</Form>
```

This allows for the value in store to be updated properly in the nest.

- `Item` is used with radio and checkbox as these are group fields:

```html
<script lang="ts">
  import { Form, Field, FieldType } from '@phorm-utils/multi';
</script>

<Form>
  <Field
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

## Example

- `us_states.ts`:

```typescript
export default [
  "AK",
  "AL",
  "AR",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "WA",
  "WI",
  "WV",
  "WY"
];
```

- `Header.svelte`:

```html
<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { IndexableJsonValue, MULTI } from '@phorm-utils/multi';

  const multi: Writable<IndexableJsonValue> = getContext(MULTI);
</script>

<header>
  {#each Object.keys($multi) as step}
    <div class:active={$multi[step]}>{step}</div>
  {/each}
</header>
```

- `App.svelte`:

```html
<script lang="ts">
  import { Form, Step, Field, FieldType } from '@phorm-utils/multi';

  import states from "./us_states";

  import Header from './Header.svelte';

  const onSubmit = (ev: CustomEvent<SubmitType>) => {
    const { e, store } = ev.detail;

    console.log(e, store);
  };
</script>

<Form let:prev let:next on:submit={onSubmit}>
  <Header />

  <Step name="Customer Info">
    <Field field={{ id: 'first_name', name: 'first_name', type: FieldType.Text, placeholder: 'First Name' }} />
    <Field field={{ id: 'last_name', name: 'last_name', type: FieldType.Text, placeholder: 'Last Name' }} />
    <Field field={{ id: 'phone', name: 'phone', type: FieldType.Tel, placeholder: 'Phone' }} />
    <Field field={{ id: 'email', name: 'email', type: FieldType.Email, placeholder: 'Email' }} />
  </Step>

  <Step name="Billing Info">
    <Field field={{ id: 'bill_addr', name: 'bill_addr', type: FieldType.Text, placeholder: 'Address' }} />
    <Field field={{ id: 'bill_addr2', name: 'bill_addr2', type: FieldType.Text, placeholder: 'Address 2' }} />
    <Field field={{ id: 'bill_city', name: 'bill_city', type: FieldType.Text, placeholder: 'City' }} />
    <Field field={{ id: 'bill_st', name: 'bill_st', type: FieldType.Select }}>
      <option>State</option>

      {#each states as state}
        <option value={state}>{state}</option>
      {/each}
    </Field>
    <Field field={{ id: 'bill_zip', name: 'bill_zip', type: FieldType.Number, placeholder: 'Zip Code' }} />
  </Step>

  <Step name="Shipping Info">
    <Field field={{ id: 'ship_addr', name: 'ship_addr', type: FieldType.Text, placeholder: 'Address' }} />
    <Field field={{ id: 'ship_addr2', name: 'ship_addr2', type: FieldType.Text, placeholder: 'Address 2' }} />
    <Field field={{ id: 'ship_city', name: 'ship_city', type: FieldType.Text, placeholder: 'City' }} />
    <Field field={{ id: 'ship_st', name: 'ship_st', type: FieldType.Select }}>
      <option>State</option>

      {#each states as state}
        <option value={state}>{state}</option>
      {/each}
    </Field>
    <Field field={{ id: 'ship_zip', name: 'ship_zip', type: FieldType.Number, placeholder: 'Zip Code' }} />
  </Step>

  <Step name="Payment Info">
    <Field field={{ id: 'card', name: 'card', type: FieldType.Number, placeholder: 'Card Number' }} />
    <Field field={{ id: 'month', name: 'month', type: FieldType.Number, placeholder: 'Month' }} />
    <Field field={{ id: 'year', name: 'year', type: FieldType.Number, placeholder: 'Year' }} />
    <Field field={{ id: 'cvv', name: 'cvv', type: FieldType.Number, placeholder: 'CVV' }} />
    <Field field={{ id: 'card_zip', name: 'card_zip', type: FieldType.Number, placeholder: 'Zip Code' }} />
  </Step>

  <button slot="prev" on:click|preventDefault={prev}>Prev</button>
  <button slot="next" on:click|preventDefault={next}>Next</button>
  <input slot="submit" type="submit" placeholder="Submit" />
</Form>
```




[form]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/Form.svelte
[step]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/Step.svelte
[field]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/Field.svelte
[types]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/types.ts#L17
[checkbox]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Checkbox.svelte
[input]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Input.svelte
[radio]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Radio.svelte
[select]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Select.svelte
[textarea]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Textarea.svelte
