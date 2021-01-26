<script lang="ts">
  import type { Writable } from 'svelte/store';

  import type { IndexableJsonValue } from '@phorm-utils/common';

  export let name: string;
  export let multi: Writable<IndexableJsonValue>;

  multi.update((v) => {
    v[name] = false;

    return v;
  });

  let visible = false;

  multi.subscribe((v) => {
    visible = v[name] as boolean;
  });
</script>

{#if visible}
  <div>
    <h2>{name}</h2>

    <slot />
  </div>
{/if}
