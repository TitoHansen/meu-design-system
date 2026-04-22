// ─── PASSO 2 — Renomeie para NomeComp.stories.tsx ────────────────
// Uma story por variante/estado relevante.
// Todo componente precisa de story antes de ser aprovado.

import type { Meta, StoryObj } from '@storybook/react'
import Template from './_Template'

// ── Meta ─────────────────────────────────────────────────────────
const meta: Meta<typeof Template> = {
  title: 'DS/Template',           // <- altere para 'DS/NomeComp'
  component: Template,
  tags: ['autodocs'],             // gera página de docs automática
  argTypes: {
    variant: {
      description: 'Paleta de cor do componente',
      control: 'select',
      options: ['brand', 'danger', 'success', 'warning', 'neutral'],
    },
    size: {
      description: 'Tamanho do componente',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label:    { description: 'Texto exibido' },
    disabled: { description: 'Desabilita interação' },
  },
}

export default meta
type Story = StoryObj<typeof Template>

// ── Stories de variante ───────────────────────────────────────────
export const Brand: Story = {
  args: { label: 'Brand', variant: 'brand' },
}
export const Danger: Story = {
  args: { label: 'Danger', variant: 'danger' },
}
export const Success: Story = {
  args: { label: 'Success', variant: 'success' },
}
export const Warning: Story = {
  args: { label: 'Warning', variant: 'warning' },
}
export const Neutral: Story = {
  args: { label: 'Neutral', variant: 'neutral' },
}

// ── Stories de tamanho ────────────────────────────────────────────
export const Small: Story = {
  args: { label: 'Small', size: 'sm' },
}
export const Large: Story = {
  args: { label: 'Large', size: 'lg' },
}

// ── Stories de estado ─────────────────────────────────────────────
export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
}

// ── Story de todas as variantes juntas ────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {(['brand', 'danger', 'success', 'warning', 'neutral'] as const).map(v => (
        <Template key={v} label={v} variant={v} />
      ))}
    </div>
  ),
}
