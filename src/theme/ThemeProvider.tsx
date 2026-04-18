import React, { createContext, useState, useEffect, useCallback } from 'react'
import { themeVars, type Theme } from './themeVars'

export interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
})

function buildStyleContent(): string {
  return (['light', 'dark'] as Theme[]).map((t) => {
    const vars = Object.entries(themeVars)
      .map(([name, values]) => `  ${name}: ${values[t]};`)
      .join('\n')
    return `[data-ds-theme="${t}"] {\n${vars}\n}`
  }).join('\n')
}

// Injeta as CSS vars imediatamente ao carregar o módulo (síncrono)
// Evita flash de bordas/cores no primeiro render
if (typeof document !== 'undefined') {
  const id = 'ds-theme-vars'
  let tag = document.getElementById(id) as HTMLStyleElement | null
  if (!tag) {
    tag = document.createElement('style')
    tag.id = id
    document.head.appendChild(tag)
  }
  tag.textContent = buildStyleContent()
}

interface ThemeProviderProps {
  defaultTheme?: Theme
  children: React.ReactNode
}

export function ThemeProvider({ defaultTheme = 'light', children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const id = 'ds-theme-vars'
    let tag = document.getElementById(id) as HTMLStyleElement | null
    if (!tag) {
      tag = document.createElement('style')
      tag.id = id
      document.head.appendChild(tag)
    }
    tag.textContent = buildStyleContent()
  }, [])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const toggleTheme = useCallback(() => setThemeState((p) => (p === 'light' ? 'dark' : 'light')), [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div data-ds-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
