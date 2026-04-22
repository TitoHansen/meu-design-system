import { tokens } from '../tokens'

export type IconCardVariant = 'brand' | 'success' | 'warning' | 'neutral'

export interface IconCardProps {
  /** Texto exibido na base do card */
  label: string
  /** Variante de cor do ícone (Brand frame) */
  variant?: IconCardVariant
  /** Ícone React a ser exibido dentro do Brand frame (opcional) */
  icon?: React.ReactNode
  /** Callback ao clicar no card */
  onClick?: () => void
}

const VARIANT_COLOR: Record<IconCardVariant, string> = {
  brand:   tokens.cores.actionPrimary,
  success: tokens.cores.brandGreen,
  warning: tokens.cores.warning,
  neutral: tokens.cores.textSecondary,
}

/** Ícone padrão: hamburguer (3 barras) em SVG */
function DefaultIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4"  width="18" height="2" rx="1" fill="white" />
      <rect x="4" y="10" width="14" height="2" rx="1" fill="white" />
      <rect x="2" y="16" width="18" height="2" rx="1" fill="white" />
    </svg>
  )
}

function IconCard({
  label,
  variant = 'brand',
  icon,
  onClick,
}: IconCardProps) {
  const iconBg = VARIANT_COLOR[variant]

  return (
    <div
      onClick={onClick}
      style={{
        width:           150,
        height:          150,
        backgroundColor: tokens.cores.disabledBg,   // #F2F2F2
        borderRadius:    tokens.raio.xl,             // 16px
        padding:         tokens.espacamento[4].valor, // 16px
        display:         'flex',
        flexDirection:   'column',
        justifyContent:  'space-between',
        alignItems:      'flex-start',
        boxSizing:       'border-box',
        cursor:          onClick ? 'pointer' : 'default',
        boxShadow:       '0 1px 2px rgba(0,0,0,.15), 0 1px 1px rgba(0,0,0,.10)',
        transition:      'box-shadow .15s, transform .1s',
        flexShrink:      0,
      }}
      onMouseEnter={e => {
        if (onClick) {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,.15)'
          ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'
        }
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 2px rgba(0,0,0,.15), 0 1px 1px rgba(0,0,0,.10)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'none'
      }}
    >
      {/* Brand frame — 32×32, radius 8, bg colorido */}
      <div style={{
        width:           32,
        height:          32,
        borderRadius:    tokens.raio.sm,   // 8px
        backgroundColor: iconBg,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        flexShrink:      0,
      }}>
        {icon ?? <DefaultIcon />}
      </div>

      {/* label medium container — FILL, alinhado à esquerda */}
      <div style={{
        width:      '100%',
        display:    'flex',
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily:  tokens.tipografia.familia.primaria,
          fontSize:    16,
          fontWeight:  700,
          lineHeight:  '24px',
          color:       tokens.cores.componentMuted,  // #3A3F4B
          margin:      0,
        }}>
          {label}
        </span>
      </div>
    </div>
  )
}

export default IconCard
