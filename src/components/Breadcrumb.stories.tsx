import type { Meta, StoryObj } from '@storybook/react'
import Breadcrumb from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'DS/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    separator: { description: 'Separador entre itens', control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Início',       href: '/' },
      { label: 'Carteira',     href: '/carteira' },
      { label: 'Tesouro Direto' },
    ],
  },
}

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Início',   href: '/' },
      { label: 'Relatórios' },
    ],
  },
}

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Início',      href: '/' },
      { label: 'Produtos',    href: '/produtos' },
      { label: 'Renda Fixa',  href: '/produtos/renda-fixa' },
      { label: 'Tesouro IPCA+' },
    ],
    separator: '›',
  },
}
