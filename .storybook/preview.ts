import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: ['Overview', 'DS', 'Components'],
      },
    },

    // Canvas usa fundo escuro por padrão (sistema dark-first)
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',    value: '#08090D' }, // --color-bg-primary
        { name: 'surface', value: '#092640' }, // --color-surface
        { name: 'light',   value: '#FFFFFF' }, // referência light
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
