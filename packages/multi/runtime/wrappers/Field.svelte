<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';

  import { FieldType } from '../types';
  import type { JsonPrim, IndexableJsonValue, FieldProps } from '../types';
  import { selectPath } from '../internal';

  import Input from '../controls/Input.svelte';
  import Textarea from '../controls/Textarea.svelte';
  import Select from '../controls/Select.svelte';
  import Radio from '../controls/Radio.svelte';
  import Checkbox from '../controls/Checkbox.svelte';

  export let store: Writable<IndexableJsonValue>;
  export let field: FieldProps;
  export let initial: JsonPrim = undefined;

  const dispatch = createEventDispatcher();

  $: id = field.id;
  $: name = field.name;
  $: type = field.type;
  $: disabled = field.disabled;
  $: readonly = field.readonly;
  $: required = field.required;

  $: placeholder = field.placeholder;
  $: autocomplete = field.autocomplete;
  $: step = field.step;
  $: min = field.min;
  $: max = field.max;
  $: multiple = field.multiple;
  $: rows = field.rows;
  $: cols = field.cols;
  $: pattern = field.pattern;
  $: accept = field.accept;

  $: label = field.label;
  $: classes = field.classes;

  $: path = field.path;
  $: items = field.items;

  $: typeInput =
    type === FieldType.Text ||
    type === FieldType.Password ||
    type === FieldType.Email ||
    type === FieldType.Search ||
    type === FieldType.Number ||
    type === FieldType.Tel ||
    type === FieldType.Range ||
    type === FieldType.File ||
    type === FieldType.Date ||
    type === FieldType.DatetimeLocal;

  const onInput = (e: Event) => dispatch('input', e);
  const onBlur = (e: Event) => dispatch('blur', e);

  $: store.update((v) => {
    const selected = selectPath(v, path);

    if (selected) {
      if (!Array.isArray(selected)) {
        if (type === FieldType.Checkbox) {
          selected[name] = Array.isArray(initial) ? initial : [];
        } else {
          selected[name] = initial && !Array.isArray(initial) ? initial : '';
        }
      }

      return v;
    }

    if (type === FieldType.Checkbox) {
      v[name] = Array.isArray(initial) ? initial : [];
    } else {
      v[name] = initial && !Array.isArray(initial) ? initial : '';
    }

    return v;
  });
</script>

{#if typeInput}
  <Input
    on:input={onInput}
    on:keydown={(e) => dispatch('keydown', e.detail)}
    {store}
    {id}
    {name}
    {type}
    {placeholder}
    {disabled}
    {readonly}
    {required}
    {autocomplete}
    {step}
    {min}
    {max}
    {pattern}
    {accept}
    {label}
    {classes}
    {path}
    {...$$restProps} />
{:else if type === FieldType.Textarea}
  <Textarea
    on:input={onInput}
    {store}
    {id}
    {name}
    {placeholder}
    {disabled}
    {readonly}
    {required}
    {autocomplete}
    {rows}
    {cols}
    {label}
    {classes}
    {path}
    {...$$restProps} />
{:else if type === FieldType.Select}
  <Select
    on:blur={onBlur}
    {store}
    {id}
    {name}
    {type}
    {disabled}
    {readonly}
    {required}
    {autocomplete}
    {multiple}
    {label}
    {classes}
    {path}
    {...$$restProps}>
    <slot />
  </Select>
{:else if type === FieldType.Radio}
  <Radio on:input={onInput} {store} {name} {items} {path} {label} {classes} />
{:else if type === FieldType.Checkbox}
  <Checkbox
    on:input={onInput}
    {store}
    {name}
    {items}
    {path}
    {label}
    {classes}
    {...$$restProps} />
{/if}
