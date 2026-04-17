import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: ['Overview', 'DS', 'Components'],
      },
    },

    backgrounds: {
      default: 'light',
      values: [
        { name: 'light',   value: '#FFFFFF' },
        { name: 'surface', value: '#F2F2F2' },
        { name: 'dark',    value: '#08090D' },
      ],
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
