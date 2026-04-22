// ─── PASSO 1 — Renomeie este arquivo para NomeComp.tsx ───────────
// Substitua todo "Template" pelo nome real do componente.

import { tokens } from '../tokens'

// ── 1. Props ──────────────────────────────────────────────────────
// Liste todas as props que o componente aceita.
// Sempre exporte a interface para que index.ts possa re-exportar o tipo.
export interface TemplateProps {
  label: string
  variant?: 'brand' | 'danger' | 'success' | 'warning' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
}

// ── 2. Mapa de variantes → tokens ────────────────────────────────
// Nunca escreva hex diretamente. Sempre aponte para tokens.cores.*
const VARIANT_COLOR: Record<NonNullable<TemplateProps['variant']>, string> = {
  brand:   tokens.cores.actionPrimary,
  danger:  tokens.cores.error,
  success: tokens.cores.success,
  warning: tokens.cores.warning,
  neutral: tokens.cores.textSecondary,
}

// ── 3. Mapa de tamanhos → tokens ─────────────────────────────────
const SIZE_PADDING: Record<NonNullable<TemplateProps['size']>, string> = {
  sm: `${tokens.espacamento[2].valor}px ${tokens.espacamento[3].valor}px`,
  md: `${tokens.espacamento[3].valor}px ${tokens.espacamento[5].valor}px`,
  lg: `${tokens.espacamento[4].valor}px ${tokens.espacamento[6].valor}px`,
}

const SIZE_FONT: Record<NonNullable<TemplateProps['size']>, number> = {
  sm: tokens.tipografia.escala.caption.tamanho,
  md: tokens.tipografia.escala.body.tamanho,
  lg: tokens.tipografia.escala.bodyLg.tamanho,
}

// ── 4. Componente ────────────────────────────────────────────────
function Template({
  label,
  variant = 'brand',
  size = 'md',
  disabled = false,
  onClick,
}: TemplateProps) {
  return (
    <div
      role="button"
      aria-label={label}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={{
        // Cor vem do mapa de variantes
        backgroundColor: VARIANT_COLOR[variant],
        color: tokens.cores.textPrimary,

        // Espaçamento e forma
        padding: SIZE_PADDING[size],
        borderRadius: tokens.raio.md,
        border: 'none',

        // Tipografia
        fontSize: SIZE_FONT[size],
        fontFamily: tokens.tipografia.familia.primaria,
        fontWeight: 700,

        // Comportamento
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,

        // Área clicável mínima WCAG
        minHeight: 44,
        minWidth: 44,

        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {label}
    </div>
  )
}

export default Template
