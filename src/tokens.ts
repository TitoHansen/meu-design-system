// src/tokens.ts
// Fonte da verdade — espelhado fielmente do Color System (anexos)
// Fonte primária: Mulish | Mono: DM Mono

export const tokens = {
  versao: '2.0.0',
  ultimaAtualizacao: '2026-04-17',

  // ─── PRIMITIVOS ──────────────────────────────────────────────────
  // Paleta bruta — nunca usar diretamente nos componentes, usar semânticos
  primitivos: {
    blue: {
      900: '#1C274D',
      700: '#2C3D73', // primary
      500: '#4A5FA3', // hover
      300: '#7F93D9',
      100: '#D6DEF5',
    },
    green: {
      900: '#174B1F',
      700: '#24732F', // primary / identidade
      500: '#3FAF4F',
      300: '#7DDB8A',
      100: '#D9F5DD',
    },
    neutral: {
      900: '#08090D', // fundo primário
      800: '#0F1117', // fundo secundário
      700: '#092640', // superfícies / cards
      500: '#3A3F4B', // bordas / divisores
      300: '#8C92A3', // texto secundário
      100: '#F2F2F2', // texto primário (em fundos escuros)
    },
  },

  // ─── TOKENS SEMÂNTICOS ───────────────────────────────────────────
  // Alias — o que os componentes devem usar
  cores: {
    // Fundos
    bgPrimary:      '#08090D', // --color-bg-primary
    bgSecondary:    '#0F1117', // --color-bg-secondary
    surface:        '#092640', // --color-surface (cards, containers)

    // Texto
    textPrimary:    '#F2F2F2', // --color-text-primary
    textSecondary:  '#8C92A3', // --color-text-secondary

    // Ação (Azul = Ação e Interação)
    actionPrimary:  '#2C3D73', // --color-action-primary
    actionHover:    '#4A5FA3', // --color-action-hover

    // Borda
    border:         '#3A3F4B', // --color-border-default

    // Brand (Verde = Identidade)
    brandGreen:     '#24732F', // --color-brand-green

    // Semânticos
    success:        '#3FAF4F', // --color-success
    successBg:      '#D9F5DD', // --color-success-bg
    error:          '#D64545', // --color-error
    errorBg:        '#FDECEC', // --color-error-bg
    warning:        '#E6A23C', // --color-warning
    warningBg:      '#FFF4E5', // --color-warning-bg

    // Componentes (light-mode — inputs, cards, surfaces claras)
    white:          '#FFFFFF',
    componentBg:    '#FFFFFF', // fundo de inputs, selects, cards
    componentText:  '#1C274D', // texto escuro sobre fundo claro
    componentMuted: '#3A3F4B', // texto secundário sobre fundo claro
    borderLight:    '#D6DEF5', // borda suave sobre fundo claro
    disabledBg:     '#F2F2F2', // fundo desabilitado
  },

  // ─── TIPOGRAFIA ──────────────────────────────────────────────────
  tipografia: {
    familia: {
      primaria: 'Mulish',  // headings, body, labels
      mono:     'DM Mono', // código, captions técnicas
    },
    escala: {
      display:  { tamanho: 48, peso: 800, lineHeight: 1.1  }, // hero, highlights
      h1:       { tamanho: 36, peso: 700, lineHeight: 1.2  }, // page titles
      h2:       { tamanho: 28, peso: 700, lineHeight: 1.25 }, // section titles
      h3:       { tamanho: 22, peso: 600, lineHeight: 1.3  }, // subsections
      h4:       { tamanho: 18, peso: 600, lineHeight: 1.4  }, // small headings
      bodyLg:   { tamanho: 16, peso: 400, lineHeight: 1.6  }, // primary text
      body:     { tamanho: 14, peso: 400, lineHeight: 1.6  }, // secondary text
      caption:  { tamanho: 12, peso: 400, lineHeight: 1.5  }, // metadata
      mono:     { tamanho: 13, peso: 400, lineHeight: 1.5  }, // code (DM Mono)
    },
  },

  // ─── ESPAÇAMENTO ─────────────────────────────────────────────────
  // Base: 4px. Todos os valores são múltiplos de 4.
  espacamento: {
    1:  { valor: 4,  uso: 'Gap extra mínusculo, padding mínimo' },
    2:  { valor: 8,  uso: 'Gap curto, espaçamento mínimo entre itens' },
    3:  { valor: 12, uso: 'Padding interno de botões compactos' },
    4:  { valor: 16, uso: 'Padding padrão de componentes, gap entre itens de lista' },
    5:  { valor: 20, uso: 'Padding lateral de componentes (ex: botão)' },
    6:  { valor: 24, uso: 'Espaçamento entre grupos de conteúdo' },
    8:  { valor: 32, uso: 'Separação entre seções' },
    10: { valor: 40, uso: 'Padding do conteúdo de seções' },
    12: { valor: 48, uso: 'Padding do conteúdo principal (container)' },
    16: { valor: 64, uso: 'Padding de página (topo)' },
  },

  // ─── BORDER RADIUS ───────────────────────────────────────────────
  // Uso recomendado:
  // --radius-md → botões e inputs
  // --radius-lg → cards e panels
  // --radius-full → badges e chips
  raio: {
    none:  0,
    xs:    2,    // --radius-xs
    sm:    4,    // --radius-sm
    md:    8,    // --radius-md (botões, inputs)
    lg:    12,   // --radius-lg (cards, panels)
    xl:    16,   // --radius-xl
    '2xl': 24,   // --radius-2xl
    full:  9999, // --radius-full (badges, chips)
  },

  // ─── SOMBRAS ─────────────────────────────────────────────────────
  // Dark-first: opacidade baixa para evitar efeito "glow"
  // Uso: sm → inputs/buttons | md → cards | lg → dropdowns | xl → modais
  sombras: {
    dark: {
      sm: '0px 1px 2px rgba(0,0,0,0.25), 0px 1px 1px rgba(0,0,0,0.15)',
      md: '0px 2px 4px rgba(0,0,0,0.25), 0px 4px 8px rgba(0,0,0,0.20)',
      lg: '0px 4px 12px rgba(0,0,0,0.30), 0px 8px 24px rgba(0,0,0,0.25)',
      xl: '0px 8px 24px rgba(0,0,0,0.35), 0px 16px 40px rgba(0,0,0,0.30)',
    },
    light: {
      sm: '0px 1px 2px rgba(0,0,0,0.08)',
      md: '0px 2px 6px rgba(0,0,0,0.10)',
      lg: '0px 6px 16px rgba(0,0,0,0.12)',
      xl: '0px 12px 32px rgba(0,0,0,0.14)',
    },
  },

  // ─── MOTION ──────────────────────────────────────────────────────
  motion: {
    duracao: {
      instant:    80,  // --duration-instant  — hover states, foco
      fast:       150, // --duration-fast     — dropdowns, tooltips
      normal:     250, // --duration-normal   — maioria das transições de UI
      slow:       400, // --duration-slow     — modais, drawers, page transitions
      deliberate: 600, // --duration-deliberate — celebrações, onboarding, loading
    },
    easing: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',  // --ease-standard — maioria das animações
      enter:    'cubic-bezier(0, 0, 0.2, 1)',     // --ease-enter    — elementos entrando
      exit:     'cubic-bezier(0.4, 0, 1, 1)',     // --ease-exit     — elementos saindo
      spring:   'cubic-bezier(0.34, 1.56, 0.64, 1)', // --ease-spring — elástico
    },
  },

  // ─── GRID & LAYOUT ───────────────────────────────────────────────
  grid: {
    breakpoints: {
      xs:  0,    // --bp-xs
      sm:  480,  // --bp-sm
      md:  768,  // --bp-md
      lg:  1024, // --bp-lg
      xl:  1280, // --bp-xl
      xxl: 1440, // --bp-xxl
    },
    colunas: {
      mobile:  4,  // xs – sm
      tablet:  8,  // md
      desktop: 12, // lg – xl – xxl
    },
    gutter: {
      mobile:  16, // px
      tablet:  24,
      desktop: 24,
    },
    margin: {
      mobile:  16, // px
      tablet:  24,
      desktop: 32,
    },
    containerMaxWidth: 1280, // px — wide (xxl) centralizado
  },

} as const;

