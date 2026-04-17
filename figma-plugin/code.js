// ─── meu-design-system — Figma Plugin ────────────────────────────
// Componentes: Button, Badge, Card, Input

figma.showUI(__html__, { width: 480, height: 620, title: "meu-design-system — Token Sync" });

// ── Design Tokens (espelho de src/tokens.ts) ──────────────────────
// Tokens espelhados de src/tokens.ts v2.0.0
var COLORS = {
  // Ação (Azul)
  actionPrimary:  '#2C3D73',
  actionHover:    '#4A5FA3',
  // Brand (Verde)
  brandGreen:     '#24732F',
  // Fundos dark
  bgPrimary:      '#08090D',
  bgSecondary:    '#0F1117',
  surface:        '#092640',
  // Fundos light (para componentes — boa leitura no canvas do Figma)
  cardBg:         '#FFFFFF',
  inputBg:        '#FFFFFF',
  disabledBg:     '#F5F5F5',
  // Texto (em fundos claros)
  textDark:       '#1C274D',      // blue-900 — título em fundo claro
  textMuted:      '#3A3F4B',      // neutral-500 — descrição em fundo claro
  // Texto (em fundos escuros)
  textPrimary:    '#F2F2F2',
  textSecondary:  '#8C92A3',
  // Borda
  border:         '#D6DEF5',      // blue-100 — borda suave em fundo claro
  borderStrong:   '#3A3F4B',      // neutral-500
  // Semânticos
  success:        '#3FAF4F',
  successBg:      '#D9F5DD',
  error:          '#D64545',
  errorBg:        '#FDECEC',
  warning:        '#E6A23C',
  warningBg:      '#FFF4E5',
  // Primitivos úteis
  white:          '#FFFFFF',
  blue300:        '#7F93D9',
  blue100:        '#D6DEF5',
  green300:       '#7DDB8A',
  green100:       '#D9F5DD',
};

var RADIUS  = { xs: 2, sm: 4, md: 8, lg: 12, xl: 16, '2xl': 24, full: 9999 };
var FONT    = {
  // Escala semântica
  caption: 12, mono: 13, body: 14, bodyLg: 16, h4: 18, h3: 22, h2: 28, h1: 36, display: 48,
  // Aliases usados pelos builders
  xs: 12, sm: 14, md: 16, lg: 18, xl: 22,
};

// Sombras — dark-first (baixa opacidade, sem glow)
// Uso: sm=inputs/buttons | md=cards | lg=dropdowns | xl=modais
var SHADOWS = {
  sm: [
    { type: 'DROP_SHADOW', color: { r:0, g:0, b:0, a:0.25 }, offset: { x:0, y:1 }, radius: 2, spread: 0, visible: true, blendMode: 'NORMAL' },
    { type: 'DROP_SHADOW', color: { r:0, g:0, b:0, a:0.15 }, offset: { x:0, y:1 }, radius: 1, spread: 0, visible: true, blendMode: 'NORMAL' },
  ],
  md: [
    { type: 'DROP_SHADOW', color: { r:0, g:0, b:0, a:0.25 }, offset: { x:0, y:2 }, radius: 4,  spread: 0, visible: true, blendMode: 'NORMAL' },
    { type: 'DROP_SHADOW', color: { r:0, g:0, b:0, a:0.20 }, offset: { x:0, y:4 }, radius: 8,  spread: 0, visible: true, blendMode: 'NORMAL' },
  ],
  lg: [
    { type: 'DROP_SHADOW', color: { r:0, g:0, b:0, a:0.30 }, offset: { x:0, y:4  }, radius: 12, spread: 0, visible: true, blendMode: 'NORMAL' },
    { type: 'DROP_SHADOW', color: { r:0, g:0, b:0, a:0.25 }, offset: { x:0, y:8  }, radius: 24, spread: 0, visible: true, blendMode: 'NORMAL' },
  ],
  xl: [
    { type: 'DROP_SHADOW', color: { r:0, g:0, b:0, a:0.35 }, offset: { x:0, y:8  }, radius: 24, spread: 0, visible: true, blendMode: 'NORMAL' },
    { type: 'DROP_SHADOW', color: { r:0, g:0, b:0, a:0.30 }, offset: { x:0, y:16 }, radius: 40, spread: 0, visible: true, blendMode: 'NORMAL' },
  ],
};

