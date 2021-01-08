import { render } from '@testing-library/svelte';
import { axe, toHaveNoViolations } from 'jest-axe';

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
