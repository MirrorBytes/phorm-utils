import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import type { IndexableJsonValue } from '../types';

import Input from '../controls/Input.svelte';

expect.extend(toHaveNoViolations);

const store: Writable<IndexableJsonValue> = writable({});

test('component rendered with name and label', () => {
  const { getByLabelText } = render(Input, {
    props: {
      store,
      id: 'test_input',
      name: 'test_input',
      type: 'text',
      placeholder: 'Test Input',
      label: { text: 'Test Input' },
    },
  });

  expect(() => getByLabelText('Test Input')).not.toThrow();
  expect(
    getByLabelText('Test Input').attributes.getNamedItem('name')?.value,
  ).toBe('test_input');
});

test('input function being called properly', async () => {
  const { findByLabelText, component } = render(Input, {
    props: {
      store,
      id: 'test_input',
      name: 'test_input',
      type: 'text',
      placeholder: 'Test Input',
      label: { text: 'Test Input' },
    },
  });

  const input = await findByLabelText('Test Input');

  const mock = jest.fn();
  component.$on('input', mock);

  userEvent.type(input, 'asdf');

  expect(mock).toHaveBeenCalledTimes(4);
});

test('input function being called properly for file input', async () => {
  const { findByLabelText } = render(Input, {
    props: {
      store,
      id: 'test_file',
      name: 'test_file',
      type: 'file',
      label: { text: 'Test File' },
    },
  });

  const input = (await findByLabelText('Test File')) as HTMLInputElement;

  const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

  userEvent.upload(input, file);

  expect(input.files ? input.files[0] : null).toStrictEqual(file);
  expect(input.files?.item(0)).toStrictEqual(file);
  expect(input.files).toHaveLength(1);
});

test('store being updated on input', async () => {
  store.set({});

  const { findByLabelText } = render(Input, {
    props: {
      store,
      id: 'test_input',
      name: 'test_input',
      type: 'text',
      placeholder: 'Test Input',
      label: { text: 'Test Input' },
    },
  });

  const input = await findByLabelText('Test Input');

  userEvent.type(input, 'asdf');

  expect(get(store)).toMatchObject({
    test_input: 'asdf',
  });
});

test('path follow to update store on input', async () => {
  store.set({
    test2: {
      asdf: [{}],
    },
  });

  const { findByLabelText } = render(Input, {
    props: {
      store,
      path: ['test2', 'asdf', 0],
      id: 'test_input',
      name: 'test_input',
      type: 'text',
      placeholder: 'Test Input',
      label: { text: 'Test Input' },
    },
  });

  const input = await findByLabelText('Test Input');

  userEvent.type(input, 'asdf');

  expect(get(store)).toMatchObject({
    test2: {
      asdf: [{ test_input: 'asdf' }],
    },
  });
});

test('ensure a11y compliance', async () => {
  store.set({});

  const target = document.createElement('div');

  target.setAttribute('role', 'main');

  const { container } = render(Input, {
    target: document.body.appendChild(target),
    props: {
      store,
      id: 'test_input',
      name: 'test_input',
      type: 'text',
      placeholder: 'Test Input',
      label: { text: 'Test Input' },
    },
  });

  expect(await axe(container)).toHaveNoViolations();
});
