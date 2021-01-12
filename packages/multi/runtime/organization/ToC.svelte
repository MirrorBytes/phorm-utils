<script lang="ts">
  import type { Writable } from 'svelte/store';

  import type { IndexableJsonValue, Step, Section } from '../types';

  export let formName: string;
  export let steps: Writable<IndexableJsonValue> | Step[] | Section[];
  export let stepClass: string | undefined = undefined;
  export let sectionsWrapperClass: string | undefined = undefined;
  export let sectionsClass: string | undefined = undefined;

  const stepsWithSections = (steps as Step[])[0]?.sections
    ? (steps as Step[])
    : undefined;

  let stepsWithoutSections: string[];

  if (!stepsWithSections && !(steps as Section[])[0]?.heading) {
    (steps as Writable<IndexableJsonValue>).subscribe((v) => {
      stepsWithoutSections = Object.keys(v);
    });
  }

  let sections: Section[];

  if ((steps as Section[])[0]?.heading) {
    sections = steps as Section[];
  }
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
  {:else if stepsWithoutSections}
    {#each stepsWithoutSections as title}
      <li class={stepClass}>
        <h2>{title}</h2>
      </li>
    {/each}
  {:else}
    {#each sections as section}
      <li class={sectionsClass}>
        <h2>{section.heading}</h2>
      </li>
    {/each}
  {/if}
</ul>