var NS      = 'meu-design-system';

// Mapeamento: variant → nome da variável no Figma
var VARIANT_VAR = {
  brand:   'color/actionPrimary',
  danger:  'color/error',
  success: 'color/success',
  neutral: 'color/textSecondary',
};

var VARIANT_HEX = {
  brand:   COLORS.actionPrimary,
  danger:  COLORS.error,
  success: COLORS.success,
  neutral: COLORS.textSecondary,
};

// ── Helpers ───────────────────────────────────────────────────────
function hexToRgb(hex) {
  hex = hex.trim().replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(function(c){ return c + c; }).join('');
  var n = parseInt(hex, 16);
  return { r: ((n>>16)&255)/255, g: ((n>>8)&255)/255, b: (n&255)/255 };
}

function pxToNum(val) {
  if (typeof val === 'number') return val;
  return parseFloat(String(val).replace('px','').trim()) || 0;
}

function flattenTokens(obj, prefix) {
  var results = [];
  prefix = prefix || '';
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var key  = keys[i];
    var val  = obj[key];
    var path = prefix ? prefix + '/' + key : key;
    if (val && typeof val === 'object' && 'value' in val) {
      results.push({ path: path, value: val.value, type: val.type || 'other' });
    } else if (val && typeof val === 'object') {
      var sub = flattenTokens(val, path);
      for (var j = 0; j < sub.length; j++) results.push(sub[j]);
    }
  }
  return results;
}

function buildVarMap(vars) {
  var m = {};
  for (var i = 0; i < vars.length; i++) m[vars[i].name] = vars[i];
  return m;
}

function bindColor(variable, fallbackHex) {
  var rgb   = hexToRgb(fallbackHex || '#000000');
  var paint = { type: 'SOLID', color: rgb, opacity: 1 };
  if (variable) {
    try { return figma.variables.setBoundVariableForPaint(paint, 'color', variable); }
    catch(e) {}
  }
  return paint;
}

function solidWithOpacity(hex, opacity) {
  return { type: 'SOLID', color: hexToRgb(hex), opacity: opacity };
}

function autoLayout(node, dir, pV, pH, gap) {
  node.layoutMode            = dir || 'HORIZONTAL';
  node.primaryAxisSizingMode = 'AUTO';
  node.counterAxisSizingMode = 'AUTO';
  node.paddingTop    = pV;  node.paddingBottom = pV;
  node.paddingLeft   = pH;  node.paddingRight  = pH;
  node.itemSpacing   = gap || 0;
  node.primaryAxisAlignItems = 'CENTER';
  node.counterAxisAlignItems = 'CENTER';
}

function makeContainer(label) {
  var frame = figma.createFrame();
  frame.name                  = label;
  frame.layoutMode            = 'HORIZONTAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.paddingTop    = 24; frame.paddingBottom = 24;
  frame.paddingLeft   = 24; frame.paddingRight  = 24;
  frame.itemSpacing   = 16;
  frame.counterAxisAlignItems = 'CENTER';
  frame.fills = [];
  figma.currentPage.appendChild(frame);
  return frame;
}

// ════════════════════════════════════════════════════════════════
// BUILDERS
// ════════════════════════════════════════════════════════════════

