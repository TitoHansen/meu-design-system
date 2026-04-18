import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import Modal from './Modal'
import Button from './Button'

const meta: Meta<typeof Modal> = {
  title: 'DS/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    open:  { description: 'Controla visibilidade' },
    title: { description: 'Título do modal' },
    size:  { description: 'Tamanho', control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

function ModalDemo(props: { title: string; size?: 'sm' | 'md' | 'lg'; content?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button label="Abrir Modal" onClick={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)} title={props.title} size={props.size}>
        <p>{props.content ?? 'Conteúdo do modal. Adicione formulários, textos ou ações aqui.'}</p>
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: () => <ModalDemo title="Título do Modal" />,
}

export const Small: Story = {
  render: () => <ModalDemo title="Modal Pequeno" size="sm" content="Modal compacto para confirmações." />,
}

export const Large: Story = {
  render: () => <ModalDemo title="Modal Grande" size="lg" content="Modal espaçoso para formulários complexos ou visualizações de conteúdo." />,
}
