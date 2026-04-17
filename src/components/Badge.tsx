import { tokens } from '../tokens'

export interface BadgeProps {
  label: string
  variant?: 'brand' | 'danger' | 'success' | 'warning' | 'neutral'
}

const VARIANT_COLOR: Record<NonNullable<BadgeProps['variant']>, string> = {
  brand:   tokens.cores.actionPrimary,
  danger:  tokens.cores.error,
  success: tokens.cores.success,
  warning: tokens.cores.warning,
  neutral: tokens.cores.textSecondary,
}

function Badge({ label, variant = 'brand' }: BadgeProps) {
  const color = VARIANT_COLOR[variant]
  return (
    <span style={{
      backgroundColor: color + '20',
      color: color,
      padding: '4px 10px',
      borderRadius: tokens.raio.full,
      fontSize: tokens.tipografia.escala.body.tamanho,
      fontFamily: tokens.tipografia.familia.primaria,
      fontWeight: 600,
      display: 'inline-block',
    }}>
      {label}
    </span>
  )
}

export default Badge
