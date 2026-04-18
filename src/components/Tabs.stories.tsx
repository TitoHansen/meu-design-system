import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import Tabs from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'DS/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    defaultIndex: { description: 'Aba ativa inicial', control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

const tabs = [
  { label: 'Visão Geral',   content: <p>Resumo da carteira com posição atual e rentabilidade.</p> },
  { label: 'Histórico',     content: <p>Extrato de operações e movimentações anteriores.</p> },
  { label: 'Documentos',    content: <p>Notas de corretagem e informes de rendimentos.</p> },
]

export const Default: Story = { args: { tabs } }

export const SecondActive: Story = { args: { tabs, defaultIndex: 1 } }

export const ThreeTabs: Story = {
  args: {
    tabs: [
      { label: 'Resumo',     content: <p>Visão consolidada dos seus investimentos.</p> },
      { label: 'Renda Fixa', content: <p>Tesouro Direto, CDB, LCI, LCA e outros.</p> },
      { label: 'Renda Variável', content: <p>Ações, FIIs e ETFs da sua carteira.</p> },
    ],
  },
}