// ── Button ───────────────────────────────────────────────────────
// Espelho de Button.tsx: bg = variant color, text = #f5f5f5, padding 10×20, radius md
async function buildButton(cv, fv) {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  var variants = ['brand', 'danger', 'success', 'neutral'];
  var container = makeContainer('Button');

  for (var i = 0; i < variants.length; i++) {
    var variant = variants[i];
    var c = figma.createComponent();
    c.name = variant.charAt(0).toUpperCase() + variant.slice(1);
    autoLayout(c, 'HORIZONTAL', 10, 20, 0);
    c.cornerRadius = RADIUS.md;
    c.effects = SHADOWS.sm;
    c.fills = [bindColor(cv[VARIANT_VAR[variant]], VARIANT_HEX[variant])];

    var txt = figma.createText();
    txt.fontName   = { family: 'Inter', style: 'Regular' };
    txt.fontSize   = FONT.sm;
    txt.characters = c.name;
    txt.fills      = [{ type: 'SOLID', color: hexToRgb(COLORS.white), opacity: 1 }];
    c.appendChild(txt);
    container.appendChild(c);
  }
  return container;
}

// ── Badge ────────────────────────────────────────────────────────
// Espelho de Badge.tsx: bg = color + '20' (12% opacity), text = cor plena, peso 500, padding 4×10, radius full
async function buildBadge(cv, fv) {
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });

  var LABELS = { brand: 'Novo', danger: 'Erro', success: 'Ativo', neutral: 'Rascunho' };
  var variants = ['brand', 'danger', 'success', 'neutral'];
  var container = makeContainer('Badge');

  for (var i = 0; i < variants.length; i++) {
    var variant = variants[i];
    var c = figma.createComponent();
    c.name = variant.charAt(0).toUpperCase() + variant.slice(1);
    autoLayout(c, 'HORIZONTAL', 4, 10, 0);
    c.cornerRadius = RADIUS.full;
    // '#6366f120' em CSS = 12.5% opacidade — representado como opacity no Figma
    c.fills = [solidWithOpacity(VARIANT_HEX[variant], 0.12)];

    var txt = figma.createText();
    txt.fontName   = { family: 'Inter', style: 'Medium' };
    txt.fontSize   = FONT.sm;
    txt.characters = LABELS[variant];
    txt.fills      = [bindColor(cv[VARIANT_VAR[variant]], VARIANT_HEX[variant])];
    c.appendChild(txt);
    container.appendChild(c);
  }
  return container;
}

