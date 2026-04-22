# Como criar um novo componente

Checklist completo: Figma → VS Code → Storybook → Plugin.

---

## 1. Figma

- [ ] Sincronizar tokens (se for arquivo novo)
- [ ] Criar base via plugin → aba Componentes → selecionar o mais próximo → ajustar no canvas
- [ ] Definir variantes, estados (default, hover, disabled, focus) e tamanhos
- [ ] Anotar: quais props, quais tokens de cor, qual radius, qual espaçamento

---

## 2. VS Code — componente React

Copie `_Template.tsx` → renomeie para `NomeComp.tsx`

```
Substitua:  Template       →  NomeComp
Substitua:  TemplateProps  →  NomeCompProps
```

Regras obrigatórias:
- Nenhum hex hardcoded — sempre `tokens.cores.*`, `tokens.raio.*`, `tokens.espacamento[n].valor`
- `disabled`: opacity 0.5 + cursor not-allowed
- `minHeight: 44` em elementos clicáveis (WCAG)
- Exporte a interface de props

---

## 3. VS Code — stories

Copie `_Template.stories.tsx` → renomeie para `NomeComp.stories.tsx`

- Altere `title: 'DS/NomeComp'`
- Uma story por variante
- Uma story `Disabled`
- Uma story `AllVariants` com render inline

---

## 4. Exportar em index.ts

```ts
// Em src/index.ts, adicione:
export { default as NomeComp }  from './components/NomeComp'
export type { NomeCompProps }   from './components/NomeComp'
```

---

## 5. Plugin Figma — builder

Em `figma-plugin/code.js`, adicione a função builder seguindo o padrão:

```js
async function buildNomeComp(cv, fv) {
  await figma.loadFontAsync({ family: 'Mulish', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });

  var variants = ['brand', 'danger', 'success', 'neutral'];
  var container = makeContainer('NomeComp');

  for (var i = 0; i < variants.length; i++) {
    var v = variants[i];
    var c = figma.createComponent();
    c.name = v.charAt(0).toUpperCase() + v.slice(1);
    // ... construir os layers aqui usando COLORS.* e RADIUS.*
    container.appendChild(c);
  }

  figma.currentPage.appendChild(container);
}
```

Registre no switch de `build-components`:
```js
case 'nomecomp': await buildNomeComp(cv, fv); break;
```

---

## 6. Plugin Figma — UI

Em `figma-plugin/ui.html`, adicione o card na `.comp-grid`:

```html
<div class="comp-card selected" data-comp="nomecomp" onclick="toggleComp(this)">
  <div class="comp-info">
    <div class="comp-name">NomeComp</div>
    <div class="comp-meta">Brand · Danger · Success · Neutral</div>
  </div>
  <div class="comp-check">✓</div>
</div>
```

Adicione também na aba Buscar em `DS_COMPONENTS`:
```js
nomecomp: { icon:'', label:'NomeComp', meta:'Brand · Danger · Success · Neutral', desc:'Descrição do componente.' },
```

---

## Checklist de aprovação

- [ ] Zero hex hardcoded no componente
- [ ] Todas as variantes têm story
- [ ] Story `Disabled` existe
- [ ] Contraste WCAG AA validado no Storybook (aba a11y)
- [ ] Exportado em `src/index.ts`
- [ ] Builder adicionado no plugin
- [ ] Card adicionado na UI do plugin
