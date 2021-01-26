declare module '@phorm-utils/validate' {
  export const Form: typeof import('./runtime/wrappers/Form.svelte').default;
  export const Field: typeof import('./runtime/wrappers/Field.svelte').default;
}
