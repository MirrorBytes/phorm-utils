<script lang="ts">
  import type { Writable } from 'svelte/store';

  import type { IndexableJsonValue } from '@phorm-utils/common';

  import type { Section } from '../types';

  import Field from '../wrappers/Field.svelte';

  export let store: Writable<IndexableJsonValue>;
  export let section: Section;
  export let inStep: boolean;
  export let sIdx: number;
</script>

<div class={section.classes || undefined} data-key={sIdx}>
  {#if section.heading}
    {#if inStep}
      <h3>{section.heading}</h3>
    {:else}
      <h2>{section.heading}</h2>
    {/if}
  {/if}

  {#if section.lines.length}
    {#each section.lines as line, lIdx}
      <div class={line.classes || undefined} data-key={lIdx}>
        {#if line.fields.length}
          {#each line.fields as field, fIdx}
            <div class={field.classes || undefined} data-key={fIdx}>
              {#if !field.selectOptions}
                <Field {store} field={field.props} initial={field.initial} />
              {:else}
                <Field {store} field={field.props} initial={field.initial}>
                  {#each field.selectOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                </Field>
              {/if}
            </div>
          {/each}
        {:else}No fields provided{/if}
      </div>
    {/each}
  {:else}No lines provided{/if}
</div>
