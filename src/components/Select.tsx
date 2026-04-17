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
      <select
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          padding: '10px 14px',
          paddingRight: 40,
          borderRadius: tokens.raio.md,
          border: `1.5px solid ${tokens.cores.border}`,
          fontSize: tokens.tipografia.escala.bodyLg.tamanho,
          fontFamily: tokens.tipografia.familia.primaria,
          color: disabled ? tokens.cores.textSecondary : tokens.cores.textPrimary,
          backgroundColor: disabled ? tokens.cores.bgSecondary : tokens.cores.surface,
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box' as const,
          cursor: disabled ? 'not-allowed' : 'pointer',
          appearance: 'none',
          opacity: disabled ? 0.65 : 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238C92A3' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
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
