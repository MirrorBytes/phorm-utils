<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';

  import type {
    Maybe,
    IndexableJsonValue,
    Path,
    LabelProps,
    Item,
  } from '../types';
  import { selectPath } from '../internal';

  export let store: Writable<IndexableJsonValue>;
  export let path: Maybe<Path> = [];
  export let id: string;
  export let name: string;
  export let items: Maybe<Item[]>;
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

  const onBlur = (e: FocusEvent) => {
    const select = e.target as HTMLSelectElement;

    store.update((v) => {
      const selected = selectPath(v, path);

      if (selected) {
        if (!Array.isArray(selected)) {
          selected[name] = select.value;
        }
      } else {
        v[name] = select.value;
      }

      return v;
    });

    dispatch('blur', e);
  };
</script>

{#if label}
  <label for={id} class={label.classes || undefined}>{label.text}</label>
{/if}

<select
  bind:value
  on:blur={onBlur}
  {id}
  {name}
  class={classes}
  {...$$restProps}>
  {#if items && items.length}
    {#each items as item}
      <option value={item.value}>{item.text}</option>
    {/each}
  {:else}
    <option>No checkbox items yet</option>
  {/if}
</select>
