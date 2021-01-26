<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import type { SvelteComponentDev } from 'svelte/internal';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';

  import type { IndexableJsonValue } from '@phorm-utils/common';

  import type {
    FormConfig,
    Step as StepType,
    Section as SectionType,
  } from '../types';

  import Step from './Step.svelte';
  import Section from '../organization/Section.svelte';

  export let store: Writable<IndexableJsonValue> = writable({});
  export let config: FormConfig | undefined = undefined;
  export let ContentWrap: typeof SvelteComponentDev | undefined = undefined;
  export let contentWrapProps: Record<string, unknown> | undefined = undefined;
  export let controlsClass: string | undefined = undefined;

  // Only used if config is provided.
  $: steps = (config?.contents as StepType[])?.[0]?.sections
    ? (config?.contents as StepType[])
    : undefined;

  // Only used if config is provided.
  $: sections = (config?.contents as SectionType[])?.[0]?.lines
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
  {...$$restProps}
>
  <slot {store} {multi} {prev} {next} />

  {#if config}
    <h1>{config.heading}</h1>

    {#if ContentWrap}
      <svelte:component this={ContentWrap} {...contentWrapProps}>
        {#if steps}
          {#if steps.length}
            {#each steps as step}
              <Step name={step.heading} {multi}>
                {#if step.sections}
                  {#each step.sections as section, sIdx}
                    <Section {store} {section} {sIdx} inStep={true} />
                  {/each}
                {:else}No sections provided{/if}
              </Step>
            {/each}
          {:else}No steps provided{/if}
        {:else if sections}
          {#if sections.length}
            {#each sections as section, sIdx}
              <Section {store} {section} {sIdx} inStep={false} />
            {/each}
          {:else}No sections provided{/if}
        {/if}
      </svelte:component>
    {:else if steps}
      {#if steps.length}
        {#each steps as step}
          <Step name={step.heading} {multi}>
            {#if step.sections}
              {#each step.sections as section, sIdx}
                <Section {store} {section} {sIdx} inStep={true} />
              {/each}
            {:else}No sections provided{/if}
          </Step>
        {/each}
      {:else}No steps provided{/if}
    {:else if sections}
      {#if sections.length}
        {#each sections as section, sIdx}
          <Section {store} {section} {sIdx} inStep={false} />
        {/each}
      {:else}No sections provided{/if}
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
