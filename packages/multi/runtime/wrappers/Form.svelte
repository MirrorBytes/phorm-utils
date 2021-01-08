<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';

  import type {
    IndexableJsonValue,
    FormConfig,
    Step as StepType,
    Section as SectionType,
  } from '../types';

  import Step from './Step.svelte';
  import Section from '../organization/Section.svelte';

  export let store: Writable<IndexableJsonValue> = writable({});
  export let config: FormConfig | undefined = undefined;
  export let controlsClass: string | undefined = undefined;

  // Only used if config is provided.
  const steps = (config?.contents as StepType[])?.[0].sections
    ? (config?.contents as StepType[])
    : undefined;

  // Only used if config is provided.
  const sections = (config?.contents as SectionType[])?.[0].lines
    ? (config?.contents as SectionType[])
    : undefined;

  const multi: Writable<IndexableJsonValue> = writable({});

  let current = 0;

  const dispatch = createEventDispatcher();
  const onSubmit = (e: Event) => dispatch('submit', { e, store });
  const onContextMenu = (e: Event) => dispatch('contextmenu', e);
  const onClick = (e: Event) => dispatch('click', e);

  function prev() {
    if (Object.keys($multi)[current - 1]) {
      multi.update((v) => {
        v[Object.keys(v)[current]] = false;
        v[Object.keys(v)[--current]] = true;

        return v;
      });
    }
  }

  function next() {
    if (Object.keys($multi)[current + 1]) {
      multi.update((v) => {
        v[Object.keys(v)[current]] = false;
        v[Object.keys(v)[++current]] = true;

        return v;
      });
    }
  }

  onMount(() => {
    multi.update((v) => {
      v[Object.keys(v)[current]] = true;

      return v;
    });
  });
</script>

<form
  on:submit|preventDefault={onSubmit}
  on:contextmenu={onContextMenu}
  on:click={onClick}
  {...$$restProps}>
  <slot {store} {multi} {prev} {next} />

  {#if config}
    {#if steps}
      <h1>{config.heading}</h1>

      {#each steps as step}
        <Step name={step.heading} {multi}>
          {#each step.sections as section}
            <Section {store} {section} inStep={true} />
          {/each}
        </Step>
      {/each}
    {:else if sections}
      <h1>{config.heading}</h1>

      {#each sections as section}
        <Section {store} {section} inStep={false} />
      {/each}
    {/if}
  {/if}

  <div class={controlsClass}>
    {#if Object.keys($multi)[current - 1]}
      <slot name="prev" />
    {/if}

    {#if Object.keys($multi)[current + 1]}
      <slot name="next" />
    {/if}

    {#if !Object.keys($multi)[current + 1]}
      <slot name="submit" />
    {/if}
  </div>
</form>
