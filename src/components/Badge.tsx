import { tokens } from '../tokens'

interface BadgeProps {
  label: string
  variant?: 'brand' | 'danger' | 'success' | 'neutral'
}

function Badge({ label, variant = 'brand' }: BadgeProps) {
  return (
    <span style={{
      backgroundColor: tokens.colors[variant] + '20',
      color: tokens.colors[variant],
      padding: '4px 10px',
      borderRadius: tokens.radius.lg,
      fontSize: tokens.fontSizes.sm,
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      display: 'inline-block',
    }}>
      {label}
    </span>
  )
}

export default Badge