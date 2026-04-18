import { tokens } from '../tokens'

export interface TableColumn {
  key: string
  header: string
  width?: number
}

export interface TableProps {
  columns: TableColumn[]
  rows: Record<string, string | number>[]
  caption?: string
  striped?: boolean
}

function Table({ columns, rows, caption, striped = false }: TableProps) {
  return (
    <div style={{
      width: '100%',
      overflowX: 'auto',
      borderRadius: tokens.raio.lg,
      border: '1px solid var(--ds-border)',
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: tokens.tipografia.familia.primaria,
        fontSize: tokens.tipografia.escala.body.tamanho,
      }}>
        {caption && (
          <caption style={{
            padding: `${tokens.espacamento[3].valor}px ${tokens.espacamento[4].valor}px`,
            color: 'var(--ds-component-muted)',
            fontSize: tokens.tipografia.escala.caption.tamanho,
            textAlign: 'left',
            captionSide: 'top' as const,
          }}>{caption}</caption>
        )}
        <thead>
          <tr style={{ borderBottom: '2px solid var(--ds-border)' }}>
            {columns.map((col) => (
              <th key={col.key} style={{
                padding: `${tokens.espacamento[3].valor}px ${tokens.espacamento[4].valor}px`,
                textAlign: 'left',
                fontWeight: 700,
                color: 'var(--ds-component-text)',
                backgroundColor: 'var(--ds-component-bg)',
                width: col.width,
                whiteSpace: 'nowrap' as const,
              }}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{
              borderBottom: i < rows.length - 1 ? '1px solid var(--ds-border)' : 'none',
              backgroundColor: striped && i % 2 === 1
                ? 'var(--ds-disabled-bg)'
                : 'var(--ds-component-bg)',
            }}>
              {columns.map((col) => (
                <td key={col.key} style={{
                  padding: `${tokens.espacamento[3].valor}px ${tokens.espacamento[4].valor}px`,
                  color: 'var(--ds-component-text)',
                }}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
