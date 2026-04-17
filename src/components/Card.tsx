import { tokens } from '../tokens'
import Badge from './Badge'
import Button from './Button'

export interface CardProps {
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
      border: `1px solid ${tokens.cores.border}`,
      borderRadius: tokens.raio.lg,
      padding: tokens.espacamento[6].valor,
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.espacamento[3].valor,
      backgroundColor: tokens.cores.surface,
      maxWidth: 320,
    }}>
      {badge && <Badge label={badge} variant={badgeVariant} />}

      <h3 style={{
        margin: 0,
        fontSize: tokens.tipografia.escala.h4.tamanho,
        fontWeight: tokens.tipografia.escala.h4.peso,
        lineHeight: tokens.tipografia.escala.h4.lineHeight,
        fontFamily: tokens.tipografia.familia.primaria,
        color: tokens.cores.textPrimary,
      }}>
        {title}
      </h3>

      <p style={{
        margin: 0,
        fontSize: tokens.tipografia.escala.body.tamanho,
        fontFamily: tokens.tipografia.familia.primaria,
        color: tokens.cores.textSecondary,
        lineHeight: tokens.tipografia.escala.body.lineHeight,
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
