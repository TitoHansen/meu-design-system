import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'

const meta: Meta<typeof Card> = {
  title: 'DS/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { description: 'Título principal do card' },
    description: { description: 'Texto descritivo do card' },
    badge: { description: 'Texto do badge (opcional)' },
    badgeVariant: {
      description: 'Cor do badge',
      control: 'select',
      options: ['brand', 'danger', 'success', 'neutral'],
    },
    buttonLabel: { description: 'Texto do botão (opcional)' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    title: 'Título do card',
    description: 'Descrição com mais detalhes sobre o conteúdo deste card.',
    badge: 'Novo',
    badgeVariant: 'brand',
    buttonLabel: 'Saiba mais',
  },
}

export const Danger: Story = {
  args: {
    title: 'Atenção',
    description: 'Algo precisa da sua atenção imediata.',
    badge: 'Urgente',
    badgeVariant: 'danger',
    buttonLabel: 'Resolver',
  },
}

export const SemBadge: Story = {
  args: {
    title: 'Card simples',
    description: 'Um card sem badge e sem botão.',
  },
}