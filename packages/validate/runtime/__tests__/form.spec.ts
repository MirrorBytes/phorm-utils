import { tick } from 'svelte';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import FauxForm from './utils/FauxForm.svelte';

test('form does not submit if fields are not valid', async () => {
  const { findByDisplayValue, container } = render(FauxForm);

  const submit = await findByDisplayValue('Submit');

  userEvent.click(submit);

  await tick();

  expect(container.querySelectorAll('p').length).toBe(1);
});

test('form submits if fields are valid', async () => {
  const { findByLabelText, findByDisplayValue, container } = render(FauxForm);

  const input = await findByLabelText('Test Input');
  const submit = await findByDisplayValue('Submit');

  userEvent.type(input, '12345');
  userEvent.click(submit);

  expect(container.querySelectorAll('p').length).toBe(0);
});
