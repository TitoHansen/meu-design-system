import { tokens } from '../tokens'

interface InputProps {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{
          fontSize: tokens.fontSizes.sm,
          color: disabled ? tokens.colors.neutral : '#1a1a1a',
          fontFamily: 'Inter, sans-serif',
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
          borderRadius: tokens.radius.md,
          border: `1.5px solid ${disabled ? '#e5e7eb' : '#d1d5db'}`,
          fontSize: tokens.fontSizes.md,
          fontFamily: 'Inter, sans-serif',
          color: disabled ? tokens.colors.neutral : '#1a1a1a',
          backgroundColor: disabled ? '#f9fafb' : 'white',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box' as const,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      />
    </div>
  )
}

export default Input