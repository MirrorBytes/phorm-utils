import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { render, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import type { IndexableJsonValue } from '../types';

import FauxSelect from './utils/FauxSelect.svelte';
import Select from '../controls/Select.svelte';

expect.extend(toHaveNoViolations);

const store: Writable<IndexableJsonValue> = writable({});

test('component rendered with name and placeholder', () => {
  const { getByLabelText } = render(Select, {
    props: {
      store,
      id: 'test_select',
      name: 'test_select',
      label: { text: 'Test Select' },
    },
  });

  expect(() => getByLabelText('Test Select')).not.toThrow();
  expect(
    getByLabelText('Test Select').attributes.getNamedItem('name')?.value,
  ).toBe('test_select');
});

test('blur function being called properly', async () => {
  const { findByLabelText, component } = render(Select, {
    props: {
      store,
      id: 'test_select',
      name: 'test_select',
      label: { text: 'Test Select' },
    },
  });

  const select = await findByLabelText('Test Select');

  const mock = jest.fn();
  component.$on('blur', mock);

  await fireEvent.blur(select);

  expect(mock).toHaveBeenCalled();
});

test('store being updated on blur', async () => {
  const { findByLabelText } = render(FauxSelect, {
    props: {
      store,
      id: 'test_select',
      name: 'test_select',
      label: { text: 'Test Select' },
    },
  });

  const select = await findByLabelText('Test Select');

  userEvent.selectOptions(select, ['NY']);
  await fireEvent.blur(select);

  expect(get(store)).toMatchObject({
    test_select: 'NY',
  });
});

test('path follow to update store on blur', async () => {
  store.set({
    test2: {
      asdf: [{}],
    },
  });

  const { findByLabelText } = render(FauxSelect, {
    props: {
      store,
      path: ['test2', 'asdf', 0],
      id: 'test_select',
      name: 'test_select',
      label: { text: 'Test Select' },
    },
  });

  const select = await findByLabelText('Test Select');

  userEvent.selectOptions(select, ['NY']);
  await fireEvent.blur(select);

  expect(get(store)).toMatchObject({
    test2: {
      asdf: [{ test_select: 'NY' }],
    },
  });
});

test('ensure a11y compliance', async () => {
  store.set({});

  const target = document.createElement('div');

  target.setAttribute('role', 'main');

  const { container } = render(FauxSelect, {
    target: document.body.appendChild(target),
    props: {
      store,
      path: ['test2', 'asdf', 0],
      id: 'test_select',
      name: 'test_select',
      label: { text: 'Test Select' },
    },
  });

  expect(await axe(container)).toHaveNoViolations();
});
