<script lang="ts">
  import type { Writable } from 'svelte/store';

  import type { IndexableJsonValue, Step } from '../types';

  export let formName: string;
  export let steps: Writable<IndexableJsonValue> | Step[];
  export let stepClass: string | undefined = undefined;
  export let sectionsWrapperClass: string | undefined = undefined;
  export let sectionsClass: string | undefined = undefined;

  const stepsWithSections = (steps as Step[])[0]?.sections
    ? (steps as Step[])
    : undefined;

  let stepsWithoutSections: string[];

  if (!stepsWithSections) {
    (steps as Writable<IndexableJsonValue>).subscribe((v) => {
      stepsWithoutSections = Object.keys(v);
    });
  }
</script>

<h1>{formName}</h1>

<ul {...$$restProps}>
  {#if stepsWithoutSections}
    {#each stepsWithoutSections as title}
      <li class={stepClass}>
        <h2>{title}</h2>
      </li>
    {/each}
  {:else if stepsWithSections}
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
  {/if}
</ul>
