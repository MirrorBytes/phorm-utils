import { tick } from 'svelte';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import FauxStepForm from './utils/FauxStepForm.svelte';

expect.extend(toHaveNoViolations);

test('component renders with inputs', async () => {
  const { getByPlaceholderText, getByText } = render(FauxStepForm);

  expect(
    getByPlaceholderText('Test Input').attributes.getNamedItem('name')?.value,
  ).toBe('test_input');
  expect(() => getByPlaceholderText('Test Input 2')).toThrow();
  expect(() => getByPlaceholderText('Test Input 3')).toThrow();

  expect(() => getByText('Prev')).toThrow();
  expect(() => getByText('Next')).not.toThrow();
  expect(() => getByPlaceholderText('Submit')).toThrow();

  userEvent.click(getByText('Next'));

  await tick();

  expect(() => getByPlaceholderText('Test Input')).toThrow();
  expect(
    getByPlaceholderText('Test Input 2').attributes.getNamedItem('name')?.value,
  ).toBe('test_input_2');
  expect(() => getByPlaceholderText('Test Input 3')).toThrow();

  expect(() => getByText('Prev')).not.toThrow();
  expect(() => getByText('Next')).not.toThrow();
  expect(() => getByPlaceholderText('Submit')).toThrow();

  userEvent.click(getByText('Next'));

  await tick();

  expect(() => getByPlaceholderText('Test Input')).toThrow();
  expect(() => getByPlaceholderText('Test Input 2')).toThrow();
  expect(
    getByPlaceholderText('Test Input 3').attributes.getNamedItem('name')?.value,
  ).toBe('test_input_3');

  expect(() => getByText('Prev')).not.toThrow();
  expect(() => getByText('Next')).toThrow();
  expect(() => getByPlaceholderText('Submit')).not.toThrow();
});

test('ensure a11y compliance', async () => {
  const target = document.createElement('div');

  target.setAttribute('role', 'main');

  const { findByText, container } = render(FauxStepForm, {
    target: document.body.appendChild(target),
  });

  expect(await axe(container)).toHaveNoViolations();

  userEvent.click(await findByText('Next'));

  expect(await axe(container)).toHaveNoViolations();

  userEvent.click(await findByText('Next'));

  expect(await axe(container)).toHaveNoViolations();
});
