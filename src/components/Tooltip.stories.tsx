import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import Tooltip from './Tooltip'
import Button from './Button'

const meta: Meta<typeof Tooltip> = {
  title: 'DS/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content:  { description: 'Texto do tooltip' },
    position: { description: 'Posição', control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Top: Story = {
  args: { content: 'Informação adicional', position: 'top' },
  render: (args) => <Tooltip {...args}><Button label="Passe o mouse" /></Tooltip>,
}

export const Bottom: Story = {
  args: { content: 'Tooltip abaixo', position: 'bottom' },
  render: (args) => <Tooltip {...args}><Button label="Passe o mouse" /></Tooltip>,
}

export const Left: Story = {
  args: { content: 'À esquerda', position: 'left' },
  render: (args) => <Tooltip {...args}><Button label="Passe o mouse" /></Tooltip>,
}

export const Right: Story = {
  args: { content: 'À direita', position: 'right' },
  render: (args) => <Tooltip {...args}><Button label="Passe o mouse" /></Tooltip>,
}
