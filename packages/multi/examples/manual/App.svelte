<script lang="ts">
  import { Form, Step, Field, FieldType } from 'svelte-multi';
  import type { SubmitType } from 'svelte-multi';

  import states from './us_states';

  import Header from './Header.svelte';

  const onSubmit = (ev: CustomEvent<SubmitType>) => {
    const { e, store } = ev.detail;

    console.log(e, store);
  };
</script>

<Form let:store let:multi let:prev let:next on:submit={onSubmit}>
  <Header {multi} />

  <Step {multi} name="Customer Info">
    <Field
      {store}
      field={{ id: 'first_name', name: 'first_name', type: FieldType.Text, placeholder: 'First Name' }} />
    <Field
      {store}
      field={{ id: 'last_name', name: 'last_name', type: FieldType.Text, placeholder: 'Last Name' }} />
    <Field
      {store}
      field={{ id: 'phone', name: 'phone', type: FieldType.Tel, placeholder: 'Phone' }} />
    <Field
      {store}
      field={{ id: 'email', name: 'email', type: FieldType.Email, placeholder: 'Email' }} />
  </Step>

  <Step {multi} name="Billing Info">
    <Field
      {store}
      field={{ id: 'bill_addr', name: 'bill_addr', type: FieldType.Text, placeholder: 'Address' }} />
    <Field
      {store}
      field={{ id: 'bill_addr2', name: 'bill_addr2', type: FieldType.Text, placeholder: 'Address 2' }} />
    <Field
      {store}
      field={{ id: 'bill_city', name: 'bill_city', type: FieldType.Text, placeholder: 'City' }} />
    <Field
      {store}
      field={{ id: 'bill_st', name: 'bill_st', type: FieldType.Select }}>
      <option>State</option>

      {#each states as state}
        <option value={state}>{state}</option>
      {/each}
    </Field>
    <Field
      {store}
      field={{ id: 'bill_zip', name: 'bill_zip', type: FieldType.Number, placeholder: 'Zip Code' }} />
  </Step>

  <Step {multi} name="Shipping Info">
    <Field
      {store}
      field={{ id: 'ship_addr', name: 'ship_addr', type: FieldType.Text, placeholder: 'Address' }} />
    <Field
      {store}
      field={{ id: 'ship_addr2', name: 'ship_addr2', type: FieldType.Text, placeholder: 'Address 2' }} />
    <Field
      {store}
      field={{ id: 'ship_city', name: 'ship_city', type: FieldType.Text, placeholder: 'City' }} />
    <Field
      {store}
      field={{ id: 'ship_st', name: 'ship_st', type: FieldType.Select }}>
      <option>State</option>

      {#each states as state}
        <option value={state}>{state}</option>
      {/each}
    </Field>
    <Field
      {store}
      field={{ id: 'ship_zip', name: 'ship_zip', type: FieldType.Number, placeholder: 'Zip Code' }} />
  </Step>

  <Step {multi} name="Payment Info">
    <Field
      {store}
      field={{ id: 'card', name: 'card', type: FieldType.Number, placeholder: 'Card Number' }} />
    <Field
      {store}
      field={{ id: 'month', name: 'month', type: FieldType.Number, placeholder: 'Month' }} />
    <Field
      {store}
      field={{ id: 'year', name: 'year', type: FieldType.Number, placeholder: 'Year' }} />
    <Field
      {store}
      field={{ id: 'cvv', name: 'cvv', type: FieldType.Number, placeholder: 'CVV' }} />
    <Field
      {store}
      field={{ id: 'card_zip', name: 'card_zip', type: FieldType.Number, placeholder: 'Zip Code' }} />
  </Step>

  <button slot="prev" on:click|preventDefault={prev}>Prev</button>
  <button slot="next" on:click|preventDefault={next}>Next</button>
  <input slot="submit" type="submit" placeholder="Submit" />
</Form>
