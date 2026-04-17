import type { Meta, StoryObj } from '@storybook/react'
import Checkbox from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'DS/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label:    { description: 'Texto ao lado do checkbox' },
    checked:  { description: 'Estado marcado', control: 'boolean' },
    disabled: { description: 'Estado desabilitado', control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default:  Story = { args: { label: 'Aceitar termos de uso', checked: false } }
export const Checked:  Story = { args: { label: 'Aceitar termos de uso', checked: true } }
export const Disabled: Story = { args: { label: 'Campo desabilitado',    checked: false, disabled: true } }
export const DisabledChecked: Story = { args: { label: 'Desabilitado marcado', checked: true, disabled: true } }
