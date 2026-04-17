import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'DS/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Define a cor do botão',
      control: 'select',
      options: ['brand', 'danger', 'success', 'warning', 'neutral'],
    },
    label: { description: 'Texto exibido no botão' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Brand: Story = {
  args: { label: 'Brand', variant: 'brand' },
}
export const Danger: Story = {
  args: { label: 'Danger', variant: 'danger' },
}
export const Success: Story = {
  args: { label: 'Success', variant: 'success' },
}
export const Warning: Story = {
  args: { label: 'Warning', variant: 'warning' },
}
export const Neutral: Story = {
  args: { label: 'Neutral', variant: 'neutral' },
}