<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';

  import type { IndexableJsonValue } from './types';

  export let store: Writable<IndexableJsonValue> = writable({});

  const dispatch = createEventDispatcher();
  const onSubmit = (e: Event) => dispatch('submit', { e, store });
  const onContextMenu = (e: Event) => dispatch('contextmenu', e);
  const onClick = (e: Event) => dispatch('click', e);
</script>

<form
  on:submit|preventDefault={onSubmit}
  on:contextmenu={onContextMenu}
  on:click={onClick}
  {...$$restProps}>
  <slot {store} />
</form>