// ── Card ─────────────────────────────────────────────────────────
// Espelho de Card.tsx: border 1px #e5e7eb, radius lg, padding 24, gap 12
// Composição: Badge opcional → Título (lg, bold) → Descrição (sm, regular) → Button opcional
async function buildCard(cv, fv) {
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });

  var defs = [
    {
      name: 'Default',
      badgeLabel: 'Novo',   badgeVariant: 'brand',
      title: 'Título do card',
      desc:  'Descrição do conteúdo do card com informações relevantes para o usuário.',
      btnLabel: 'Saiba mais', btnVariant: 'brand',
    },
    {
      name: 'Danger',
      badgeLabel: 'Erro',   badgeVariant: 'danger',
      title: 'Ação necessária',
      desc:  'Ocorreu um problema que precisa da sua atenção imediata.',
      btnLabel: 'Resolver', btnVariant: 'danger',
    },
    {
      name: 'Sem Badge',
      badgeLabel: null,
      title: 'Card simples',
      desc:  'Um card sem badge e sem botão de ação.',
      btnLabel: null,
    },
  ];

  var container = makeContainer('Card');
  container.layoutMode = 'VERTICAL';
  container.counterAxisAlignItems = 'MIN';
  container.itemSpacing = 20;

  for (var i = 0; i < defs.length; i++) {
    var d = defs[i];
    var c = figma.createComponent();
    c.name = d.name;
    c.layoutMode = 'VERTICAL';
    c.primaryAxisSizingMode = 'AUTO';
    c.counterAxisSizingMode = 'FIXED';
    c.resize(320, 100);
    c.paddingTop = 24; c.paddingBottom = 24;
    c.paddingLeft = 24; c.paddingRight = 24;
    c.itemSpacing = 12;
    c.primaryAxisAlignItems = 'MIN';
    c.counterAxisAlignItems = 'MIN';
    c.cornerRadius = RADIUS.lg;
    c.effects = SHADOWS.md;
    c.fills   = [{ type: 'SOLID', color: hexToRgb(COLORS.cardBg), opacity: 1 }];
    c.strokes = [{ type: 'SOLID', color: hexToRgb(COLORS.border), opacity: 1 }];
    c.strokeWeight = 1; c.strokeAlign = 'INSIDE';

    // Badge opcional
    if (d.badgeLabel) {
      var badgeFrame = figma.createFrame();
      autoLayout(badgeFrame, 'HORIZONTAL', 4, 10, 0);
      badgeFrame.cornerRadius = RADIUS.full;
      badgeFrame.fills = [solidWithOpacity(VARIANT_HEX[d.badgeVariant], 0.12)];

      var badgeTxt = figma.createText();
      badgeTxt.fontName   = { family: 'Inter', style: 'Medium' };
      badgeTxt.fontSize   = FONT.sm;
      badgeTxt.characters = d.badgeLabel;
      badgeTxt.fills      = [bindColor(cv[VARIANT_VAR[d.badgeVariant]], VARIANT_HEX[d.badgeVariant])];
      badgeFrame.appendChild(badgeTxt);
      c.appendChild(badgeFrame);
    }

    // Título
    var title = figma.createText();
    title.fontName   = { family: 'Inter', style: 'Bold' };
    title.fontSize   = FONT.lg;
    title.characters = d.title;
    title.fills      = [{ type: 'SOLID', color: hexToRgb(COLORS.textDark), opacity: 1 }];
    c.appendChild(title);
    title.layoutSizingHorizontal = 'FILL';

    // Descrição
    var desc = figma.createText();
    desc.fontName   = { family: 'Inter', style: 'Regular' };
    desc.fontSize   = FONT.sm;
    desc.characters = d.desc;
    desc.fills      = [{ type: 'SOLID', color: hexToRgb(COLORS.textMuted), opacity: 1 }];
    desc.lineHeight = { unit: 'PERCENT', value: 150 };
    c.appendChild(desc);
    desc.layoutSizingHorizontal = 'FILL';

    // Button opcional
    if (d.btnLabel) {
      var btn = figma.createFrame();
      autoLayout(btn, 'HORIZONTAL', 10, 20, 0);
      btn.cornerRadius = RADIUS.md;
      btn.fills = [bindColor(cv[VARIANT_VAR[d.btnVariant]], VARIANT_HEX[d.btnVariant])];

      var btnTxt = figma.createText();
      btnTxt.fontName   = { family: 'Inter', style: 'Regular' };
      btnTxt.fontSize   = FONT.sm;
      btnTxt.characters = d.btnLabel;
      btnTxt.fills      = [{ type: 'SOLID', color: hexToRgb(COLORS.white), opacity: 1 }];
      btn.appendChild(btnTxt);
      c.appendChild(btn);
      btn.layoutSizingHorizontal = 'FILL';
    }

    container.appendChild(c);
  }
  return container;
}

