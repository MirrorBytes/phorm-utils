import { render } from '@testing-library/svelte';
import { axe, toHaveNoViolations } from 'jest-axe';

import FauxWrapped from './utils/FauxWrapped.svelte';
import Form from '../wrappers/Form.svelte';

expect.extend(toHaveNoViolations);

test('component renders with sections of inputs', () => {
  const { getByText, getByLabelText } = render(Form, {
    props: {
      config: {
        heading: 'Test Form',
        contents: [
          {
            heading: 'Test Section',
            lines: [
              {
                fields: [
                  {
                    props: {
                      id: 'test_input',
                      name: 'test_input',
                      type: 'text',
                      placeholder: 'Test Input',
                      label: { text: 'Test Input', for: 'test_input' },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  });

  expect(() => getByText('Test Form')).not.toThrow();
  expect(() => getByText('Test Section')).not.toThrow();
  expect(() => getByLabelText('Test Input')).not.toThrow();
});

test('component renders custom wrapped sections of inputs', () => {
  const { getByText, getByLabelText, container } = render(Form, {
    props: {
      ContentWrap: FauxWrapped,
      config: {
        heading: 'Test Form',
        contents: [
          {
            heading: 'Test Section',
            lines: [
              {
                fields: [
                  {
                    props: {
                      id: 'test_input',
                      name: 'test_input',
                      type: 'text',
                      placeholder: 'Test Input',
                      label: { text: 'Test Input', for: 'test_input' },
                    },
                  },
                ],
              },
            ],
            classes: 'section',
          },
        ],
      },
    },
  });

  expect(() => getByText('Test Form')).not.toThrow();
  expect(() => getByText('Test Section')).not.toThrow();
  expect(() => getByLabelText('Test Input')).not.toThrow();
  expect(container.querySelectorAll('.content_wrap').length).toBe(1);
  expect(
    container
      .querySelectorAll('.content_wrap')[0]
      .children[0].classList.contains('section'),
  ).toBe(true);
});

test('ensure a11y compliance', async () => {
  const target = document.createElement('div');

  target.setAttribute('role', 'main');

  const { container } = render(Form, {
    target: document.body.appendChild(target),
    props: {
      config: {
        heading: 'Test Form',
        contents: [
          {
            heading: 'Test Section',
            lines: [
              {
                fields: [
                  {
                    props: {
                      id: 'test_input',
                      name: 'test_input',
                      type: 'text',
                      placeholder: 'Test Input',
                      label: { text: 'Test Input', for: 'test_input' },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  });

  expect(await axe(container)).toHaveNoViolations();
});
