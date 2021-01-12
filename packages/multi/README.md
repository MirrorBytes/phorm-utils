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
  - [ToC (Table of Contents)](#toc-table-of-contents)
- [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Concept

Allow this library to contain all state management of forms whether they be
single step, or multiple.

## Components

There are four exposed components that can be used as of now:

- [Form][form]
- [Step][step]
- [Field][field]
- [ToC][toc]

`Field` has several underlying components:

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

There's an additional component that is used when giving `Form` a config: `Section`.

## Props

You can pass any props into the exposed components and they'll be passed to the primary element. However, there are a few exceptions:

### Form

`Form` exposes several props which are related to the multi-step control:

- `prev`, this is a function for form control
- `next`, this is a function for form control
- `controlsClass`, custom class passed to the controls container

`Form` also has a `config` prop w/ optional content wrapper:

- `config`, used for generating form (take a look at [examples](#examples))
- `ContentWrap`, svelte component used to wrap sections

`Form` passes two props back as well: `store` and `multi`. These can be accessed using the `let:` directive:

```html
<script lang="ts">
  import { Form } from 'svelte-multi';
</script>

<Form let:store let:multi>
...
</Form>
```

`store` can be passed into `Form` if there's a separate implentation of `IndexableJsonValue` you'd prefer:

```html
<script lang="ts">
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import { Form } from 'svelte-multi';
  import type { IndexableJsonValue } from 'svelte-multi';

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
  import { Form } from 'svelte-multi';
  import type { SubmitType } from 'svelte-multi';

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
  import { Form } from 'svelte-multi';

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
  import { Form } from 'svelte-multi';

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
  import { Form } from 'svelte-multi';
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
  wrapperClasses?: string;

  /** Classes used by item text */
  textClasses?: string;
};
```

That's a bit much, but it's fairly straight forward.
- `FieldType` are the types that are allowed without adverse effects.
- `LabelProps` are the props passed to the optional label.
- `Path` is used with the `store` to access nested values:

```html
<script lang="ts">
  import { writable } from 'svelte/store';
  import { Form, Field, FieldType } from 'svelte-multi';

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
  import { Form, Field, FieldType } from 'svelte-multi';
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

### ToC (Table of Contents)

This is a generic ToC that uses the form name, steps, and sections (generated by config).
There are several exposed props:

- `formName`
- `stepsWithSections`, of type `Step[]`
- `stepsWithoutSections`, of type `Writable<IndexableJsonValue>`, this would be `multi` returned from `Form`
- `sections`, of type `Section[]`
- `stepClass`
- `sectionsWrapperClass`
- `sectionsClass`

The class props will be passed like this:

```html
<h1>{formName}</h1>

<ul {...$$restProps}>
  ...

  {#each steps as step}
    <li class={stepClass}>
      ...

      <ul class={sectionsWrapperClass}> <!-- Used only when passing generated sections -->
        ...

        {#each step.sections as section}
          <li class={sectionsClass}>
            ...
          </li>
        {/each}

        ...
      </ul>

      ...
    </li>
  {/each}

  ...
</ul>
```

## Examples

- [Manual][ex_manual]
- [Config][ex_config]




[form]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/wrappers/Form.svelte
[step]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/wrappers/Step.svelte
[field]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/wrappers/Field.svelte
[toc]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/organization/ToC.svelte
[types]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/types.ts#L17
[checkbox]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Checkbox.svelte
[input]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Input.svelte
[radio]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Radio.svelte
[select]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Select.svelte
[textarea]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Textarea.svelte

[ex_manual]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/examples/manual
[ex_config]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/examples/config
