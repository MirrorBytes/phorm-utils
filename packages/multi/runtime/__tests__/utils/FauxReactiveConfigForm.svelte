<script lang="ts">
  import { FieldType } from '@phorm-utils/common';

  import type { FormConfig } from '../../types';

  import Form from '../../wrappers/Form.svelte';

  const config: FormConfig = {
    heading: 'Test Form',
    contents: [],
  };

  const changeConfig = () => {
    config.contents = [
      {
        heading: 'Test Section',
        lines: [
          {
            fields: [
              {
                props: {
                  id: 'test_input',
                  name: 'test_input',
                  type: FieldType.Text,
                  placeholder: 'Test Input',
                  label: { text: 'Test Input' },
                },
              },
            ],
          },
        ],
      },
    ];
  };
</script>

<Form {config} />

<button on:click={changeConfig}>Change Config</button>