// ── Input ────────────────────────────────────────────────────────
// Espelho de Input.tsx: label + field (gap 6), padding 10×14, radius md
// Default: border 1.5px #d1d5db | Disabled: border #e5e7eb, bg #f9fafb
async function buildInput(cv, fv) {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  var defs = [
    {
      name:       'Default',
      label:      'E-mail',
      placeholder:'Digite aqui...',
      borderHex:  COLORS.border,
      borderVar:  'color/border',
      bgHex:      COLORS.inputBg,
      bgVar:      'color/surface',
      labelHex:   COLORS.textDark,
      textHex:    COLORS.textMuted,
      disabled:   false,
    },
    {
      name:       'Password',
      label:      'Senha',
      placeholder:'••••••••',
      borderHex:  COLORS.border,
      borderVar:  'color/border',
      bgHex:      COLORS.inputBg,
      bgVar:      'color/surface',
      labelHex:   COLORS.textDark,
      textHex:    COLORS.textMuted,
      disabled:   false,
    },
    {
      name:       'Disabled',
      label:      'Campo desabilitado',
      placeholder:'Campo desabilitado',
      borderHex:  COLORS.border,
      borderVar:  'color/border',
      bgHex:      COLORS.disabledBg,
      bgVar:      'color/bgSecondary',
      labelHex:   COLORS.textMuted,
      textHex:    COLORS.textMuted,
      disabled:   true,
    },
  ];

  var container = makeContainer('Input');
  container.layoutMode = 'VERTICAL';
  container.counterAxisAlignItems = 'MIN';
  container.itemSpacing = 20;

  for (var i = 0; i < defs.length; i++) {
    var d = defs[i];
    var c = figma.createComponent();
    c.name = d.name;
    c.layoutMode = 'VERTICAL';
    c.primaryAxisSizingMode = 'AUTO';
    c.counterAxisSizingMode = 'FIXED';
    c.resize(280, 100);
    c.itemSpacing = 6;
    c.primaryAxisAlignItems = 'MIN';
    c.counterAxisAlignItems = 'MIN';
    c.fills = [];

    // Label
    var lbl = figma.createText();
    lbl.fontName   = { family: 'Inter', style: 'Regular' };
    lbl.fontSize   = FONT.sm;
    lbl.characters = d.label;
    lbl.fills      = [{ type: 'SOLID', color: hexToRgb(d.labelHex), opacity: 1 }];
    c.appendChild(lbl);
    lbl.layoutSizingHorizontal = 'FILL';

    // Field
    var field = figma.createFrame();
    field.layoutMode = 'HORIZONTAL';
    field.primaryAxisSizingMode = 'AUTO';
    field.counterAxisSizingMode = 'AUTO';
    field.paddingTop = 10; field.paddingBottom = 10;
    field.paddingLeft = 14; field.paddingRight = 14;
    field.cornerRadius = RADIUS.md;
    field.effects = SHADOWS.sm;
    field.fills   = [bindColor(cv[d.bgVar], d.bgHex)];
    field.strokes = [bindColor(cv[d.borderVar], d.borderHex)];
    field.strokeWeight = 1.5; field.strokeAlign = 'INSIDE';

    var placeholder = figma.createText();
    placeholder.fontName   = { family: 'Inter', style: 'Regular' };
    placeholder.fontSize   = FONT.md;
    placeholder.characters = d.placeholder;
    placeholder.fills      = [{ type: 'SOLID', color: hexToRgb(d.textHex), opacity: 1 }];
    field.appendChild(placeholder);

    c.appendChild(field);
    field.layoutSizingHorizontal = 'FILL';
    if (d.disabled) c.opacity = 0.65;
    container.appendChild(c);
  }
  return container;
}

