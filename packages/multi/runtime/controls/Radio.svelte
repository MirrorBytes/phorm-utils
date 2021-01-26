<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';

  import type { Maybe, IndexableJsonValue } from '@phorm-utils/common';

  import type { Path, LabelProps, Item } from '../types';
  import { selectPath } from '../internal';

  export let store: Writable<IndexableJsonValue>;
  export let path: Maybe<Path> = [];
  export let name: string;
  export let items: Maybe<Item[]> | undefined;
  export let label: Maybe<LabelProps> | undefined = undefined;
  export let classes = '';

  const dispatch = createEventDispatcher();

  let checked = '';

  store.subscribe((v) => {
    const selected = selectPath(v, path);

    if (selected) {
      if (!Array.isArray(selected)) {
        checked = selected[name] as string;
      }
    } else {
      checked = v[name] as string;
    }
  });

  const onInput = (e: Event) => {
    const check = e.target as HTMLInputElement;

    store.update((v) => {
      const selected = selectPath(v, path);

      if (selected) {
        if (!Array.isArray(selected)) {
          selected[name] = check.value;
        }
      } else {
        v[name] = check.value;
      }

      return v;
    });

    dispatch('input', e);
  };
</script>

{#if label}
  <div class={label.classes || undefined}>{label.text}</div>
{/if}

{#if items}
  {#each items as item, idx}
    <div class={item.wrapperClasses || undefined}>
      <input
        on:input={onInput}
        type="radio"
        id={item.id}
        {name}
        class={classes}
        value={item.value}
        checked={checked !== '' ? checked === item.value : idx === 0}
      />

      <label class={item.textClasses || undefined} for={item.id}
        >{item.text}</label
      >
    </div>
  {/each}
{/if}
