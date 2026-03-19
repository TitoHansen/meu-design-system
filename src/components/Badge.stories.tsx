import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'DS/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Define a cor do badge',
      control: 'select',
      options: ['brand', 'danger', 'success', 'neutral'],
    },
    label: { description: 'Texto exibido no badge' },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Brand: Story = { args: { label: 'Novo', variant: 'brand' } }
export const Danger: Story = { args: { label: 'Erro', variant: 'danger' } }
export const Success: Story = { args: { label: 'Ativo', variant: 'success' } }
export const Neutral: Story = { args: { label: 'Rascunho', variant: 'neutral' } }