// ── Select ───────────────────────────────────────────────────────
// Espelho de Select.tsx: label + field com chevron à direita, padding 10×14, radius md
// Estados: Default (placeholder) · Selected (valor escolhido) · Disabled
async function buildSelect(cv, fv) {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  var defs = [
    {
      name:      'Default',
      label:     'Categoria',
      value:     'Selecione...',
      borderHex: COLORS.border,
      borderVar: 'color/border',
      bgHex:     COLORS.inputBg,
      bgVar:     'color/surface',
      labelHex:  COLORS.textDark,
      valueHex:  COLORS.textMuted,
      disabled:  false,
    },
    {
      name:      'Selected',
      label:     'Categoria',
      value:     'Opção 1',
      borderHex: COLORS.actionPrimary,
      borderVar: 'color/actionPrimary',
      bgHex:     COLORS.inputBg,
      bgVar:     'color/surface',
      labelHex:  COLORS.textDark,
      valueHex:  COLORS.textDark,
      disabled:  false,
    },
    {
      name:      'Disabled',
      label:     'Campo bloqueado',
      value:     'Indisponível',
      borderHex: COLORS.border,
      borderVar: 'color/border',
      bgHex:     COLORS.disabledBg,
      bgVar:     'color/bgSecondary',
      labelHex:  COLORS.textMuted,
      valueHex:  COLORS.textMuted,
      disabled:  true,
    },
  ];

  var container = makeContainer('Select');
  container.layoutMode = 'VERTICAL';
  container.counterAxisAlignItems = 'MIN';
  container.itemSpacing = 20;

  for (var i = 0; i < defs.length; i++) {
    var d = defs[i];
    var c = figma.createComponent();
    c.name = d.name;
    c.layoutMode = 'VERTICAL';
    c.primaryAxisSizingMode = 'AUTO';
    c.counterAxisSizingMode = 'FIXED';
    c.resize(280, 100);
    c.itemSpacing = 6;
    c.primaryAxisAlignItems = 'MIN';
    c.counterAxisAlignItems = 'MIN';
    c.fills = [];

    // Label
    var lbl = figma.createText();
    lbl.fontName   = { family: 'Inter', style: 'Regular' };
    lbl.fontSize   = FONT.sm;
    lbl.characters = d.label;
    lbl.fills      = [{ type: 'SOLID', color: hexToRgb(d.labelHex), opacity: 1 }];
    c.appendChild(lbl);
    lbl.layoutSizingHorizontal = 'FILL';

    // Field
    var field = figma.createFrame();
    field.layoutMode = 'HORIZONTAL';
    field.primaryAxisSizingMode = 'AUTO';
    field.counterAxisSizingMode = 'AUTO';
    field.paddingTop = 10; field.paddingBottom = 10;
    field.paddingLeft = 14; field.paddingRight = 14;
    field.itemSpacing = 8;
    field.primaryAxisAlignItems = 'CENTER';
    field.counterAxisAlignItems = 'CENTER';
    field.cornerRadius = RADIUS.md;
    field.effects = SHADOWS.sm;
    field.fills   = [bindColor(cv[d.bgVar], d.bgHex)];
    field.strokes = [bindColor(cv[d.borderVar], d.borderHex)];
    field.strokeWeight = 1.5; field.strokeAlign = 'INSIDE';

    // Texto do valor
    var valueTxt = figma.createText();
    valueTxt.fontName   = { family: 'Inter', style: 'Regular' };
    valueTxt.fontSize   = FONT.md;
    valueTxt.characters = d.value;
    valueTxt.fills      = [{ type: 'SOLID', color: hexToRgb(d.valueHex), opacity: 1 }];
    field.appendChild(valueTxt);
    valueTxt.layoutGrow = 1;

    // Chevron (▾)
    var chevron = figma.createText();
    chevron.fontName   = { family: 'Inter', style: 'Regular' };
    chevron.fontSize   = FONT.md;
    chevron.characters = '▾';
    chevron.fills      = [bindColor(cv['color/neutral'], COLORS.neutral)];
    field.appendChild(chevron);

    c.appendChild(field);
    field.layoutSizingHorizontal = 'FILL';

    if (d.disabled) c.opacity = 0.65;
    container.appendChild(c);
  }
  return container;
}

