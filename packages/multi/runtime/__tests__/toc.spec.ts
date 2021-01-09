import { render } from '@testing-library/svelte';
import { axe, toHaveNoViolations } from 'jest-axe';

import FauxToC from './utils/FauxToC.svelte';
import ToC from '../organization/ToC.svelte';

expect.extend(toHaveNoViolations);

test('component renders with all headings from IndexableJsonValue', () => {
  const { getByText, getAllByText } = render(FauxToC);

  expect(() => getByText('Test Form')).not.toThrow();
  expect(() => getAllByText('Test Step 1')).not.toThrow();
  expect(() => getByText('Test Step 2')).not.toThrow();
  expect(() => getByText('Test Step 3')).not.toThrow();
});

test('component renders with all headings from Step array', () => {
  const { getByText, getAllByText } = render(ToC, {
    props: {
      formName: 'Test Form',
      steps: [
        {
          heading: 'Test Step 1',
          sections: [
            {
              heading: 'Test Section 1',
              lines: [
                {
                  fields: [
                    {
                      props: {
                        id: 'test_input',
                        name: 'test_input',
                        type: 'text',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          heading: 'Test Step 2',
          sections: [
            {
              heading: 'Test Section 2',
              lines: [
                {
                  fields: [
                    {
                      props: {
                        id: 'test_input_2',
                        name: 'test_input_2',
                        type: 'text',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          heading: 'Test Step 3',
          sections: [
            {
              heading: 'Test Section 3',
              lines: [
                {
                  fields: [
                    {
                      props: {
                        id: 'test_input_3',
                        name: 'test_input_3',
                        type: 'text',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  });

  expect(() => getByText('Test Form')).not.toThrow();
  expect(() => getAllByText('Test Step 1')).not.toThrow();
  expect(() => getByText('Test Section 1')).not.toThrow();
  expect(() => getByText('Test Step 2')).not.toThrow();
  expect(() => getByText('Test Section 2')).not.toThrow();
  expect(() => getByText('Test Step 3')).not.toThrow();
  expect(() => getByText('Test Section 3')).not.toThrow();
});

test('ensure a11y compliance', async () => {
  const target = document.createElement('div');

  target.setAttribute('role', 'main');

  const { container } = render(FauxToC, {
    target: document.body.appendChild(target),
  });

  expect(await axe(container)).toHaveNoViolations();
});
