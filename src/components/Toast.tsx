import { tokens } from '../tokens'

export interface ToastProps {
  message: string
  variant?: 'success' | 'error' | 'warning' | 'info'
  onClose?: () => void
}

const VARIANT_CONFIG: Record<NonNullable<ToastProps['variant']>, { bg: string; border: string; icon: string }> = {
  success: { bg: tokens.cores.successBg, border: tokens.cores.success, icon: '✓' },
  error:   { bg: tokens.cores.errorBg,   border: tokens.cores.error,   icon: '✕' },
  warning: { bg: tokens.cores.warningBg, border: tokens.cores.warning, icon: '!' },
  info:    { bg: tokens.cores.blue100,   border: tokens.cores.actionPrimary, icon: 'i' },
}

const ICON_COLOR: Record<NonNullable<ToastProps['variant']>, string> = {
  success: tokens.cores.success,
  error:   tokens.cores.error,
  warning: tokens.cores.warning,
  info:    tokens.cores.actionPrimary,
}

function Toast({ message, variant = 'info', onClose }: ToastProps) {
  const config = VARIANT_CONFIG[variant]
  const iconColor = ICON_COLOR[variant]

  return (
    <div role="alert" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: tokens.espacamento[3].valor,
      padding: `${tokens.espacamento[3].valor}px ${tokens.espacamento[4].valor}px`,
      borderRadius: tokens.raio.md,
      border: `1px solid ${config.border}`,
      backgroundColor: config.bg,
      fontFamily: tokens.tipografia.familia.primaria,
      fontSize: tokens.tipografia.escala.body.tamanho,
      color: tokens.cores.textDark ?? '#1C274D',
      maxWidth: 400,
      boxShadow: tokens.sombras.dark.md,
    }}>
      {/* Ícone */}
      <span style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: iconColor,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        fontWeight: 700,
        flexShrink: 0,
      }}>
        {config.icon}
      </span>

      <span style={{ flex: 1, lineHeight: tokens.tipografia.escala.body.lineHeight }}>
        {message}
      </span>

      {onClose && (
        <button
          onClick={onClose}
          aria-label="Fechar"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: tokens.cores.textSecondary,
            fontSize: 16,
            lineHeight: 1,
            padding: 0,
            flexShrink: 0,
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}

export default Toast
