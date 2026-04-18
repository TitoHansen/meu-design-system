import type { Preview, Decorator } from '@storybook/react'
import React from 'react'
import { tokens } from '../src/tokens'
import { ThemeProvider } from '../src/theme'

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? 'light') as 'light' | 'dark'
  document.body.style.fontFamily = tokens.tipografia.familia.primaria
  return (
    <ThemeProvider defaultTheme={theme}>
      <Story />
    </ThemeProvider>
  )
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Design system theme',
      toolbar: {
        title: 'Tema',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun',  title: 'Light' },
          { value: 'dark',  icon: 'moon', title: 'Dark'  },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'light',
  },

  decorators: [withTheme],

  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: { order: ['Overview', 'DS', 'Components'] },
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
        date:  /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
}

export default preview
