<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  import type { IndexableJsonValue } from './types';
  import { MULTI } from './contexts';

  export let name: string;

  const multi: Writable<IndexableJsonValue> = getContext(MULTI);

  multi.update((v) => {
    v[name] = false;

    return v;
  });

  let visible = false;

  multi.subscribe((v) => (visible = v[name] as boolean));
</script>

{#if visible}
  <div>
    <h2>{name}</h2>

    <slot />
  </div>
{/if}
