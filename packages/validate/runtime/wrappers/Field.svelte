<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';

  import type { IndexableJsonValue, FieldProps } from '@phorm-utils/common';

  import { Field } from '@phorm-utils/multi';

  export let store: Writable<IndexableJsonValue>;
  export let errors: Writable<Record<string, string[]>>;
  export let validate: () => boolean;
  export let field: FieldProps;
  export let wrapperClass: string | undefined = undefined;
  export let errorClass: string | undefined = undefined;

  const dispatch = createEventDispatcher();

  let locErrors: string[] = [];

  errors.subscribe((v) => {
    locErrors = v[field.name] || [];
  });
</script>

<div class={wrapperClass}>
  <Field
    {store}
    {field}
    {...$$restProps}
    on:input={(e) => {
      validate();

      dispatch('input', e.detail);
    }}
    on:change={(e) => {
      validate();

      dispatch('change', e.detail);
    }}
    on:keydown={(e) => {
      validate();

      dispatch('keydown', e.detail);
    }}
    on:blur={(e) => {
      validate();

      dispatch('blur', e.detail);
    }}
  />

  <div class={errorClass}>
    {#each locErrors as error}
      <p>{error}</p>
    {/each}
  </div>
</div>
