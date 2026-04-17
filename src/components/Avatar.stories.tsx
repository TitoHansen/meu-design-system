import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'DS/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    name:    { description: 'Nome completo — gera iniciais' },
    src:     { description: 'URL da imagem (opcional)' },
    size:    { description: 'Tamanho', control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    variant: { description: 'Cor de fundo (sem imagem)', control: 'select', options: ['brand', 'success', 'neutral'] },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Initials:     Story = { args: { name: 'Tito Hansen', size: 'md', variant: 'brand' } }
export const Small:        Story = { args: { name: 'Ana Lima',    size: 'sm' } }
export const Large:        Story = { args: { name: 'Carlos Melo', size: 'lg', variant: 'success' } }
export const ExtraLarge:   Story = { args: { name: 'Maria Silva', size: 'xl', variant: 'neutral' } }
export const SingleName:   Story = { args: { name: 'Tito',        size: 'md' } }
