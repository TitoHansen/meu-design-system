import type { Meta, StoryObj } from '@storybook/react'
import Toast from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'DS/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    message: { description: 'Texto da mensagem' },
    variant: { description: 'Tipo de feedback', control: 'select', options: ['success', 'error', 'warning', 'info'] },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Success: Story = { args: { message: 'Operação realizada com sucesso!', variant: 'success' } }
export const Error:   Story = { args: { message: 'Ocorreu um erro. Tente novamente.', variant: 'error' } }
export const Warning: Story = { args: { message: 'Atenção: esta ação não pode ser desfeita.', variant: 'warning' } }
export const Info:    Story = { args: { message: 'Seu relatório está sendo processado.', variant: 'info' } }
export const WithClose: Story = {
  args: { message: 'Operação realizada com sucesso!', variant: 'success', onClose: () => {} },
}
