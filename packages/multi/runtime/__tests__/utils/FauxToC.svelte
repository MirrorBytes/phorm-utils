<script lang="ts">
  import { FieldType } from '../../types';

  import Form from '../../wrappers/Form.svelte';
  import Step from '../../wrappers/Step.svelte';
  import Field from '../../wrappers/Field.svelte';
  import ToC from '../../organization/ToC.svelte';
</script>

<Form let:store let:multi let:prev let:next>
  <ToC formName="Test Form" steps={multi} />

  <Step {multi} name="Test Step 1">
    <Field
      {store}
      field={{ id: 'test_input', name: 'test_input', type: FieldType.Text, label: { text: 'Test Input 1' } }} />
  </Step>

  <Step {multi} name="Test Step 2">
    <Field
      {store}
      field={{ id: 'test_input_2', name: 'test_input_2', type: FieldType.Text, label: { text: 'Test Input 2' } }} />
  </Step>

  <Step {multi} name="Test Step 3">
    <Field
      {store}
      field={{ id: 'test_input_3', name: 'test_input_3', type: FieldType.Text, label: { text: 'Test Input 3' } }} />
  </Step>

  <button slot="prev" on:click|preventDefault={prev}>Prev</button>

  <button slot="next" on:click|preventDefault={next}>Next</button>

  <input slot="submit" type="submit" placeholder="Submit" />
</Form>
