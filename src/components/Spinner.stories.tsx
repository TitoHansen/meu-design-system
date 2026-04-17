import type { Meta, StoryObj } from '@storybook/react'
import Spinner from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'DS/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size:    { description: 'Tamanho do spinner', control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { description: 'Cor do spinner',    control: 'select', options: ['brand', 'white', 'neutral'] },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Brand:   Story = { args: { size: 'md', variant: 'brand' } }
export const Small:   Story = { args: { size: 'sm', variant: 'brand' } }
export const Large:   Story = { args: { size: 'lg', variant: 'brand' } }
export const White: Story = {
  args: { size: 'md', variant: 'white' },
  parameters: { backgrounds: { default: 'dark' } },
}
export const Neutral: Story = { args: { size: 'md', variant: 'neutral' } }
