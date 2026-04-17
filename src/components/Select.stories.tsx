import type { Meta, StoryObj } from '@storybook/react'
import Select from './Select'

const meta: Meta<typeof Select> = {
  title: 'DS/Select',
  component: Select,
  args: {
    options: ['Opção 1', 'Opção 2', 'Opção 3'],
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    label: 'Categoria',
    placeholder: 'Selecione...',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Campo bloqueado',
    placeholder: 'Indisponível',
    disabled: true,
  },
}
