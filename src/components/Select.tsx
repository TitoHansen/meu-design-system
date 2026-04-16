import { tokens } from '../tokens'

interface SelectProps {
  label?: string
  placeholder?: string
  options?: string[]
  disabled?: boolean
  onChange?: (value: string) => void
}

function Select({
  label,
  placeholder = 'Selecione...',
  options = [],
  disabled = false,
  onChange,
}: SelectProps) {
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
      <select
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          padding: '10px 14px',
          paddingRight: '40px',
          borderRadius: tokens.radius.md,
          border: `1.5px solid ${disabled ? '#e5e7eb' : '#d1d5db'}`,
          fontSize: tokens.fontSizes.md,
          fontFamily: 'Inter, sans-serif',
          color: disabled ? tokens.colors.neutral : '#1a1a1a',
          backgroundColor: disabled ? '#f9fafb' : 'white',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box' as const,
          cursor: disabled ? 'not-allowed' : 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
