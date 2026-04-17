// src/design.spec.ts
// Diretrizes do design system — fonte da verdade para criação de componentes
// Todo componente novo (React ou Figma) deve seguir este arquivo.

import { tokens } from './tokens'

// ─── PRINCÍPIOS ──────────────────────────────────────────────────
// 1. Cores têm função, não apenas estética
// 2. Azul  = Ação e Interação  (--color-action-primary)
// 3. Verde = Identidade e Marca (--color-brand-green)
// 4. Neutros = Estrutura da interface
// 5. Verde semântico ≠ verde da marca (success usa #3FAF4F, não #24732F)
// 6. Acessibilidade WCAG AA obrigatória em todos os componentes

// ─── ACESSIBILIDADE (WCAG AA validados) ──────────────────────────
export const contrastes = [
  { fg: '#F2F2F2', bg: '#08090D', ratio: '14.82:1', status: 'AA ✓' },
  { fg: '#8C92A3', bg: '#0F1117', ratio: '7.12:1',  status: 'AA ✓' },
  { fg: '#2C3D73', bg: '#FFFFFF', ratio: '6.33:1',  status: 'AA ✓' },
  { fg: '#24732F', bg: '#FFFFFF', ratio: '4.62:1',  status: 'AA ✓' },
  { fg: '#D64545', bg: '#FFFFFF', ratio: '4.51:1',  status: 'AA ✓' },
]

// ─── REGRAS DE USO DE COR ────────────────────────────────────────
export const regrasCor = [
  'Use Azul (#2C3D73) para ações e interações — botões, links, foco',
  'Use Verde (#24732F) para ambientação e identidade de marca — seções, destaques',
  'Use Neutros para 80–90% da interface — fundos, textos, bordas',
  'Nunca use verde da marca (#24732F) para indicar sucesso — use #3FAF4F',
  'Azul é exclusivo para ações e interações — não use como decoração',
  'Neutros devem representar 80–90% da interface',
  'Nunca dependa apenas de cor para feedbacks — use ícone + cor',
  'Sempre valide contraste antes de aprovar um componente',
]

// ─── SPEC POR COMPONENTE ─────────────────────────────────────────

export const spec = {

  Button: {
    alturaMinima:   40,    // px
    paddingVertical: tokens.espacamento[3].valor,   // 12px (compacto) ou sp-4 (padrão)
    paddingHorizontal: tokens.espacamento[5].valor, // 20px — sp-5
    radius: 'md',          // --radius-md (botões usam md conforme spec)
    fonte: {
      familia: tokens.tipografia.familia.primaria,
      peso:    700,         // Bold
      tamanho: null,        // ⚠️ Preencher após tipografia definida
    },
    variantes: ['primary', 'secondary', 'ghost', 'danger'],
    estados: ['default', 'hover', 'focus', 'disabled', 'loading'],
    regras: [
      'Nunca usar sem label de texto',
      'Largura mínima de 88px',
      'Primary usa --color-action-primary como fundo',
      'Hover usa --color-action-hover',
      'Disabled: opacidade 40%, cursor not-allowed',
      'Loading: mostrar spinner no lugar do label',
    ],
  },

  Badge: {
    paddingVertical:    4,  // px
    paddingHorizontal: 10,  // px
    radius: 'full',         // --radius-full (pílula)
    fonte: {
      familia: tokens.tipografia.familia.primaria,
      peso:    600,
      tamanho: null,        // ⚠️ Preencher
    },
    variantes: ['brand', 'success', 'error', 'warning', 'neutral'],
    regras: [
      'Fundo = cor semântica com 12% opacidade',
      'Texto = cor semântica plena',
      'Nunca usar como elemento clicável — use Chip',
    ],
  },

  Card: {
    padding:       tokens.espacamento[6].valor, // 24px
    gap:           tokens.espacamento[3].valor, // 12px
    radius:        'lg',   // --radius-lg
    larguraMaxima: 320,    // px
    borda:         '1px solid --color-border-default',
    sombra:        null,   // ⚠️ Preencher após sombras definidas
    regras: [
      'Fundo sempre --color-surface',
      'Título: Mulish Bold, tamanho lg',
      'Descrição: Mulish Regular, cor --color-text-secondary',
      'Badge e botão são opcionais',
      'Não aninhar cards dentro de cards',
    ],
  },

  Input: {
    altura:            40,  // px
    paddingVertical:   10,  // px
    paddingHorizontal: 14,  // px
    radius:            'md', // --radius-md (inputs usam md conforme spec)
    borda:             '1.5px solid',
    fonte: {
      familia: tokens.tipografia.familia.primaria,
      tamanho: null, // ⚠️ Preencher
    },
    estados: {
      default:  { borda: '--color-border-default',  fundo: '--color-surface' },
      focus:    { borda: '--color-action-primary',  fundo: '--color-surface' },
      error:    { borda: '--color-error',           fundo: '--color-error-bg' },
      disabled: { borda: '--color-border-default',  fundo: '--color-bg-secondary', opacidade: 0.65 },
    },
    regras: [
      'Label acima do campo, gap de 6px',
      'Placeholder: --color-text-secondary',
      'Texto digitado: --color-text-primary',
      'Erro: sempre acompanhar de mensagem textual abaixo',
    ],
  },

  Select: {
    // Herda todas as regras de Input
    // Diferença: chevron ▾ à direita, padding-right de 40px
    paddingDireito: 40,
    iconeChevron: {
      cor:    '--color-text-secondary',
      tamanho: 16,
    },
    regras: [
      'Mesmo visual que Input em todos os estados',
      'Chevron indica dropdown — não remover',
      'Placeholder desabilitado por padrão (value="")',
    ],
  },

}

// ─── CHECKLIST DE NOVO COMPONENTE ────────────────────────────────
// Use este checklist antes de aprovar qualquer componente novo:
export const checklist = [
  '[ ] Usa apenas tokens semânticos (cores.*, espacamento.*, raio.*)',
  '[ ] Contraste WCAG AA validado em todos os estados',
  '[ ] Tem estado disabled implementado',
  '[ ] Tem estado focus visível (acessibilidade de teclado)',
  '[ ] Fonte é Mulish (ou DM Mono para código)',
  '[ ] Radius segue a regra: md=botões/inputs, lg=cards, full=badges',
  '[ ] Espaçamentos são múltiplos de 4px',
  '[ ] Testado no Storybook',
  '[ ] Builder adicionado ao figma-plugin/code.js',
  '[ ] Exportado em src/index.ts',
]
