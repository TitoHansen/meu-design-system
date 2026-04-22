# Design System — Briefing Executivo

**Projeto:** @titohansen/design-system  
**Data:** Abril 2026  
**Status:** v1.0 — em produção ativa

---

## O que é este projeto

Um sistema de design unificado que conecta Figma, código React e documentação a partir de uma única fonte de verdade. Toda decisão visual — cor, espaçamento, tipografia, animação — existe em um único lugar e se propaga automaticamente para design e código.

A identidade visual é ancorada nas cores da bandeira brasileira:  
**Azul = Ação · Verde = Identidade · Neutros = Estrutura**

---

## Para o Lead de Design

### O problema que resolve
Sem um sistema de design, cada tela criada no Figma pode usar tons levemente diferentes de azul, espaçamentos inconsistentes e componentes que não refletem o que o front-end entrega. O resultado é retrabalho constante e perda de fidelidade entre protótipo e produto final.

### Como funciona na prática
Um plugin Figma instalado localmente sincroniza automaticamente todos os valores de design (cores, radius, espaçamento) como **Figma Variables** e **Paint Styles**. Os componentes do Figma são gerados pelo mesmo plugin com os mesmos valores que o código usa.

```
Designer muda um token → plugin re-sincroniza → Figma atualizado em segundos
```

### O que já está disponível
15 componentes documentados com todas as variantes e estados:

| Categoria | Componentes |
|-----------|-------------|
| Ações | Button, IconCard |
| Formulários | Input, Select, Checkbox, Toggle |
| Feedback | Badge, Toast, Spinner |
| Layout | Card, Modal, Table, Tabs |
| Navegação | Breadcrumb, Tooltip |
| Identidade | Avatar |

### Garantias de qualidade
- Contraste WCAG AA obrigatório em todos os componentes
- Cada componente tem story com todas as variantes aprovadas
- Testes visuais automatizados via Chromatic (detecta regressões de UI)

---

## Para o Lead de Tecnologia

### Arquitetura em quatro camadas

```
tokens.ts  ──→  Componentes React  ──→  Storybook (documentação)
    │
    └──→  Figma Plugin  ──→  Figma (design)
```

**`tokens.ts` é a única fonte de verdade.** Nenhum componente usa valores hardcoded. Toda cor, tamanho e espaçamento é importado de tokens.

### Stack técnico

| Camada | Tecnologia |
|--------|------------|
| Linguagem | TypeScript 5.9 + React 19 |
| Build | Vite 8 + vite-plugin-dts |
| Documentação | Storybook 10 |
| Testes unitários | Vitest 4 |
| Testes E2E | Playwright |
| Testes visuais | Chromatic |
| Acessibilidade | @storybook/addon-a11y |
| Distribuição | NPM (GitHub Packages) |

### Distribuição como pacote

O sistema é publicado como pacote NPM privado:

```bash
npm install @titohansen/design-system
```

Qualquer aplicação React 18+ pode importar os componentes diretamente. O pacote exporta os componentes e os tokens como módulos separados, com tipos TypeScript incluídos.

### Cobertura de tokens

| Categoria | Escopo |
|-----------|--------|
| Cores | Primitivas (blue/green/neutral 100–900) + semânticas (action, brand, surface, text, border, success, error, warning) |
| Tipografia | 9 escalas — display até mono |
| Border Radius | 7 valores (2px → 9999px) |
| Espaçamento | 16 escalas baseadas em 4px |
| Sombras | 4 níveis, dark-first |
| Motion | 5 durações + 4 curvas easing |
| Grid | Breakpoints xs→xxl com colunas e gutters |

### Garantias técnicas
- Zero valores hardcoded nos componentes — qualquer linter pode validar
- TypeScript strict em todo o projeto
- Tree-shakeable: aplicações importam apenas o que usam
- Sem dependências de runtime além do React

---

## Para o Lead de Negócios

### Qual problema estamos resolvendo

Empresas sem design system gastam tempo repetindo decisões já tomadas: o desenvolvedor pergunta qual azul usar, o designer cria um componente que já existe, o QA encontra inconsistências entre telas. Cada inconsistência encontrada em produção custa mais do que teria custado preveni-la.

### O que o sistema entrega

**Velocidade de entrega**  
Um novo componente validado no sistema pode ser usado em qualquer produto em minutos — sem recriar no Figma, sem reimplementar no código. A estimativa de ganho de tempo por componente reutilizado é de 4 a 8 horas de trabalho (design + desenvolvimento + QA).

**Consistência garantida**  
Toda interface construída com o sistema usa automaticamente as mesmas cores, espaçamentos e comportamentos. Inconsistências visuais entre produtos deixam de ser um problema humano para se tornar um problema estrutural — e o sistema os previne por construção.

**Escalabilidade**  
O sistema foi construído para crescer. Adicionar um novo produto ou feature não requer decisões de design do zero — apenas composição de componentes existentes. Novos desenvolvedores e designers entram em velocidade de cruzeiro mais rápido.

**Identidade de marca protegida**  
As cores, proporções e comportamentos que definem a identidade visual estão codificados no sistema. Nenhuma tela "foge" da marca por acidente.

### Estado atual

| Indicador | Status |
|-----------|--------|
| Componentes prontos | 15 |
| Tokens definidos | +80 valores semânticos |
| Integração Figma | Ativa (plugin instalável) |
| Integração código | Ativa (pacote NPM publicado) |
| Testes visuais | Ativos (Chromatic) |
| Acessibilidade | WCAG AA em todos os componentes |

### Próximos passos naturais

1. **Adoção em produtos existentes** — migrar interfaces para usar os componentes do sistema
2. **Expansão de componentes** — priorizar componentes de alto uso ainda não cobertos
3. **Governança** — definir processo de contribuição e aprovação de novos componentes
4. **Métricas** — medir redução de tempo de entrega por sprint após adoção

---

*Para acessar o sistema: `npm run storybook` abre a documentação completa com todas as variantes e props de cada componente.*
