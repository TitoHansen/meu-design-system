import { tokens } from '../tokens'

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'brand' | 'white' | 'neutral'
}

const SIZE_PX: Record<NonNullable<SpinnerProps['size']>, number> = {
  sm: 16,
  md: 24,
  lg: 40,
}

const VARIANT_COLOR: Record<NonNullable<SpinnerProps['variant']>, string> = {
  brand:   tokens.cores.actionPrimary,
  white:   tokens.cores.textPrimary,
  neutral: tokens.cores.textSecondary,
}

const KEYFRAMES = `
@keyframes ds-spin {
  to { transform: rotate(360deg); }
}
`

function Spinner({ size = 'md', variant = 'brand' }: SpinnerProps) {
  const px = SIZE_PX[size]
  const color = VARIANT_COLOR[variant]
  const thickness = size === 'sm' ? 2 : size === 'lg' ? 4 : 3

  return (
    <>
      <style>{KEYFRAMES}</style>
      <span
        role="status"
        aria-label="Carregando"
        style={{
          display: 'inline-block',
          width: px,
          height: px,
          borderRadius: '50%',
          border: `${thickness}px solid ${color}20`,
          borderTopColor: color,
          animation: `ds-spin ${tokens.motion.duracao.normal}ms ${tokens.motion.easing.standard} infinite`,
          flexShrink: 0,
        }}
      />
    </>
  )
}

export default Spinner