// ════════════════════════════════════════════════════════════════
// HANDLER
// ════════════════════════════════════════════════════════════════
figma.ui.onmessage = async function(msg) {

  // ── Token Sync ───────────────────────────────────────────────
  if (msg.type === 'sync-tokens-v2') {
    var syncMode = msg.mode || 'both';
    var opts     = msg.options || {};
    var lightTok = msg.light || {};
    var darkTok  = msg.dark  || {};
    var results  = { colors: 0, texts: 0, variables: 0, modes: '', errors: [] };

    // 1. Paint Styles (tema Light)
    if (opts.paintStyles !== false) {
      try {
        var colorFlat   = flattenTokens(lightTok).filter(function(t){ return t.type === 'color'; });
        var existPaints = await figma.getLocalPaintStylesAsync();
        var paintMap = {};
        for (var i = 0; i < existPaints.length; i++) paintMap[existPaints[i].name] = existPaints[i];

        for (var i = 0; i < colorFlat.length; i++) {
          var tk = colorFlat[i];
          try {
            var hex = String(tk.value).trim();
            if (hex.indexOf('#') !== 0) continue;
            var styleName = NS + '/' + tk.path;
            var s = paintMap[styleName] || figma.createPaintStyle();
            s.name   = styleName;
            s.paints = [{ type: 'SOLID', color: hexToRgb(hex), opacity: 1 }];
            results.colors++;
          } catch(e) { results.errors.push('Style ' + tk.path + ': ' + String(e)); }
        }
      } catch(e) { results.errors.push('PaintStyles: ' + String(e)); }
    }

    // 2. Text Styles
    if (opts.textStyles !== false) {
      try {
        var fontDefs = [
          { name: NS + '/display', size: FONT.display, weight: 800, lh: 110 },
          { name: NS + '/h1',      size: FONT.h1,      weight: 700, lh: 120 },
          { name: NS + '/h2',      size: FONT.h2,      weight: 700, lh: 125 },
          { name: NS + '/h3',      size: FONT.h3,      weight: 600, lh: 130 },
          { name: NS + '/h4',      size: FONT.h4,      weight: 600, lh: 140 },
          { name: NS + '/body-lg', size: FONT.bodyLg,  weight: 400, lh: 160 },
          { name: NS + '/body',    size: FONT.body,    weight: 400, lh: 160 },
          { name: NS + '/caption', size: FONT.caption, weight: 400, lh: 150 },
          { name: NS + '/mono',    size: FONT.mono,    weight: 400, lh: 150 },
        ];
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
        await figma.loadFontAsync({ family: 'Inter', style: 'SemiBold' });
        var existTexts = await figma.getLocalTextStylesAsync();
        var textMap = {};
        for (var i = 0; i < existTexts.length; i++) textMap[existTexts[i].name] = existTexts[i];

        for (var i = 0; i < fontDefs.length; i++) {
          var fd = fontDefs[i];
          try {
            var ts = textMap[fd.name] || figma.createTextStyle();
            ts.name       = fd.name;
            ts.fontSize   = fd.size;
            ts.fontName   = { family: 'Inter', style: 'Regular' };
            ts.lineHeight = { unit: 'PERCENT', value: fd.lh };
            results.texts++;
          } catch(e) { results.errors.push('TextStyle ' + fd.name + ': ' + String(e)); }
        }
      } catch(e) { results.errors.push('TextStyles: ' + String(e)); }
    }

    // 3. Variables (Color + Float)
    if (opts.variables !== false) {
      try {
        var cols = await figma.variables.getLocalVariableCollectionsAsync();
        var col  = null;
        for (var i = 0; i < cols.length; i++) {
          if (cols[i].name === NS) { col = cols[i]; break; }
        }
        if (!col) col = figma.variables.createVariableCollection(NS);

        var lightModeId = col.defaultModeId;
        try { col.renameMode(lightModeId, 'Light'); } catch(e) {}

        var darkModeId = null;
        if (syncMode === 'both' || syncMode === 'dark') {
          var existModes = col.modes || [];
          for (var i = 0; i < existModes.length; i++) {
            if (existModes[i].name === 'Dark') { darkModeId = existModes[i].modeId; break; }
          }
          if (!darkModeId) {
            try { darkModeId = col.addMode('Dark'); } catch(e) {}
          }
        }

        results.modes = syncMode === 'both' ? 'Light + Dark' : (syncMode === 'dark' ? 'Dark' : 'Light');

        var lightColorFlat = flattenTokens(lightTok).filter(function(t){ return t.type === 'color'; });
        var darkColorFlat  = flattenTokens(darkTok).filter(function(t){  return t.type === 'color'; });

        var darkMap = {};
        for (var i = 0; i < darkColorFlat.length; i++) darkMap[darkColorFlat[i].path] = darkColorFlat[i];

        var existCV = await figma.variables.getLocalVariablesAsync('COLOR');
        var cvMap = {};
        for (var i = 0; i < existCV.length; i++) {
          if (existCV[i].variableCollectionId === col.id) cvMap[existCV[i].name] = existCV[i];
        }

        for (var i = 0; i < lightColorFlat.length; i++) {
          var tk = lightColorFlat[i];
          try {
            var varName = 'color/' + tk.path;
            var v = cvMap[varName] || figma.variables.createVariable(varName, col, 'COLOR');
            if (syncMode === 'light' || syncMode === 'both') {
              var lhex = String(tk.value).trim();
              if (lhex.indexOf('#') === 0) {
                var lrgb = hexToRgb(lhex);
                v.setValueForMode(lightModeId, { r:lrgb.r, g:lrgb.g, b:lrgb.b, a:1 });
              }
            }
            if (darkModeId && (syncMode === 'dark' || syncMode === 'both')) {
              var matchDark = darkMap[tk.path];
              var dhex = matchDark ? String(matchDark.value).trim() : String(tk.value).trim();
              if (dhex.indexOf('#') === 0) {
                var drgb = hexToRgb(dhex);
                v.setValueForMode(darkModeId, { r:drgb.r, g:drgb.g, b:drgb.b, a:1 });
              }
            }
            results.variables++;
          } catch(e) { results.errors.push('Var ' + tk.path + ': ' + String(e)); }
        }

        // Float vars: spacing + radius
        var numFlat = flattenTokens(lightTok).filter(function(t){
          return t.type === 'spacing' || t.type === 'borderRadius';
        });
        var existFV = await figma.variables.getLocalVariablesAsync('FLOAT');
        var fvMap = {};
        for (var i = 0; i < existFV.length; i++) {
          if (existFV[i].variableCollectionId === col.id) fvMap[existFV[i].name] = existFV[i];
        }
        for (var i = 0; i < numFlat.length; i++) {
          var tk = numFlat[i];
          try {
            var v = fvMap[tk.path] || figma.variables.createVariable(tk.path, col, 'FLOAT');
            var num = pxToNum(tk.value);
            v.setValueForMode(lightModeId, num);
            if (darkModeId) v.setValueForMode(darkModeId, num);
            results.variables++;
          } catch(e) {}
        }
      } catch(e) { results.errors.push('Variables: ' + String(e)); }
    }

    figma.ui.postMessage({ type: 'sync-done', results: results });
  }

  // ── Build Components ─────────────────────────────────────────
  if (msg.type === 'build-components') {
    var results = { built: [], errors: [] };
    try {
      var cvArr = await figma.variables.getLocalVariablesAsync('COLOR');
      var fvArr = await figma.variables.getLocalVariablesAsync('FLOAT');
      var cv = buildVarMap(cvArr);
      var fv = buildVarMap(fvArr);

      var BUILDERS = {
        button: buildButton,
        badge:  buildBadge,
        card:   buildCard,
        input:  buildInput,
        select: buildSelect,
      };

      var offsetY  = 0;
      var selected = msg.selected;
      for (var i = 0; i < selected.length; i++) {
        var name = selected[i];
        try {
          var builder = BUILDERS[name];
          if (!builder) continue;
          var container = await builder(cv, fv);
          if (container) {
            container.x = 100;
            container.y = offsetY + 100;
            offsetY += container.height + 60;
            results.built.push(name);
          }
        } catch(e) { results.errors.push(name + ': ' + String(e)); }
      }
      if (results.built.length > 0) {
        figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
      }
    } catch(e) { results.errors.push('Geral: ' + String(e)); }
    figma.ui.postMessage({ type: 'build-done', results: results });
  }

  if (msg.type === 'close') figma.closePlugin();
};
