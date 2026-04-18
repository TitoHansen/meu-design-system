import type { Meta, StoryObj } from '@storybook/react'
import Table from './Table'

const meta: Meta<typeof Table> = {
  title: 'DS/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    striped: { description: 'Linhas alternadas', control: 'boolean' },
    caption: { description: 'Legenda da tabela' },
  },
}

export default meta
type Story = StoryObj<typeof Table>

const columns = [
  { key: 'nome',   header: 'Nome' },
  { key: 'tipo',   header: 'Tipo' },
  { key: 'valor',  header: 'Valor' },
  { key: 'status', header: 'Status' },
]

const rows = [
  { nome: 'Tesouro Selic 2029',    tipo: 'Pós-fixado', valor: 'R$ 1.200,00', status: 'Ativo' },
  { nome: 'Tesouro IPCA+ 2035',    tipo: 'Híbrido',    valor: 'R$ 3.500,00', status: 'Ativo' },
  { nome: 'Tesouro Prefixado 2027', tipo: 'Prefixado',  valor: 'R$ 800,00',  status: 'Vencido' },
  { nome: 'Tesouro IPCA+ 2045',    tipo: 'Híbrido',    valor: 'R$ 5.000,00', status: 'Ativo' },
]

export const Default: Story = { args: { columns, rows } }

export const Striped: Story = { args: { columns, rows, striped: true } }

export const WithCaption: Story = {
  args: { columns, rows, caption: 'Posição atual da carteira — atualizada em 17/04/2026' },
}
