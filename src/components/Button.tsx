import { tokens } from '../tokens'

export interface ButtonProps {
  label: string
  variant?: 'brand' | 'danger' | 'success' | 'warning' | 'neutral'
  onClick?: () => void
}

const VARIANT_COLOR: Record<NonNullable<ButtonProps['variant']>, string> = {
  brand:   tokens.cores.actionPrimary,
  danger:  tokens.cores.error,
  success: tokens.cores.success,
  warning: tokens.cores.warning,
  neutral: tokens.cores.textSecondary,
}

function Button({ label, variant = 'brand', onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: VARIANT_COLOR[variant],
        color: tokens.cores.textPrimary,
        padding: `${tokens.espacamento[3].valor}px ${tokens.espacamento[5].valor}px`,
        borderRadius: tokens.raio.md,
        border: 'none',
        fontSize: tokens.tipografia.escala.body.tamanho,
        fontFamily: tokens.tipografia.familia.primaria,
        fontWeight: 700,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        minWidth: 88,
        minHeight: 40,
      }}
    >
      {label}
    </button>
  )
}

export default Button
