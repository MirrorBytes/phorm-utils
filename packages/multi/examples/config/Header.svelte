<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { IndexableJsonValue } from 'svelte-multi';

  export let multi: Writable<IndexableJsonValue>;
</script>

<header>
  {#each Object.keys($multi) as step}
    <div class:active={$multi[step]}>{step}</div>
  {/each}
</header>
