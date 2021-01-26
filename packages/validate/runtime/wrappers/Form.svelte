<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { get, writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import { validate } from 'validate.js';

  import type { IndexableJsonValue } from '@phorm-utils/common';

  import { Form } from '@phorm-utils/multi';
  import type { SubmitType } from '@phorm-utils/multi';

  export let store: Writable<IndexableJsonValue> = writable({});
  export let constraints: Record<string, unknown>;

  const dispatch = createEventDispatcher();
  const errors: Writable<Record<string, string[]>> = writable({});

  store.subscribe((v) => {
    const keys = Object.keys(v);

    for (let x = 0; x < keys.length; x++) {
      errors.update((va) => {
        va[keys[x]] = [];

        return va;
      });
    }
  });

  const validateForm = () => {
    const gotten = get(store);
    const fields: Record<string, string> = {};

    const keys = Object.keys(constraints);

    for (let x = 0; x < keys.length; x++) {
      fields[constraints[x] as string] = gotten[
        constraints[x] as string
      ] as string;
    }

    const validateErrors: Record<string, string[]> = validate(
      fields,
      constraints,
    );

    if (validateErrors) {
      errors.update((v) => {
        const vKeys = Object.keys(validateErrors);

        for (let x = 0; x < vKeys.length; x++) {
          v[vKeys[x]] = validateErrors[vKeys[x]];
        }

        return v;
      });

      return false;
    }

    return true;
  };

  const validateSubmit = (sub: SubmitType) => {
    if (validateForm()) {
      dispatch('submit', { e: sub.e, store: sub.store });
    }
  };
</script>

<Form
  {store}
  let:multi
  let:prev
  let:next
  on:submit={(e) => validateSubmit({ ...e.detail })}
  {...$$restProps}
>
  <slot {store} validate={validateForm} {errors} {multi} {prev} {next} />

  <slot name="prev" slot="prev" />
  <slot name="next" slot="next" />
  <slot name="submit" slot="submit" />
</Form>
