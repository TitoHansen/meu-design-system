import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'DS/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'Tipo do campo',
      control: 'select',
      options: ['text', 'email', 'password'],
    },
    disabled: { description: 'Desabilita o campo' },
    label: { description: 'Rótulo exibido acima do campo' },
    placeholder: { description: 'Texto de exemplo dentro do campo' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { label: 'Email', placeholder: 'seu@email.com' },
}
export const Password: Story = {
  args: { label: 'Senha', placeholder: '••••••••', type: 'password' },
}
export const Disabled: Story = {
  args: { label: 'Desabilitado', placeholder: 'Não editável', disabled: true },
}