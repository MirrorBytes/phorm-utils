import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import type { IndexableJsonValue } from '../types';

import Radio from '../controls/Radio.svelte';

expect.extend(toHaveNoViolations);

const store: Writable<IndexableJsonValue> = writable({});

test('component rendered with elements (with given name) and label', () => {
  const { getByText, getByLabelText } = render(Radio, {
    props: {
      store,
      name: 'test_radio',
      items: [
        {
          id: 'test_radio_val_1',
          value: 'test_val_1',
          text: 'Test Radio Val 1',
        },
      ],
      label: { text: 'Test Radio' },
    },
  });

  expect(() => getByText('Test Radio')).not.toThrow();
  expect(() => getByLabelText('Test Radio Val 1')).not.toThrow();
  expect(
    getByLabelText('Test Radio Val 1').attributes.getNamedItem('name')?.value,
  ).toBe('test_radio');
});

test('input function being called properly', async () => {
  const { findByLabelText, component } = render(Radio, {
    props: {
      store,
      name: 'test_radio',
      items: [
        {
          id: 'test_radio_val_1',
          value: 'test_val_1',
          text: 'Test Radio Val 1',
        },
        {
          id: 'test_radio_val_2',
          value: 'test_val_2',
          text: 'Test Radio Val 2',
        },
      ],
      label: { text: 'Test Radio' },
    },
  });

  const radio1 = await findByLabelText('Test Radio Val 1');
  const radio2 = await findByLabelText('Test Radio Val 2');

  const mock = jest.fn();
  component.$on('input', mock);

  userEvent.click(radio2);
  userEvent.click(radio1);

  expect(mock).toHaveBeenCalledTimes(2);
});

test('store being updated on input', async () => {
  store.set({});

  const { findByLabelText } = render(Radio, {
    props: {
      store,
      name: 'test_radio',
      items: [
        {
          id: 'test_radio_val_1',
          value: 'test_val_1',
          text: 'Test Radio Val 1',
        },
        {
          id: 'test_radio_val_2',
          value: 'test_val_2',
          text: 'Test Radio Val 2',
        },
      ],
      label: { text: 'Test Radio' },
    },
  });

  const radio1 = await findByLabelText('Test Radio Val 1');
  const radio2 = await findByLabelText('Test Radio Val 2');

  userEvent.click(radio2);

  expect(get(store)).toMatchObject({
    test_radio: 'test_val_2',
  });

  userEvent.click(radio1);

  expect(get(store)).toMatchObject({
    test_radio: 'test_val_1',
  });
});

test('path follow to update store on input', async () => {
  store.set({
    test2: {
      asdf: [{}],
    },
  });

  const { findByLabelText } = render(Radio, {
    props: {
      store,
      path: ['test2', 'asdf', 0],
      name: 'test_radio',
      items: [
        {
          id: 'test_radio_val_1',
          value: 'test_val_1',
          text: 'Test Radio Val 1',
        },
        {
          id: 'test_radio_val_2',
          value: 'test_val_2',
          text: 'Test Radio Val 2',
        },
      ],
      label: { text: 'Test Radio' },
    },
  });

  const radio1 = await findByLabelText('Test Radio Val 1');
  const radio2 = await findByLabelText('Test Radio Val 2');

  userEvent.click(radio2);

  expect(get(store)).toMatchObject({
    test2: {
      asdf: [{ test_radio: 'test_val_2' }],
    },
  });

  userEvent.click(radio1);

  expect(get(store)).toMatchObject({
    test2: {
      asdf: [{ test_radio: 'test_val_1' }],
    },
  });
});

test('ensure a11y compliance', async () => {
  store.set({});

  const target = document.createElement('div');

  target.setAttribute('role', 'main');

  const { container } = render(Radio, {
    target: document.body.appendChild(target),
    props: {
      store,
      name: 'test_radio',
      items: [
        {
          id: 'test_radio_val_1',
          value: 'test_val_1',
          text: 'Test Radio Val 1',
        },
        {
          id: 'test_radio_val_2',
          value: 'test_val_2',
          text: 'Test Radio Val 2',
        },
      ],
      label: { text: 'Test Radio' },
    },
  });

  expect(await axe(container)).toHaveNoViolations();
});
