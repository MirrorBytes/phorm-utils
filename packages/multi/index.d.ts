declare module 'svelte-multi' {
  export * from 'svelte-multi/dist/types';

  export const Form: typeof import('./runtime/wrappers/Form.svelte').default;
  export const Field: typeof import('./runtime/wrappers/Field.svelte').default;
  export const Step: typeof import('./runtime/wrappers/Step.svelte').default;
  export const ToC: typeof import('./runtime/organization/ToC.svelte').default;
}
