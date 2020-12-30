import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import type { IndexableJsonValue } from '../types';

import Checkbox from '../controls/Checkbox.svelte';

const store: Writable<IndexableJsonValue> = writable({});

test('component rendered with elements (with given name) and label', () => {
  const { getByText, getByLabelText } = render(Checkbox, {
    props: {
      store,
      name: 'test_checkbox',
      items: [
        {
          id: 'test_check_val_1',
          value: 'test_val_1',
          text: 'Test Check Val 1',
        },
      ],
      label: { text: 'Test Check', for: 'test_checkbox' },
    },
  });

  expect(() => getByText('Test Check')).not.toThrow();
  expect(() => getByLabelText('Test Check Val 1')).not.toThrow();
  expect(
    getByLabelText('Test Check Val 1').attributes.getNamedItem('name')?.value,
  ).toBe('test_checkbox');
});

test('input function being called properly', async () => {
  const { findByLabelText, component } = render(Checkbox, {
    props: {
      store,
      name: 'test_checkbox',
      items: [
        {
          id: 'test_check_val_1',
          value: 'test_val_1',
          text: 'Test Check Val 1',
        },
      ],
      label: { text: 'Test Check', for: 'test_checkbox' },
    },
  });

  const check1 = await findByLabelText('Test Check Val 1');

  const mock = jest.fn();
  component.$on('input', mock);

  userEvent.click(check1);

  expect(mock).toHaveBeenCalledTimes(1);
});

test('store being updated on input', async () => {
  store.set({});

  const { findByLabelText } = render(Checkbox, {
    props: {
      store,
      name: 'test_checkbox',
      items: [
        {
          id: 'test_check_val_1',
          value: 'test_val_1',
          text: 'Test Check Val 1',
        },
        {
          id: 'test_check_val_2',
          value: 'test_val_2',
          text: 'Test Check Val 2',
        },
      ],
      label: { text: 'Test Check', for: 'test_checkbox' },
    },
  });

  const check1 = await findByLabelText('Test Check Val 1');
  const check2 = await findByLabelText('Test Check Val 2');

  userEvent.click(check1);
  userEvent.click(check2);

  expect(get(store)).toMatchObject({
    test_checkbox: ['test_val_1', 'test_val_2'],
  });

  userEvent.click(check1);

  expect(get(store)).toMatchObject({
    test_checkbox: ['test_val_2'],
  });
});

test('path follow to update store on input', async () => {
  store.set({
    test2: {
      asdf: [{}],
    },
  });

  const { findByLabelText } = render(Checkbox, {
    props: {
      store,
      path: ['test2', 'asdf', 0],
      name: 'test_checkbox',
      items: [
        {
          id: 'test_check_val_1',
          value: 'test_val_1',
          text: 'Test Check Val 1',
        },
        {
          id: 'test_check_val_2',
          value: 'test_val_2',
          text: 'Test Check Val 2',
        },
      ],
      label: { text: 'Test Check', for: 'test_checkbox' },
    },
  });

  const check1 = await findByLabelText('Test Check Val 1');
  const check2 = await findByLabelText('Test Check Val 2');

  userEvent.click(check1);
  userEvent.click(check2);

  expect(get(store)).toMatchObject({
    test2: {
      asdf: [{ test_checkbox: ['test_val_1', 'test_val_2'] }],
    },
  });

  userEvent.click(check1);

  expect(get(store)).toMatchObject({
    test2: {
      asdf: [{ test_checkbox: ['test_val_2'] }],
    },
  });
});
