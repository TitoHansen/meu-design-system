// Componentes
export { default as Button }   from './components/Button'
export { default as Badge }    from './components/Badge'
export { default as Card }     from './components/Card'
export { default as Input }    from './components/Input'
export { default as Select }   from './components/Select'
export { default as Spinner }  from './components/Spinner'
export { default as Checkbox } from './components/Checkbox'
export { default as Toggle }   from './components/Toggle'
export { default as Toast }    from './components/Toast'
export { default as Avatar }   from './components/Avatar'

// Tipos de props
export type { ButtonProps }   from './components/Button'
export type { BadgeProps }    from './components/Badge'
export type { CardProps }     from './components/Card'
export type { InputProps }    from './components/Input'
export type { SelectProps }   from './components/Select'
export type { SpinnerProps }  from './components/Spinner'
export type { CheckboxProps } from './components/Checkbox'
export type { ToggleProps }   from './components/Toggle'
export type { ToastProps }    from './components/Toast'
export type { AvatarProps }   from './components/Avatar'

// Tokens — fonte da verdade
export { tokens, cssVars, tokens_legado } from './tokens'

// Tema
export { ThemeProvider, ThemeContext, useTheme } from './theme'
export type { Theme, ThemeContextValue } from './theme'
