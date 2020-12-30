import { get } from 'svelte/store';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import FauxForm from './utils/FauxForm.svelte';

test('component renders with inputs', () => {
  const { getByLabelText, getByDisplayValue, getByText } = render(FauxForm);

  expect(
    getByLabelText('Test Input').attributes.getNamedItem('name')?.value,
  ).toBe('test_input');
  expect(() => getByText('Prev')).toThrow();
  expect(() => getByText('Next')).toThrow();
  expect(() => getByDisplayValue('Submit')).not.toThrow();
});

test('component submits without error', async () => {
  const { findByLabelText, findByDisplayValue, component } = render(FauxForm);

  const input = await findByLabelText('Test Input');
  const submit = await findByDisplayValue('Submit');

  component.$on('submit', (ev) => {
    const { store } = ev.detail;

    expect(get(store)).toMatchObject({
      test_input: 'asdf',
    });
  });

  userEvent.type(input, 'asdf');
  userEvent.click(submit);
});
