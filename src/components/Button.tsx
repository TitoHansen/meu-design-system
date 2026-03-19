import { tokens } from '../tokens'

interface ButtonProps {
  label: string
  variant?: 'brand' | 'danger' | 'success' | 'neutral'
  onClick?: () => void
}

function Button({ label, variant = 'brand', onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: tokens.colors[variant],
        color: '#f5f5f5',
        padding: '10px 20px',
        borderRadius: tokens.radius.lg,
        border: 'none',
        fontSize: tokens.fontSizes.sm,
        fontFamily: 'Inter, sans-serif',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

export default Button