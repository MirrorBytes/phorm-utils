<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';

  import type { Maybe, IndexableJsonValue } from '@phorm-utils/common';

  import type { Path, LabelProps } from '../types';
  import { selectPath } from '../internal';

  export let store: Writable<IndexableJsonValue>;
  export let path: Maybe<Path> = [];
  export let id: string;
  export let name: string;
  export let label: Maybe<LabelProps> | undefined = undefined;
  export let classes = '';

  const dispatch = createEventDispatcher();

  let value: string;

  store.subscribe((v) => {
    const selected = selectPath(v, path);

    if (selected) {
      if (!Array.isArray(selected)) {
        value = selected[name] as string;
      }
    } else {
      value = v[name] as string;
    }
  });

  const onInput = (e: Event) => {
    const input = e.target as HTMLInputElement;

    store.update((v) => {
      const selected = selectPath(v, path);

      if (selected) {
        if (!Array.isArray(selected)) {
          selected[name] = input.value;
        }
      } else {
        v[name] = input.value;
      }

      return v;
    });

    dispatch('input', e);
  };
</script>

{#if label}
  <label for={id} class={label.classes || undefined}>{label.text}</label>
{/if}

<input
  bind:value
  on:input={onInput}
  on:keydown={(e) => dispatch('keydown', e)}
  {id}
  {name}
  class={classes}
  {...$$restProps}
/>
