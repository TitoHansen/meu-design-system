# meu-design-system

Sistema de design baseado nas cores da bandeira do Brasil.  
**Azul = Ação · Verde = Identidade · Neutros = Estrutura**

---

## Como este sistema funciona

O design system tem quatro camadas conectadas. Cada camada tem uma responsabilidade clara, e todas falam a mesma língua: os **tokens**.

```
tokens.ts  ──→  Componentes React  ──→  Storybook
    │                                        │
    └──→  Figma Plugin  ──→  Figma           │
                                        Documentação
```

---

## As quatro camadas

### 1. `src/tokens.ts` — a fonte da verdade

É o único lugar onde os valores reais existem. Todos os outros arquivos importam daqui.

```ts
tokens.cores.actionPrimary   // '#2C3D73'
tokens.raio.md               // 8  (botões e inputs)
tokens.tipografia.escala.h1  // { tamanho: 36, peso: 700, lineHeight: 1.2 }
tokens.espacamento[4].valor  // 16px
```

**Regra:** nunca escreva uma cor ou tamanho em hardcode num componente. Sempre importe de `tokens`.

---

### 2. `src/components/` — componentes React

Cada componente consome os tokens diretamente e define sua própria aparência.

```
Button.tsx      Badge.tsx      Card.tsx
Input.tsx       Select.tsx
```

Cada componente tem um arquivo de story (`*.stories.tsx`) que documenta todas as variantes.

**Fluxo para criar um componente novo:**
1. Criar `ComponentName.tsx` em `src/components/`
2. Criar `ComponentName.stories.tsx` com todas as variantes
3. Exportar em `src/index.ts`
4. Adicionar o builder em `figma-plugin/code.js`

---

### 3. Storybook — documentação viva

Visualiza cada componente com todas as variantes e estados.

```bash
npm run storybook       # abre em localhost:6006
npm run build-storybook # gera versão estática
```

O Storybook lê automaticamente qualquer arquivo `*.stories.tsx` dentro de `src/`.

**O que cada story mostra:**
- Todas as variantes (brand, danger, success, warning, neutral)
- Todos os estados (default, disabled, focus, etc.)
- Tabela de props com tipos e descrições

---

### 4. `figma-plugin/` — ponte para o Figma

O plugin recria no Figma os mesmos componentes que existem no React, usando os mesmos valores de tokens.

```
figma-plugin/
├── manifest.json   # configuração do plugin (nome, permissões)
├── code.js         # lógica: builders de componentes + sync de tokens
└── ui.html         # interface do plugin (abas Tokens e Componentes)
```

**O que o plugin faz:**

| Aba | Função |
|-----|--------|
| **Tokens** | Sincroniza cores, radius e espaçamento como Figma Variables e Paint Styles |
| **Componentes** | Cria os componentes (Button, Badge, Card, Input, Select) diretamente no canvas |

**Como usar no Figma:**
1. Figma Desktop → menu hambúrguer → Plugins → Development → **Import plugin from manifest**
2. Navegar até `meu-design-system/figma-plugin/manifest.json`
3. Abrir o plugin pelo menu Plugins → Development → meu-design-system

---

## Estrutura de arquivos

```
meu-design-system/
├── src/
│   ├── tokens.ts            ← FONTE DA VERDADE
│   ├── design.spec.ts       ← spec de componentes (dimensões, cores, regras)
│   ├── index.ts             ← exportações públicas
│   └── components/
│       ├── Button.tsx / Button.stories.tsx
│       ├── Badge.tsx  / Badge.stories.tsx
│       ├── Card.tsx   / Card.stories.tsx
│       ├── Input.tsx  / Input.stories.tsx
│       └── Select.tsx / Select.stories.tsx
├── figma-plugin/
│   ├── manifest.json
│   ├── code.js
│   └── ui.html
└── .storybook/
    ├── main.ts
    └── preview.ts           ← canvas dark-first por padrão
```

---

## Tokens — o que está completo

| Categoria | Tokens |
|-----------|--------|
| Cores primitivas | blue 100–900, green 100–900, neutral 100–900 |
| Cores semânticas | action, brand, surface, text, border, success, error, warning |
| Tipografia | 9 escalas (display → mono) com tamanho, peso e line-height |
| Border Radius | xs=2 · sm=4 · md=8 · lg=12 · xl=16 · 2xl=24 · full=9999 |
| Espaçamento | 16 escalas baseadas em 4px (4px → 64px) |
| Sombras | sm/md/lg/xl — dark-first + override para light mode |
| Motion | 5 durações (80ms→600ms) + 4 curvas easing |
| Grid | breakpoints xs→xxl, colunas 4/8/12, gutter/margin por breakpoint |

**Regra de uso de radius:**
- `md` → botões e inputs
- `lg` → cards e panels
- `full` → badges e chips

---

## Paleta de cores

**Azul (Ação)**

| Token | Hex | Uso |
|-------|-----|-----|
| blue-700 (primary) | `#2C3D73` | botões, links, foco |
| blue-500 (hover) | `#4A5FA3` | hover de ações |

**Verde (Identidade)**

| Token | Hex | Uso |
|-------|-----|-----|
| green-700 (primary) | `#24732F` | marca, seções, destaques |
| green-500 | `#3FAF4F` | **sucesso** (≠ verde da marca) |

**Neutros (Estrutura — 80–90% da interface)**

| Token | Hex | Uso |
|-------|-----|-----|
| neutral-900 | `#08090D` | fundo primário |
| neutral-700 | `#092640` | superfícies / cards |
| neutral-300 | `#8C92A3` | texto secundário |
| neutral-100 | `#F2F2F2` | texto primário (fundos escuros) |

---

## Claude — como usar neste projeto

Claude é usado como co-piloto de desenvolvimento. Para manter consistência entre sessões:

**Ao criar um componente novo, diga:**
> "Criar componente X — seguir design.spec.ts e tokens.ts"

**Ao atualizar tokens:**
> "Atualizar tokens com os valores do anexo [imagem]"

**Ao reportar um bug:**
> "O componente X no Figma está com Y errado — corrigir no plugin e no React"

**O que o Claude mantém em sincronia automaticamente:**
- Qualquer mudança em `tokens.ts` é refletida nos componentes React
- Qualquer mudança nos componentes React é refletida nos builders do plugin
- Commits e push para GitHub ao final de cada sessão

---

## Scripts disponíveis

```bash
npm run dev          # app de desenvolvimento
npm run storybook    # documentação de componentes (localhost:6006)
npm run build        # build de produção
npm run typecheck    # verifica tipos TypeScript
```

---

## Regras do sistema

1. **Nunca use valores hardcoded** — sempre use `tokens.*`
2. **Azul é exclusivo para ações** — não use como decoração
3. **Verde da marca ≠ verde de sucesso** — `#24732F` ≠ `#3FAF4F`
4. **Componente novo = React primeiro, Figma depois**
5. **Todo componente precisa de story antes de ser aprovado**
6. **Contraste WCAG AA obrigatório** — validar antes de aprovar
