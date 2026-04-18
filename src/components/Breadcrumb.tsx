import { tokens } from '../tokens'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: string
}

function Breadcrumb({ items, separator = '/' }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: tokens.espacamento[2].valor,
        listStyle: 'none',
        margin: 0,
        padding: 0,
        fontFamily: tokens.tipografia.familia.primaria,
        fontSize: tokens.tipografia.escala.body.tamanho,
      }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: tokens.espacamento[2].valor }}>
              {isLast ? (
                <span aria-current="page" style={{
                  color: 'var(--ds-component-text)',
                  fontWeight: 700,
                }}>
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href ?? '#'}
                  style={{
                    color: tokens.cores.actionPrimary,
                    textDecoration: 'none',
                    transition: `opacity ${tokens.motion.duracao.fast}ms`,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span style={{
                  color: 'var(--ds-component-muted)',
                  userSelect: 'none' as const,
                }}>
                  {separator}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
