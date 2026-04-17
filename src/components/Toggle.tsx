import { tokens } from '../tokens'

export interface ToggleProps {
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

function Toggle({ label, checked = false, disabled = false, onChange }: ToggleProps) {
  const trackColor = checked ? tokens.cores.actionPrimary : tokens.cores.border
  const thumbPos   = checked ? 22 : 2

  return (
    <label style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: tokens.espacamento[2].valor,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.65 : 1,
      fontFamily: tokens.tipografia.familia.primaria,
      fontSize: tokens.tipografia.escala.body.tamanho,
      color: tokens.cores.textPrimary,
    }}>
      <span style={{ position: 'relative', display: 'inline-block', flexShrink: 0 }}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        />
        {/* Track */}
        <span style={{
          display: 'block',
          width: 44,
          height: 24,
          borderRadius: tokens.raio.full,
          backgroundColor: trackColor,
          transition: `background-color ${tokens.motion.duracao.fast}ms ${tokens.motion.easing.standard}`,
          position: 'relative',
        }}>
          {/* Thumb */}
          <span style={{
            position: 'absolute',
            top: 2,
            left: thumbPos,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: tokens.cores.textPrimary,
            transition: `left ${tokens.motion.duracao.fast}ms ${tokens.motion.easing.standard}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }} />
        </span>
      </span>
      {label && <span>{label}</span>}
    </label>
  )
}

export default Toggle
