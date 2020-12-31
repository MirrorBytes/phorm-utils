<div align="center">
  <img src="https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/Logo.png" />
</div>

## Concept

Allow this library to contain all state management of forms whether they be
single step, or multiple.

## Components

There are two exposed components that can be used as of now:

- Form
- Field

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

<!-- prettier-ignore -->
[form]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/Form.svelte

<!-- prettier-ignore -->
[field]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/Field.svelte

<!-- prettier-ignore -->
[types]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/types.ts#L17

<!-- prettier-ignore -->
[checkbox]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Checkbox.svelte

<!-- prettier-ignore -->
[input]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Input.svelte

<!-- prettier-ignore -->
[radio]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Radio.svelte

<!-- prettier-ignore -->
[select]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Select.svelte

<!-- prettier-ignore -->
[textarea]: https://github.com/MirrorBytes/phorm-utils/blob/main/packages/multi/runtime/controls/Textarea.svelte
