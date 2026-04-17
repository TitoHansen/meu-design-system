import type { Meta, StoryObj } from '@storybook/react'
import Toggle from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'DS/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    label:    { description: 'Texto ao lado do toggle' },
    checked:  { description: 'Estado ativado', control: 'boolean' },
    disabled: { description: 'Estado desabilitado', control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Off:      Story = { args: { label: 'Notificações',     checked: false } }
export const On:       Story = { args: { label: 'Notificações',     checked: true } }
export const Disabled: Story = { args: { label: 'Campo bloqueado',  checked: false, disabled: true } }
