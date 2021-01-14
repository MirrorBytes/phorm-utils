<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';

  import type {
    Maybe,
    JsonPrim,
    IndexableJsonValue,
    Path,
    LabelProps,
    Item,
  } from '../types';
  import { selectPath } from '../internal';

  export let store: Writable<IndexableJsonValue>;
  export let path: Maybe<Path> = [];
  export let name: string;
  export let items: Maybe<Item[]> | undefined;
  export let label: Maybe<LabelProps> | undefined = undefined;
  export let classes = '';

  const dispatch = createEventDispatcher();

  const checkItem = (val: string) => {
    const selected = selectPath($store, path);

    if (!Array.isArray(selected)) {
      if (selected) {
        return (selected[name] as string[])?.includes(val);
      }

      return ($store[name] as string[])?.includes(val);
    }

    return false;
  };

  const onInput = (e: Event) => {
    const checked = e.target as HTMLInputElement;

    store.update((v) => {
      const selected = selectPath(v, path);

      if (!Array.isArray(selected)) {
        const re =
          (selected
            ? (selected[name] as Array<JsonPrim>)
            : (v[name] as Array<JsonPrim>)) || [];

        if (checked.checked) {
          if (selected) {
            selected[name] = [...re, checked.value];
          } else {
            v[name] = [...re, checked.value];
          }
        } else {
          let idx = re.indexOf(checked.value);

          while (idx !== -1) {
            re.splice(idx, 1);

            idx = re.indexOf(checked.value);
          }
        }
      }

      return v;
    });

    dispatch('input', e);
  };
</script>

{#if label}
  <div class={label.classes || undefined}>{label.text}</div>
{/if}

{#if items && items.length}
  {#each items as item}
    <div class={item.wrapperClasses || undefined}>
      <input
        on:input={onInput}
        type="checkbox"
        id={item.id}
        {name}
        class={classes}
        value={item.value}
        checked={checkItem(item.value)}
        {...$$restProps}
      />

      <label class={item.textClasses || undefined} for={item.id}
        >{item.text}</label
      >
    </div>
  {/each}
{:else}
  <div>No checkbox items yet</div>
{/if}
