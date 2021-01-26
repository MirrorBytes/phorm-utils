<script lang="ts">
  import { FieldType } from '@phorm-utils/common';

  import Form from '../../wrappers/Form.svelte';
  import Step from '../../wrappers/Step.svelte';
  import Field from '../../wrappers/Field.svelte';
</script>

<Form let:store let:multi let:prev let:next>
  <Step {multi} name="Test Step 1">
    <Field
      {store}
      field={{
        id: 'test_input',
        name: 'test_input',
        type: FieldType.Text,
        placeholder: 'Test Input',
      }}
    />
  </Step>

  <Step {multi} name="Test Step 2">
    <Field
      {store}
      field={{
        id: 'test_input_2',
        name: 'test_input_2',
        type: FieldType.Text,
        placeholder: 'Test Input 2',
      }}
    />
  </Step>

  <Step {multi} name="Test Step 3">
    <Field
      {store}
      field={{
        id: 'test_input_3',
        name: 'test_input_3',
        type: FieldType.Text,
        placeholder: 'Test Input 3',
      }}
    />
  </Step>

  <button slot="prev" on:click|preventDefault={prev}>Prev</button>

  <button slot="next" on:click|preventDefault={next}>Next</button>

  <input slot="submit" type="submit" placeholder="Submit" />
</Form>
