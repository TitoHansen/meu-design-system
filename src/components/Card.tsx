import { tokens } from '../tokens'
import Badge from './Badge'
import Button from './Button'

interface CardProps {
  title: string
  description: string
  badge?: string
  badgeVariant?: 'brand' | 'danger' | 'success' | 'neutral'
  buttonLabel?: string
  onButtonClick?: () => void
}

function Card({
  title,
  description,
  badge,
  badgeVariant = 'brand',
  buttonLabel,
  onButtonClick,
}: CardProps) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: tokens.radius.lg,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      backgroundColor: 'white',
      maxWidth: '320px',
    }}>
      {badge && <Badge label={badge} variant={badgeVariant} />}

      <h3 style={{
        margin: 0,
        fontSize: tokens.fontSizes.lg,
        fontFamily: 'Inter, sans-serif',
        color: '#1a1a1a',
      }}>
        {title}
      </h3>

      <p style={{
        margin: 0,
        fontSize: tokens.fontSizes.sm,
        fontFamily: 'Inter, sans-serif',
        color: tokens.colors.neutral,
        lineHeight: '1.5',
      }}>
        {description}
      </p>

      {buttonLabel && (
        <Button label={buttonLabel} onClick={onButtonClick} />
      )}
    </div>
  )
}

export default Card