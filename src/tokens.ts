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
  },

  // ─── TIPOGRAFIA ──────────────────────────────────────────────────
  tipografia: {
    familia: {
      primaria: 'Mulish',  // headings, body, labels
      mono:     'DM Mono', // código, captions técnicas
    },
    // ⚠️ line-height não estava nos anexos — valores abaixo são inferidos (1.2 headings / 1.5 body)
    escala: {
      display:  { tamanho: 48, peso: 800, lineHeight: null },
      h1:       { tamanho: 36, peso: 700, lineHeight: null },
      h2:       { tamanho: 28, peso: 700, lineHeight: null },
      h3:       { tamanho: 22, peso: 600, lineHeight: null },
      h4:       { tamanho: 18, peso: 600, lineHeight: null },
      bodyLg:   { tamanho: 16, peso: 400, lineHeight: null },
      body:     { tamanho: 14, peso: 400, lineHeight: null },
      caption:  { tamanho: 12, peso: 400, lineHeight: null },
      mono:     { tamanho: 13, peso: 400, lineHeight: null },
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
  // ⚠️ INCOMPLETO — valores CSS exatos não estavam legíveis nos anexos.
  sombras: {
    sm:  null,
    md:  null,
    lg:  null,
    xl:  null,
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
  // ⚠️ INCOMPLETO — breakpoints em px, gutter e margin não legíveis.
  grid: {
    colunas: 12,
    breakpoints: {
      xs:  null,
      sm:  null,
      md:  null,
      lg:  null,
      xl:  null,
      '2xl': null,
    },
  },

} as const;

// ─── CSS VARIABLES (referência) ──────────────────────────────────
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
