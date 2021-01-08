<script lang="ts">
  import type { Writable } from 'svelte/store';

  import type { IndexableJsonValue, Section } from '../types';

  import Field from '../wrappers/Field.svelte';

  export let store: Writable<IndexableJsonValue>;
  export let section: Section;
  export let inStep: boolean;
</script>

<div class={section.classes}>
  {#if inStep}
    <h3>{section.heading}</h3>
  {:else}
    <h2>{section.heading}</h2>
  {/if}

  {#each section.lines as line}
    <div class={line.classes}>
      {#each line.fields as field}
        {#if !field.selectOptions}
          <Field {store} field={field.props} initial={field.initial} />
        {:else}
          <Field {store} field={field.props} initial={field.initial}>
            {#each field.selectOptions as option}
              <option value={option}>{option}</option>
            {/each}
          </Field>
        {/if}
      {/each}
    </div>
  {/each}
</div>
