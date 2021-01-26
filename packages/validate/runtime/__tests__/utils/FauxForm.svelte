<script lang="ts">
  import { FieldType } from '@phorm-utils/common';

  import Form from '../../wrappers/Form.svelte';
  import Field from '../../wrappers/Field.svelte';

  const constraints = {
    testInput: {
      presence: true,
      length: {
        minimum: 5,
      },
    },
  };
</script>

<Form let:store let:errors let:validate {constraints}>
  <Field
    {store}
    {errors}
    {validate}
    field={{
      id: 'testInput',
      name: 'testInput',
      type: FieldType.Text,
      placeholder: 'Test Input',
      label: { text: 'Test Input' },
    }}
    errorClass="errors"
  />

  <input type="submit" value="Submit" />
</Form>
