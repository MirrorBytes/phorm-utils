<script lang="ts">
  import type { Writable } from 'svelte/store';

  import type { IndexableJsonValue } from '../../types';

  export let store: Writable<IndexableJsonValue>;
  export let id: string;
  export let name: string;

  import states from './us_states';

  import Select from '../../controls/Select.svelte';
</script>

<Select {store} {id} {name} {...$$restProps}>
  {#each states as state}
    <option value={state}>{state}</option>
  {/each}
</Select>
