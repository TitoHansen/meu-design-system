import { tokens } from '../tokens'

export interface AvatarProps {
  name?: string
  src?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'brand' | 'success' | 'neutral'
}

const SIZE_PX: Record<NonNullable<AvatarProps['size']>, number> = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72,
}

const FONT_SIZE: Record<NonNullable<AvatarProps['size']>, number> = {
  sm: 12,
  md: 14,
  lg: 20,
  xl: 26,
}

const VARIANT_BG: Record<NonNullable<AvatarProps['variant']>, string> = {
  brand:   tokens.cores.actionPrimary,
  success: tokens.cores.success,
  neutral: tokens.cores.textSecondary,
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function Avatar({ name, src, size = 'md', variant = 'brand' }: AvatarProps) {
  const px = SIZE_PX[size]
  const fs = FONT_SIZE[size]
  const bg = VARIANT_BG[variant]

  const base: React.CSSProperties = {
    width: px,
    height: px,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  }

  if (src) {
    return (
      <span style={base}>
        <img src={src} alt={name ?? 'avatar'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </span>
    )
  }

  return (
    <span style={{ ...base, backgroundColor: bg }}>
      <span style={{
        fontFamily: tokens.tipografia.familia.primaria,
        fontSize: fs,
        fontWeight: 700,
        color: tokens.cores.textPrimary,
        lineHeight: 1,
        userSelect: 'none',
      }}>
        {name ? getInitials(name) : '?'}
      </span>
    </span>
  )
}

export default Avatar
