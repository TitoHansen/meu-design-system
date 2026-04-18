export const themeVars = {
  '--ds-component-bg':    { light: '#FFFFFF',  dark: '#092640' },
  '--ds-component-text':  { light: '#1C274D',  dark: '#F2F2F2' },
  '--ds-component-muted': { light: '#3A3F4B',  dark: '#8C92A3' },
  '--ds-border':          { light: '#D6DEF5',  dark: '#3A3F4B' },
  '--ds-disabled-bg':     { light: '#F2F2F2',  dark: '#0F1117' },
  '--ds-track-inactive':  { light: '#D6DEF5',  dark: '#3A3F4B' },
} as const

export type ThemeVarName = keyof typeof themeVars
export type Theme = 'light' | 'dark'
