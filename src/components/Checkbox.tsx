import { tokens } from '../tokens'

export interface CheckboxProps {
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

function Checkbox({ label, checked = false, disabled = false, onChange }: CheckboxProps) {
  const borderColor = checked ? tokens.cores.actionPrimary : tokens.cores.border
  const bgColor     = checked ? tokens.cores.actionPrimary : 'transparent'

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
      <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        />
        <span style={{
          width: 18,
          height: 18,
          borderRadius: tokens.raio.xs,
          border: `2px solid ${borderColor}`,
          backgroundColor: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `all ${tokens.motion.duracao.fast}ms ${tokens.motion.easing.standard}`,
          flexShrink: 0,
        }}>
          {checked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke={tokens.cores.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </span>
      {label && <span>{label}</span>}
    </label>
  )
}

export default Checkbox
