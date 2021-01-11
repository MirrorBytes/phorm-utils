import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import type { IndexableJsonValue } from '../types';

import Textarea from '../controls/Textarea.svelte';

expect.extend(toHaveNoViolations);

const store: Writable<IndexableJsonValue> = writable({});

test('component rendered with name and label', () => {
  const { getByLabelText } = render(Textarea, {
    props: {
      store,
      id: 'test_text',
      name: 'test_text',
      placeholder: 'Test Text',
      label: { text: 'Test Text' },
    },
  });

  expect(() => getByLabelText('Test Text')).not.toThrow();
  expect(
    getByLabelText('Test Text').attributes.getNamedItem('name')?.value,
  ).toBe('test_text');
});

test('input function being called properly', async () => {
  const { findByLabelText, component } = render(Textarea, {
    props: {
      store,
      id: 'test_text',
      name: 'test_text',
      placeholder: 'Test Text',
      label: { text: 'Test Text' },
    },
  });

  const text = await findByLabelText('Test Text');

  const mock = jest.fn();
  component.$on('input', mock);

  userEvent.type(text, 'asdf');

  expect(mock).toHaveBeenCalledTimes(4);
});

test('store being updated on input', async () => {
  store.set({});

  const { findByLabelText } = render(Textarea, {
    props: {
      store,
      id: 'test_text',
      name: 'test_text',
      placeholder: 'Test Text',
      label: { text: 'Test Text' },
    },
  });

  const text = await findByLabelText('Test Text');

  userEvent.type(text, 'asdf');

  expect(get(store)).toMatchObject({
    test_text: 'asdf',
  });
});

test('path follow to update store on input', async () => {
  store.set({
    test2: {
      asdf: [{}],
    },
  });

  const { findByLabelText } = render(Textarea, {
    props: {
      store,
      path: ['test2', 'asdf', 0],
      id: 'test_text',
      name: 'test_text',
      placeholder: 'Test Text',
      label: { text: 'Test Text' },
    },
  });

  const text = await findByLabelText('Test Text');

  userEvent.type(text, 'asdf');

  expect(get(store)).toMatchObject({
    test2: {
      asdf: [{ test_text: 'asdf' }],
    },
  });
});

test('ensure a11y compliance', async () => {
  store.set({});

  const target = document.createElement('div');

  target.setAttribute('role', 'main');

  const { container } = render(Textarea, {
    target: document.body.appendChild(target),
    props: {
      store,
      path: ['test2', 'asdf', 0],
      id: 'test_text',
      name: 'test_text',
      placeholder: 'Test Text',
      label: { text: 'Test Text' },
    },
  });

  expect(await axe(container)).toHaveNoViolations();
});
