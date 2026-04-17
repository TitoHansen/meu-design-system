import { tokens } from '../tokens'

export interface InputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  disabled?: boolean
  onChange?: (value: string) => void
}

function Input({
  label,
  placeholder = 'Digite aqui...',
  type = 'text',
  disabled = false,
  onChange,
}: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{
          fontSize: tokens.tipografia.escala.body.tamanho,
          fontFamily: tokens.tipografia.familia.primaria,
          color: disabled ? tokens.cores.textSecondary : tokens.cores.textPrimary,
        }}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          padding: '10px 14px',
          borderRadius: tokens.raio.md,
          border: `1.5px solid ${disabled ? tokens.cores.border : tokens.cores.border}`,
          fontSize: tokens.tipografia.escala.bodyLg.tamanho,
          fontFamily: tokens.tipografia.familia.primaria,
          color: disabled ? tokens.cores.textSecondary : tokens.cores.textPrimary,
          backgroundColor: disabled ? tokens.cores.bgSecondary : tokens.cores.surface,
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box' as const,
          cursor: disabled ? 'not-allowed' : 'text',
          opacity: disabled ? 0.65 : 1,
        }}
      />
    </div>
  )
}

export default Input
