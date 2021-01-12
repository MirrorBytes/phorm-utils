<script lang="ts">
  import type { Writable } from 'svelte/store';

  import type { IndexableJsonValue, Step, Section } from '../types';

  export let formName: string;
  export let stepsWithSections: Step[] | undefined = undefined;
  export let stepsWithoutSections:
    | Writable<IndexableJsonValue>
    | undefined = undefined;
  export let sections: Section[] | undefined = undefined;
  export let stepClass: string | undefined = undefined;
  export let sectionsWrapperClass: string | undefined = undefined;
  export let sectionsClass: string | undefined = undefined;

  $: stepsWithoutSectionsStrings = stepsWithoutSections
    ? Object.keys($stepsWithoutSections)
    : undefined;
</script>

<h1>{formName}</h1>

<ul {...$$restProps}>
  {#if stepsWithSections}
    {#each stepsWithSections as step}
      <li class={stepClass}>
        <h2>{step.heading}</h2>

        <ul class={sectionsWrapperClass}>
          {#each step.sections as section}
            <li class={sectionsClass}>
              <h3>{section.heading}</h3>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  {:else if stepsWithoutSectionsStrings}
    {#each stepsWithoutSectionsStrings as title}
      <li class={stepClass}>
        <h2>{title}</h2>
      </li>
    {/each}
  {:else if sections}
    {#each sections as section}
      <li class={sectionsClass}>
        <h2>{section.heading}</h2>
      </li>
    {/each}
  {/if}
</ul>
