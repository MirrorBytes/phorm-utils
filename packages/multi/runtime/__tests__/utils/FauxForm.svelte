<script lang="ts">
  import { FieldType } from '../../types';

  import Form from '../../Form.svelte';
  import Field from '../../Field.svelte';
</script>

<Form let:store>
  <Field
    {store}
    field={{ type: FieldType.Text, id: 'test_input', name: 'test_input', placeholder: 'Test Input', label: { text: 'Test Input' } }} />

  <input type="submit" value="Submit" />
</Form>
