<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';

  import type { IndexableJsonValue } from './types';

  export let controls_class: string | undefined = undefined;
  export let store: Writable<IndexableJsonValue> = writable({});

  const multi: Writable<IndexableJsonValue> = writable({});

  let current = 0;

  const dispatch = createEventDispatcher();
  const onSubmit = (e: Event) => dispatch('submit', { e, store });
  const onContextMenu = (e: Event) => dispatch('contextmenu', e);
  const onClick = (e: Event) => dispatch('click', e);

  function prev() {
    if (Object.keys($multi)[current - 1]) {
      multi.update((v) => {
        v[Object.keys(v)[current]] = false;
        v[Object.keys(v)[--current]] = true;

        return v;
      });
    }
  }

  function next() {
    if (Object.keys($multi)[current + 1]) {
      multi.update((v) => {
        v[Object.keys(v)[current]] = false;
        v[Object.keys(v)[++current]] = true;

        return v;
      });
    }
  }

  onMount(() => {
    multi.update((v) => {
      v[Object.keys(v)[current]] = true;

      return v;
    });
  });
</script>

<form
  on:submit|preventDefault={onSubmit}
  on:contextmenu={onContextMenu}
  on:click={onClick}
  {...$$restProps}>
  <slot {store} {multi} {prev} {next} />

  <div class={controls_class ? controls_class : ''}>
    {#if Object.keys($multi)[current - 1]}
      <slot name="prev" />
    {/if}

    {#if Object.keys($multi)[current + 1]}
      <slot name="next" />
    {/if}

    {#if !Object.keys($multi)[current + 1]}
      <slot name="submit" />
    {/if}
  </div>
</form>