// ─── CSS VARIABLES (referência completa) ─────────────────────────
// Mapeamento semântico → CSS custom property
export const cssVars = {
  '--color-bg-primary':    tokens.cores.bgPrimary,
  '--color-bg-secondary':  tokens.cores.bgSecondary,
  '--color-surface':       tokens.cores.surface,
  '--color-text-primary':  tokens.cores.textPrimary,
  '--color-text-secondary':tokens.cores.textSecondary,
  '--color-action-primary':tokens.cores.actionPrimary,
  '--color-action-hover':  tokens.cores.actionHover,
  '--color-border-default':tokens.cores.border,
  '--color-brand-green':   tokens.cores.brandGreen,
  '--color-success':       tokens.cores.success,
  '--color-success-bg':    tokens.cores.successBg,
  '--color-error':         tokens.cores.error,
  '--color-error-bg':      tokens.cores.errorBg,
  '--color-warning':       tokens.cores.warning,
  '--color-warning-bg':    tokens.cores.warningBg,

  // Tipografia
  '--font-size-display':  '48px',
  '--font-size-h1':       '36px',
  '--font-size-h2':       '28px',
  '--font-size-h3':       '22px',
  '--font-size-h4':       '18px',
  '--font-size-body-lg':  '16px',
  '--font-size-body-md':  '14px',
  '--font-size-caption':  '12px',
  '--font-size-mono':     '13px',
  '--line-height-display': '1.1',
  '--line-height-h1':      '1.2',
  '--line-height-h2':      '1.25',
  '--line-height-h3':      '1.3',
  '--line-height-h4':      '1.4',
  '--line-height-body':    '1.6',
  '--line-height-caption': '1.5',
  '--line-height-mono':    '1.5',
  '--font-weight-bold':      '800',
  '--font-weight-semibold':  '600',
  '--font-weight-regular':   '400',

  // Grid
  '--bp-xs':  '0px',
  '--bp-sm':  '480px',
  '--bp-md':  '768px',
  '--bp-lg':  '1024px',
  '--bp-xl':  '1280px',
  '--bp-xxl': '1440px',
  '--grid-gutter-mobile':  '16px',
  '--grid-gutter-tablet':  '24px',
  '--grid-gutter-desktop': '24px',
  '--grid-margin-mobile':  '16px',
  '--grid-margin-tablet':  '24px',
  '--grid-margin-desktop': '32px',
  '--container-max-width': '1280px',

  // Sombras (dark mode — padrão do sistema)
  '--shadow-sm': '0px 1px 2px rgba(0,0,0,0.25), 0px 1px 1px rgba(0,0,0,0.15)',
  '--shadow-md': '0px 2px 4px rgba(0,0,0,0.25), 0px 4px 8px rgba(0,0,0,0.20)',
  '--shadow-lg': '0px 4px 12px rgba(0,0,0,0.30), 0px 8px 24px rgba(0,0,0,0.25)',
  '--shadow-xl': '0px 8px 24px rgba(0,0,0,0.35), 0px 16px 40px rgba(0,0,0,0.30)',
} as const;

// Mantido para compatibilidade com componentes existentes
// ⚠️ Migrar para `tokens.cores` gradualmente
export const tokens_legado = {
  colors: {
    brand:   tokens.cores.actionPrimary,
    danger:  tokens.cores.error,
    success: tokens.cores.success,
    neutral: tokens.cores.textSecondary,
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
  fontSizes: {
    sm: '14px',
    md: '16px',
    lg: '20px',
  },
};
