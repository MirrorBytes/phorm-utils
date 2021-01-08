<script lang="ts">
  import { Form, FieldType } from 'svelte-multi';
  import type { FormConfig, SubmitType } from 'svelte-multi';

  import states from './us_states';

  import Header from './Header.svelte';

  const config: FormConfig = {
    heading: 'Test',
    contents: [
      // Steps for this example
      {
        heading: 'Customer Info',
        sections: [
          {
            heading: '',
            lines: [
              {
                fields: [
                  {
                    props: {
                      id: 'first_name',
                      name: 'first_name',
                      type: FieldType.Text,
                      placeholder: 'First Name',
                    },
                  },
                  {
                    props: {
                      id: 'last_name',
                      name: 'last_name',
                      type: FieldType.Text,
                      placeholder: 'Last Name',
                    },
                  },
                  {
                    props: {
                      id: 'phone',
                      name: 'phone',
                      type: FieldType.Tel,
                      placeholder: 'Phone',
                    },
                  },
                  {
                    props: {
                      id: 'email',
                      name: 'email',
                      type: FieldType.Email,
                      placeholder: 'Email',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        heading: 'Billing Info',
        sections: [
          {
            heading: '',
            lines: [
              {
                fields: [
                  {
                    props: {
                      id: 'bill_addr',
                      name: 'bill_addr',
                      type: FieldType.Text,
                      placeholder: 'Address',
                    },
                  },
                  {
                    props: {
                      id: 'bill_addr2',
                      name: 'bill_addr2',
                      type: FieldType.Text,
                      placeholder: 'Address 2',
                    },
                  },
                  {
                    props: {
                      id: 'bill_city',
                      name: 'bill_city',
                      type: FieldType.Text,
                      placeholder: 'City',
                    },
                  },
                  {
                    props: {
                      id: 'bill_st',
                      name: 'bill_st',
                      type: FieldType.Select,
                    },
                    selectOptions: states,
                  },
                  {
                    props: {
                      id: 'bill_zip',
                      name: 'bill_zip',
                      type: FieldType.Number,
                      placeholder: 'Zip Code',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        heading: 'Shipping Info',
        sections: [
          {
            heading: '',
            lines: [
              {
                fields: [
                  {
                    props: {
                      id: 'ship_addr',
                      name: 'ship_addr',
                      type: FieldType.Text,
                      placeholder: 'Address',
                    },
                  },
                  {
                    props: {
                      id: 'ship_addr2',
                      name: 'ship_addr2',
                      type: FieldType.Text,
                      placeholder: 'Address 2',
                    },
                  },
                  {
                    props: {
                      id: 'ship_city',
                      name: 'ship_city',
                      type: FieldType.Text,
                      placeholder: 'City',
                    },
                  },
                  {
                    props: {
                      id: 'ship_st',
                      name: 'ship_st',
                      type: FieldType.Select,
                    },
                    selectOptions: states,
                  },
                  {
                    props: {
                      id: 'ship_zip',
                      name: 'ship_zip',
                      type: FieldType.Number,
                      placeholder: 'Zip Code',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        heading: 'Payment Info',
        sections: [
          {
            heading: '',
            lines: [
              {
                fields: [
                  {
                    props: {
                      id: 'card',
                      name: 'card',
                      type: FieldType.Number,
                      placeholder: 'Card Number',
                    },
                  },
                  {
                    props: {
                      id: 'month',
                      name: 'month',
                      type: FieldType.Number,
                      placeholder: 'Month',
                    },
                  },
                  {
                    props: {
                      id: 'year',
                      name: 'year',
                      type: FieldType.Number,
                      placeholder: 'Year',
                    },
                  },
                  {
                    props: {
                      id: 'cvv',
                      name: 'cvv',
                      type: FieldType.Number,
                      placeholder: 'CVV',
                    },
                  },
                  {
                    props: {
                      id: 'card_zip',
                      name: 'card_zip',
                      type: FieldType.Number,
                      placeholder: 'Zip Code',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const onSubmit = (ev: CustomEvent<SubmitType>) => {
    const { e, store } = ev.detail;

    console.log(e, store);
  };
</script>

<Form {config} let:multi let:prev let:next on:submit={onSubmit}>
  <Header {multi} />

  <button slot="prev" on:click|preventDefault={prev}>Prev</button>
  <button slot="next" on:click|preventDefault={next}>Next</button>
  <input slot="submit" type="submit" placeholder="Submit" />
</Form>
