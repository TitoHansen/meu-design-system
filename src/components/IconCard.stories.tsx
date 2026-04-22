import type { Meta, StoryObj } from '@storybook/react'
import IconCard from './IconCard'

const meta: Meta<typeof IconCard> = {
  title: 'DS/IconCard',
  component: IconCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Variante de cor do Brand frame',
      control: 'select',
      options: ['brand', 'success', 'warning', 'neutral'],
    },
    label: { description: 'Texto exibido na base do card' },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 32 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof IconCard>

export const Brand: Story = {
  args: { label: 'Carteira', variant: 'brand' },
}

export const Success: Story = {
  args: { label: 'Rendimentos', variant: 'success' },
}

export const Warning: Story = {
  args: { label: 'Alertas', variant: 'warning' },
}

export const Neutral: Story = {
  args: { label: 'Historico', variant: 'neutral' },
}

export const AllVariants: Story = {
  name: 'Todas as variantes',
  render: () => (
    <>
      <IconCard label="Carteira"    variant="brand"   onClick={() => {}} />
      <IconCard label="Rendimentos" variant="success" onClick={() => {}} />
      <IconCard label="Alertas"     variant="warning" onClick={() => {}} />
      <IconCard label="Historico"   variant="neutral" onClick={() => {}} />
    </>
  ),
}

export const Clickable: Story = {
  name: 'Clicavel (com hover)',
  args: {
    label: 'Tesouro Direto',
    variant: 'brand',
    onClick: () => alert('clicou!'),
  },
}
