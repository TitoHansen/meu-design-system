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

// Paletas de tema — sobrescrevem COLORS antes de cada builder
var COLORS_LIGHT = {
  cardBg:    '#FFFFFF', inputBg:  '#FFFFFF', disabledBg: '#F2F2F2',
  textDark:  '#1C274D', textMuted: '#3A3F4B',
  border:    '#D6DEF5', borderStrong: '#D6DEF5',
};
var COLORS_DARK = {
  cardBg:    '#092640', inputBg:  '#092640', disabledBg: '#0F1117',
  textDark:  '#F2F2F2', textMuted: '#8C92A3',
  border:    '#3A3F4B', borderStrong: '#3A3F4B',
};

function applyPalette(palette) {
  Object.keys(palette).forEach(function(k) { COLORS[k] = palette[k]; });
}

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
  warning: 'color/warning',
  neutral: 'color/textSecondary',
};

var VARIANT_HEX = {
  brand:   COLORS.actionPrimary,
  danger:  COLORS.error,
  success: COLORS.success,
  warning: COLORS.warning,
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
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });

  var variants = ['brand', 'danger', 'success', 'warning', 'neutral'];
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
    txt.fontName   = { family: 'Mulish', style: 'Regular' };
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
  await figma.loadFontAsync({ family: 'Mulish', style: 'SemiBold' });

  var LABELS = { brand: 'Novo', danger: 'Erro', success: 'Ativo', warning: 'Alerta', neutral: 'Rascunho' };
  var variants = ['brand', 'danger', 'success', 'warning', 'neutral'];
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
    txt.fontName   = { family: 'Mulish', style: 'SemiBold' };
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
  await figma.loadFontAsync({ family: 'Mulish', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Mulish', style: 'SemiBold' });

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
      badgeTxt.fontName   = { family: 'Mulish', style: 'SemiBold' };
      badgeTxt.fontSize   = FONT.sm;
      badgeTxt.characters = d.badgeLabel;
      badgeTxt.fills      = [bindColor(cv[VARIANT_VAR[d.badgeVariant]], VARIANT_HEX[d.badgeVariant])];
      badgeFrame.appendChild(badgeTxt);
      c.appendChild(badgeFrame);
    }

    // Título
    var title = figma.createText();
    title.fontName   = { family: 'Mulish', style: 'Bold' };
    title.fontSize   = FONT.lg;
    title.characters = d.title;
    title.fills      = [{ type: 'SOLID', color: hexToRgb(COLORS.textDark), opacity: 1 }];
    c.appendChild(title);
    title.layoutSizingHorizontal = 'FILL';

    // Descrição
    var desc = figma.createText();
    desc.fontName   = { family: 'Mulish', style: 'Regular' };
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
      btnTxt.fontName   = { family: 'Mulish', style: 'Regular' };
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
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });

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
    lbl.fontName   = { family: 'Mulish', style: 'Regular' };
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
    field.fills   = [{ type: 'SOLID', color: hexToRgb(d.bgHex), opacity: 1 }];
    field.strokes = [{ type: 'SOLID', color: hexToRgb(d.borderHex), opacity: 1 }];
    field.strokeWeight = 1.5; field.strokeAlign = 'INSIDE';

    var placeholder = figma.createText();
    placeholder.fontName   = { family: 'Mulish', style: 'Regular' };
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
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Mulish', style: 'SemiBold' });

  var OPTIONS = ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'];

  var defs = [
    { name: 'Default',  label: 'Categoria',     value: 'Selecione...', borderHex: COLORS.border,        borderVar: 'color/border',        bgHex: COLORS.inputBg,    labelHex: COLORS.textDark, valueHex: COLORS.textMuted, disabled: false, open: false },
    { name: 'Selected', label: 'Categoria',     value: 'Opção 1',      borderHex: COLORS.actionPrimary, borderVar: 'color/actionPrimary', bgHex: COLORS.inputBg,    labelHex: COLORS.textDark, valueHex: COLORS.textDark,  disabled: false, open: false },
    { name: 'Open',     label: 'Categoria',     value: 'Selecione...', borderHex: COLORS.actionPrimary, borderVar: 'color/actionPrimary', bgHex: COLORS.inputBg,    labelHex: COLORS.textDark, valueHex: COLORS.textMuted, disabled: false, open: true  },
    { name: 'Disabled', label: 'Campo bloqueado', value: 'Indisponível', borderHex: COLORS.border,      borderVar: 'color/border',        bgHex: COLORS.disabledBg, labelHex: COLORS.textMuted, valueHex: COLORS.textMuted, disabled: true, open: false },
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
    c.itemSpacing = 0;
    c.primaryAxisAlignItems = 'MIN';
    c.counterAxisAlignItems = 'MIN';
    c.fills = [];
    c.clipsContent = false;

    // Wrapper label + field
    var wrapper = figma.createFrame();
    wrapper.layoutMode = 'VERTICAL';
    wrapper.primaryAxisSizingMode = 'AUTO';
    wrapper.counterAxisSizingMode = 'AUTO';
    wrapper.itemSpacing = 6;
    wrapper.fills = [];

    // Label
    var lbl = figma.createText();
    lbl.fontName   = { family: 'Mulish', style: 'Regular' };
    lbl.fontSize   = FONT.sm;
    lbl.characters = d.label;
    lbl.fills      = [{ type: 'SOLID', color: hexToRgb(d.labelHex), opacity: 1 }];
    wrapper.appendChild(lbl);

    // Field (trigger)
    var field = figma.createFrame();
    field.layoutMode = 'HORIZONTAL';
    field.primaryAxisSizingMode = 'FIXED';
    field.counterAxisSizingMode = 'AUTO';
    field.resize(280, 40);
    field.paddingTop = 10; field.paddingBottom = 10;
    field.paddingLeft = 14; field.paddingRight = 14;
    field.itemSpacing = 8;
    field.primaryAxisAlignItems = 'CENTER';
    field.counterAxisAlignItems = 'CENTER';
    field.cornerRadius = d.open ? RADIUS.md : RADIUS.md;
    field.effects = SHADOWS.sm;
    field.fills   = [{ type: 'SOLID', color: hexToRgb(d.bgHex), opacity: 1 }];
    field.strokes = [{ type: 'SOLID', color: hexToRgb(d.borderHex), opacity: 1 }];
    field.strokeWeight = 1.5; field.strokeAlign = 'INSIDE';

    var valueTxt = figma.createText();
    valueTxt.fontName   = { family: 'Mulish', style: 'Regular' };
    valueTxt.fontSize   = FONT.md;
    valueTxt.characters = d.value;
    valueTxt.fills      = [{ type: 'SOLID', color: hexToRgb(d.valueHex), opacity: 1 }];
    field.appendChild(valueTxt);
    valueTxt.layoutGrow = 1;

    // Chevron — ▴ quando aberto, ▾ quando fechado
    var chevron = figma.createText();
    chevron.fontName   = { family: 'Mulish', style: 'Regular' };
    chevron.fontSize   = FONT.md;
    chevron.characters = d.open ? '▴' : '▾';
    chevron.fills      = [{ type: 'SOLID', color: hexToRgb(COLORS.textMuted), opacity: 1 }];
    field.appendChild(chevron);

    wrapper.appendChild(field);
    c.appendChild(wrapper);
    wrapper.layoutSizingHorizontal = 'FILL';

    // Dropdown panel — só no estado Open
    if (d.open) {
      var panel = figma.createFrame();
      panel.layoutMode = 'VERTICAL';
      panel.primaryAxisSizingMode = 'AUTO';
      panel.counterAxisSizingMode = 'FIXED';
      panel.resize(280, 40);
      panel.paddingTop = 4; panel.paddingBottom = 4;
      panel.itemSpacing = 0;
      panel.cornerRadius = RADIUS.md;
      panel.effects = SHADOWS.lg;
      panel.fills   = [{ type: 'SOLID', color: hexToRgb(COLORS.cardBg), opacity: 1 }];
      panel.strokes = [{ type: 'SOLID', color: hexToRgb(COLORS.border), opacity: 1 }];
      panel.strokeWeight = 1; panel.strokeAlign = 'OUTSIDE';

      for (var j = 0; j < OPTIONS.length; j++) {
        var optRow = figma.createFrame();
        optRow.layoutMode = 'HORIZONTAL';
        optRow.primaryAxisSizingMode = 'FIXED';
        optRow.counterAxisSizingMode = 'AUTO';
        optRow.resize(280, 36);
        optRow.paddingTop = 10; optRow.paddingBottom = 10;
        optRow.paddingLeft = 14; optRow.paddingRight = 14;
        optRow.primaryAxisAlignItems = 'CENTER';
        // Primeira opção em hover (destaque azul suave)
        optRow.fills = j === 0
          ? [{ type: 'SOLID', color: hexToRgb(COLORS.blue100), opacity: 1 }]
          : [{ type: 'SOLID', color: { r:0, g:0, b:0 }, opacity: 0 }];

        var optTxt = figma.createText();
        optTxt.fontName   = j === 0
          ? { family: 'Mulish', style: 'SemiBold' }
          : { family: 'Mulish', style: 'Regular' };
        optTxt.fontSize   = FONT.md;
        optTxt.characters = OPTIONS[j];
        optTxt.fills      = [{ type: 'SOLID', color: hexToRgb(j === 0 ? COLORS.actionPrimary : COLORS.textDark), opacity: 1 }];
        optRow.appendChild(optTxt);
        panel.appendChild(optRow);
        optRow.layoutSizingHorizontal = 'FILL';
      }

      c.appendChild(panel);
      panel.layoutSizingHorizontal = 'FILL';
    }

    if (d.disabled) c.opacity = 0.65;
    container.appendChild(c);
  }
  return container;
}

// ── Spinner ──────────────────────────────────────────────────────
async function buildSpinner(cv, fv) {
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });

  var sizes    = [{ name: 'SM', px: 16, stroke: 2 }, { name: 'MD', px: 24, stroke: 3 }, { name: 'LG', px: 40, stroke: 4 }];
  var variants = [{ name: 'Brand', color: COLORS.actionPrimary }, { name: 'Neutral', color: COLORS.textSecondary }];
  var container = makeContainer('Spinner');

  for (var v = 0; v < variants.length; v++) {
    for (var s = 0; s < sizes.length; s++) {
      var sz = sizes[s]; var vt = variants[v];
      var c = figma.createComponent();
      c.name = vt.name + ' / ' + sz.name;
      c.resize(sz.px, sz.px);
      c.cornerRadius = sz.px / 2;
      c.fills = [{ type: 'SOLID', color: hexToRgb(vt.color), opacity: 0.12 }];
      c.strokes = [{ type: 'SOLID', color: hexToRgb(vt.color), opacity: 1 }];
      c.strokeWeight = sz.stroke;
      c.strokeAlign = 'INSIDE';
      c.dashPattern = [sz.px * 0.6, sz.px * 2];
      container.appendChild(c);
    }
  }
  return container;
}

// ── Checkbox ─────────────────────────────────────────────────────
async function buildCheckbox(cv, fv) {
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });

  var defs = [
    { name: 'Default',          checked: false, disabled: false },
    { name: 'Checked',          checked: true,  disabled: false },
    { name: 'Disabled',         checked: false, disabled: true  },
    { name: 'Disabled Checked', checked: true,  disabled: true  },
  ];

  var container = makeContainer('Checkbox');
  container.layoutMode = 'VERTICAL';
  container.counterAxisAlignItems = 'MIN';
  container.itemSpacing = 16;

  for (var i = 0; i < defs.length; i++) {
    var d = defs[i];
    var c = figma.createComponent();
    c.name = d.name;
    autoLayout(c, 'HORIZONTAL', 0, 0, 8);
    c.fills = [];
    if (d.disabled) c.opacity = 0.65;

    // Box
    var box = figma.createFrame();
    box.resize(18, 18);
    box.cornerRadius = RADIUS.xs;
    box.fills   = d.checked ? [{ type: 'SOLID', color: hexToRgb(COLORS.actionPrimary), opacity: 1 }] : [{ type: 'SOLID', color: { r:1,g:1,b:1 }, opacity: 1 }];
    box.strokes = [{ type: 'SOLID', color: hexToRgb(d.checked ? COLORS.actionPrimary : COLORS.borderStrong), opacity: 1 }];
    box.strokeWeight = 2; box.strokeAlign = 'INSIDE';
    box.clipsContent = false;

    if (d.checked) {
      var check = figma.createVector();
      check.vectorPaths = [{ windingRule: 'NONE', data: 'M 2 9 L 6 13 L 14 5' }];
      check.strokes = [{ type: 'SOLID', color: { r:1, g:1, b:1 }, opacity: 1 }];
      check.strokeWeight = 2;
      check.strokeCap = 'ROUND';
      check.strokeJoin = 'ROUND';
      check.fills = [];
      check.resize(12, 10);
      check.x = 3;
      check.y = 4;
      box.appendChild(check);
    }
    c.appendChild(box);

    // Label
    var lbl = figma.createText();
    lbl.fontName = { family: 'Mulish', style: 'Regular' };
    lbl.fontSize = FONT.sm;
    lbl.characters = d.checked ? 'Opção selecionada' : 'Opção disponível';
    lbl.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.textDark), opacity: 1 }];
    c.appendChild(lbl);

    container.appendChild(c);
  }
  return container;
}

// ── Toggle ───────────────────────────────────────────────────────
async function buildToggle(cv, fv) {
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });

  var defs = [
    { name: 'Off',      checked: false, disabled: false },
    { name: 'On',       checked: true,  disabled: false },
    { name: 'Disabled', checked: false, disabled: true  },
  ];

  var container = makeContainer('Toggle');
  container.layoutMode = 'VERTICAL';
  container.counterAxisAlignItems = 'MIN';
  container.itemSpacing = 16;

  for (var i = 0; i < defs.length; i++) {
    var d = defs[i];
    var c = figma.createComponent();
    c.name = d.name;
    autoLayout(c, 'HORIZONTAL', 0, 0, 8);
    c.fills = [];
    if (d.disabled) c.opacity = 0.65;

    // Track
    var track = figma.createFrame();
    track.resize(44, 24);
    track.cornerRadius = RADIUS.full;
    track.fills = [{ type: 'SOLID', color: hexToRgb(d.checked ? COLORS.actionPrimary : COLORS.borderStrong), opacity: 1 }];

    // Thumb
    var thumb = figma.createFrame();
    thumb.resize(20, 20);
    thumb.cornerRadius = RADIUS.full;
    thumb.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.white), opacity: 1 }];
    thumb.x = d.checked ? 22 : 2;
    thumb.y = 2;
    track.appendChild(thumb);
    c.appendChild(track);

    // Label
    var lbl = figma.createText();
    lbl.fontName = { family: 'Mulish', style: 'Regular' };
    lbl.fontSize = FONT.sm;
    lbl.characters = d.checked ? 'Ativado' : 'Desativado';
    lbl.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.textDark), opacity: 1 }];
    c.appendChild(lbl);

    container.appendChild(c);
  }
  return container;
}

// ── Toast ────────────────────────────────────────────────────────
async function buildToast(cv, fv) {
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Mulish', style: 'Bold' });

  var defs = [
    { name: 'Success', bg: COLORS.successBg, border: COLORS.success, icon: '✓', iconBg: COLORS.success,         msg: 'Operação realizada com sucesso!' },
    { name: 'Error',   bg: COLORS.errorBg,   border: COLORS.error,   icon: '✕', iconBg: COLORS.error,           msg: 'Ocorreu um erro. Tente novamente.' },
    { name: 'Warning', bg: COLORS.warningBg, border: COLORS.warning, icon: '!', iconBg: COLORS.warning,         msg: 'Atenção: esta ação não pode ser desfeita.' },
    { name: 'Info',    bg: COLORS.blue100,   border: COLORS.actionPrimary, icon: 'i', iconBg: COLORS.actionPrimary, msg: 'Seu relatório está sendo processado.' },
  ];

  var container = makeContainer('Toast');
  container.layoutMode = 'VERTICAL';
  container.counterAxisAlignItems = 'MIN';
  container.itemSpacing = 12;

  for (var i = 0; i < defs.length; i++) {
    var d = defs[i];
    var c = figma.createComponent();
    c.name = d.name;
    c.layoutMode = 'HORIZONTAL';
    c.primaryAxisSizingMode = 'FIXED';
    c.counterAxisSizingMode = 'AUTO';
    c.resize(380, 40);
    c.paddingTop = 12; c.paddingBottom = 12;
    c.paddingLeft = 16; c.paddingRight = 16;
    c.itemSpacing = 12;
    c.cornerRadius = RADIUS.md;
    c.primaryAxisAlignItems = 'CENTER';
    c.counterAxisAlignItems = 'CENTER';
    c.fills   = [{ type: 'SOLID', color: hexToRgb(d.bg), opacity: 1 }];
    c.strokes = [{ type: 'SOLID', color: hexToRgb(d.border), opacity: 1 }];
    c.strokeWeight = 1; c.strokeAlign = 'INSIDE';
    c.effects = SHADOWS.sm;

    // Ícone circular
    var iconFrame = figma.createFrame();
    iconFrame.resize(20, 20);
    iconFrame.cornerRadius = RADIUS.full;
    iconFrame.fills = [{ type: 'SOLID', color: hexToRgb(d.iconBg), opacity: 1 }];
    iconFrame.layoutMode = 'HORIZONTAL';
    iconFrame.primaryAxisSizingMode = 'FIXED';
    iconFrame.counterAxisSizingMode = 'FIXED';
    iconFrame.primaryAxisAlignItems = 'CENTER';
    iconFrame.counterAxisAlignItems = 'CENTER';

    var iconTxt = figma.createText();
    iconTxt.fontName = { family: 'Mulish', style: 'Bold' };
    iconTxt.fontSize = 10;
    iconTxt.characters = d.icon;
    iconTxt.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.white), opacity: 1 }];
    iconFrame.appendChild(iconTxt);
    c.appendChild(iconFrame);

    // Mensagem
    var msg = figma.createText();
    msg.fontName = { family: 'Mulish', style: 'Regular' };
    msg.fontSize = FONT.sm;
    msg.characters = d.msg;
    msg.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.textDark), opacity: 1 }];
    c.appendChild(msg);
    msg.layoutGrow = 1;

    container.appendChild(c);
  }
  return container;
}

// ── Avatar ───────────────────────────────────────────────────────
async function buildAvatar(cv, fv) {
  await figma.loadFontAsync({ family: 'Mulish', style: 'Bold' });

  var sizes    = [{ name: 'SM', px: 32, fs: 12 }, { name: 'MD', px: 40, fs: 14 }, { name: 'LG', px: 56, fs: 20 }, { name: 'XL', px: 72, fs: 26 }];
  var variants = [{ name: 'Brand', color: COLORS.actionPrimary }, { name: 'Success', color: COLORS.success }, { name: 'Neutral', color: COLORS.textSecondary }];
  var initials = ['TH', 'AM', 'CS', 'MS'];

  var container = makeContainer('Avatar');
  container.itemSpacing = 24;

  for (var v = 0; v < variants.length; v++) {
    for (var s = 0; s < sizes.length; s++) {
      var sz = sizes[s]; var vt = variants[v];
      var c = figma.createComponent();
      c.name = vt.name + ' / ' + sz.name;
      c.resize(sz.px, sz.px);
      c.cornerRadius = sz.px / 2;
      c.fills = [{ type: 'SOLID', color: hexToRgb(vt.color), opacity: 1 }];
      c.layoutMode = 'HORIZONTAL';
      c.primaryAxisSizingMode = 'FIXED';
      c.counterAxisSizingMode = 'FIXED';
      c.primaryAxisAlignItems = 'CENTER';
      c.counterAxisAlignItems = 'CENTER';

      var txt = figma.createText();
      txt.fontName = { family: 'Mulish', style: 'Bold' };
      txt.fontSize = sz.fs;
      txt.characters = initials[s];
      txt.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.textPrimary), opacity: 1 }];
      c.appendChild(txt);
      container.appendChild(c);
    }
  }
  return container;
}

// ── Modal ────────────────────────────────────────────────────────
async function buildModal(cv, fv) {
  await figma.loadFontAsync({ family: 'Mulish', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });

  var defs = [
    { name: 'Default', title: 'Confirmar operação', body: 'Deseja prosseguir com esta operação?\nEla não poderá ser desfeita.' },
    { name: 'Small',   title: 'Atenção',             body: 'Modal compacto para confirmações rápidas.' },
  ];

  var container = makeContainer('Modal');
  container.layoutMode = 'VERTICAL';
  container.itemSpacing = 24;
  container.counterAxisAlignItems = 'MIN';

  for (var i = 0; i < defs.length; i++) {
    var d = defs[i];
    var c = figma.createComponent();
    c.name = d.name;
    c.layoutMode = 'VERTICAL';
    c.primaryAxisSizingMode = 'AUTO';
    c.counterAxisSizingMode = 'FIXED';
    c.resize(480, 100);
    c.paddingTop = 0; c.paddingBottom = 0;
    c.paddingLeft = 0; c.paddingRight = 0;
    c.itemSpacing = 0;
    c.cornerRadius = RADIUS.xl;
    c.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.cardBg), opacity: 1 }];
    c.strokes = [{ type: 'SOLID', color: hexToRgb(COLORS.border), opacity: 1 }];
    c.strokeWeight = 1; c.strokeAlign = 'INSIDE';
    c.effects = SHADOWS.lg;

    // Header
    var header = figma.createFrame();
    autoLayout(header, 'HORIZONTAL', 16, 24, 8);
    header.layoutSizingHorizontal = 'FILL';
    header.primaryAxisAlignItems = 'SPACE_BETWEEN';
    header.counterAxisAlignItems = 'CENTER';
    header.fills = [];
    header.strokes = [{ type: 'SOLID', color: hexToRgb(COLORS.border), opacity: 1 }];
    header.strokeWeight = 1; header.strokeAlign = 'INSIDE';
    var hTitle = figma.createText();
    hTitle.fontName = { family: 'Mulish', style: 'Bold' };
    hTitle.fontSize = FONT.lg; hTitle.characters = d.title;
    hTitle.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.textDark), opacity: 1 }];
    var hClose = figma.createText();
    hClose.fontName = { family: 'Mulish', style: 'Bold' };
    hClose.fontSize = FONT.lg; hClose.characters = '×';
    hClose.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.textMuted), opacity: 1 }];
    header.appendChild(hTitle); header.appendChild(hClose);
    c.appendChild(header);

    // Body
    var body = figma.createFrame();
    autoLayout(body, 'VERTICAL', 24, 24, 8);
    body.layoutSizingHorizontal = 'FILL';
    body.fills = [];
    var bodyTxt = figma.createText();
    bodyTxt.fontName = { family: 'Mulish', style: 'Regular' };
    bodyTxt.fontSize = FONT.sm; bodyTxt.characters = d.body;
    bodyTxt.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.textMuted), opacity: 1 }];
    body.appendChild(bodyTxt);
    c.appendChild(body);

    container.appendChild(c);
  }
  return container;
}

// ── Table ─────────────────────────────────────────────────────────
async function buildTable(cv, fv) {
  await figma.loadFontAsync({ family: 'Mulish', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });

  var container = makeContainer('Table');
  var c = figma.createComponent();
  c.name = 'Default';
  c.layoutMode = 'VERTICAL';
  c.primaryAxisSizingMode = 'AUTO';
  c.counterAxisSizingMode = 'AUTO';
  c.itemSpacing = 0;
  c.cornerRadius = RADIUS.lg;
  c.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.cardBg), opacity: 1 }];
  c.strokes = [{ type: 'SOLID', color: hexToRgb(COLORS.border), opacity: 1 }];
  c.strokeWeight = 1; c.strokeAlign = 'INSIDE';
  c.clipsContent = true;

  var cols = ['Título', 'Tipo', 'Valor', 'Status'];
  var rows2 = [
    ['Tesouro Selic 2029',  'Pós-fixado', 'R$ 1.200', 'Ativo'],
    ['Tesouro IPCA+ 2035',  'Híbrido',    'R$ 3.500', 'Ativo'],
    ['Tesouro Prefixado',   'Prefixado',  'R$ 800',   'Vencido'],
  ];

  // Header row
  var hRow = figma.createFrame();
  autoLayout(hRow, 'HORIZONTAL', 12, 0, 0);
  hRow.layoutSizingHorizontal = 'HUG';
  hRow.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.cardBg), opacity: 1 }];
  hRow.strokes = [{ type: 'SOLID', color: hexToRgb(COLORS.border), opacity: 1 }];
  hRow.strokeWeight = 2; hRow.strokeAlign = 'INSIDE';
  for (var j = 0; j < cols.length; j++) {
    var cell = figma.createFrame();
    autoLayout(cell, 'HORIZONTAL', 12, 16, 0);
    cell.resize(120, 40);
    cell.fills = [];
    var ct = figma.createText();
    ct.fontName = { family: 'Mulish', style: 'Bold' };
    ct.fontSize = FONT.sm; ct.characters = cols[j];
    ct.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.textDark), opacity: 1 }];
    cell.appendChild(ct); hRow.appendChild(cell);
  }
  c.appendChild(hRow);

  // Data rows
  for (var ri = 0; ri < rows2.length; ri++) {
    var dRow = figma.createFrame();
    autoLayout(dRow, 'HORIZONTAL', 12, 0, 0);
    dRow.layoutSizingHorizontal = 'HUG';
    dRow.fills = [{ type: 'SOLID', color: ri % 2 === 1 ? hexToRgb('#F8F9FA') : hexToRgb(COLORS.cardBg), opacity: 1 }];
    if (ri < rows2.length - 1) {
      dRow.strokes = [{ type: 'SOLID', color: hexToRgb(COLORS.border), opacity: 1 }];
      dRow.strokeWeight = 1; dRow.strokeAlign = 'INSIDE';
    }
    for (var j = 0; j < rows2[ri].length; j++) {
      var cell = figma.createFrame();
      autoLayout(cell, 'HORIZONTAL', 12, 16, 0);
      cell.resize(120, 40);
      cell.fills = [];
      var ct = figma.createText();
      ct.fontName = { family: 'Mulish', style: 'Regular' };
      ct.fontSize = FONT.sm; ct.characters = rows2[ri][j];
      ct.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.textMuted), opacity: 1 }];
      cell.appendChild(ct); dRow.appendChild(cell);
    }
    c.appendChild(dRow);
  }
  container.appendChild(c);
  return container;
}

// ── Tabs ──────────────────────────────────────────────────────────
async function buildTabs(cv, fv) {
  await figma.loadFontAsync({ family: 'Mulish', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });

  var tabs = ['Visão Geral', 'Histórico', 'Documentos'];
  var container = makeContainer('Tabs');
  var c = figma.createComponent();
  c.name = 'Default';
  c.layoutMode = 'VERTICAL';
  c.primaryAxisSizingMode = 'AUTO';
  c.counterAxisSizingMode = 'FIXED';
  c.resize(480, 100);
  c.itemSpacing = 0;
  c.fills = [];

  // Tab list
  var tabList = figma.createFrame();
  autoLayout(tabList, 'HORIZONTAL', 0, 0, 0);
  tabList.layoutSizingHorizontal = 'FILL';
  tabList.fills = [];
  tabList.strokes = [{ type: 'SOLID', color: hexToRgb(COLORS.border), opacity: 1 }];
  tabList.strokeWeight = 2; tabList.strokeAlign = 'INSIDE';

  for (var i = 0; i < tabs.length; i++) {
    var tab = figma.createFrame();
    autoLayout(tab, 'HORIZONTAL', 12, 16, 0);
    tab.fills = [];
    if (i === 0) {
      tab.strokes = [{ type: 'SOLID', color: hexToRgb(COLORS.actionPrimary), opacity: 1 }];
      tab.strokeWeight = 2; tab.strokeAlign = 'INSIDE';
    }
    var tabTxt = figma.createText();
    tabTxt.fontName = { family: 'Mulish', style: i === 0 ? 'Bold' : 'Regular' };
    tabTxt.fontSize = FONT.sm;
    tabTxt.characters = tabs[i];
    tabTxt.fills = [{ type: 'SOLID', color: hexToRgb(i === 0 ? COLORS.actionPrimary : COLORS.textMuted), opacity: 1 }];
    tab.appendChild(tabTxt); tabList.appendChild(tab);
  }
  c.appendChild(tabList);

  // Panel
  var panel = figma.createFrame();
  autoLayout(panel, 'VERTICAL', 16, 0, 0);
  panel.layoutSizingHorizontal = 'FILL';
  panel.fills = [];
  var panelTxt = figma.createText();
  panelTxt.fontName = { family: 'Mulish', style: 'Regular' };
  panelTxt.fontSize = FONT.sm;
  panelTxt.characters = 'Resumo da carteira com posição atual e rentabilidade.';
  panelTxt.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.textMuted), opacity: 1 }];
  panel.appendChild(panelTxt);
  c.appendChild(panel);

  container.appendChild(c);
  return container;
}

// ── Tooltip ───────────────────────────────────────────────────────
async function buildTooltip(cv, fv) {
  await figma.loadFontAsync({ family: 'Mulish', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });

  var defs = [
    { name: 'Top',    txt: 'Informação adicional' },
    { name: 'Bottom', txt: 'Tooltip abaixo'       },
  ];

  var container = makeContainer('Tooltip');
  container.layoutMode = 'HORIZONTAL';
  container.itemSpacing = 48;
  container.counterAxisAlignItems = 'CENTER';

  for (var i = 0; i < defs.length; i++) {
    var d = defs[i];
    var c = figma.createComponent();
    c.name = d.name;
    c.layoutMode = 'VERTICAL';
    c.primaryAxisSizingMode = 'AUTO';
    c.counterAxisSizingMode = 'AUTO';
    c.primaryAxisAlignItems = 'CENTER';
    c.counterAxisAlignItems = 'CENTER';
    c.itemSpacing = 8;
    c.fills = [];

    // Tooltip bubble
    var bubble = figma.createFrame();
    autoLayout(bubble, 'HORIZONTAL', 6, 12, 0);
    bubble.cornerRadius = RADIUS.sm;
    bubble.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.bgPrimary), opacity: 1 }];
    bubble.effects = SHADOWS.sm;
    var bubbleTxt = figma.createText();
    bubbleTxt.fontName = { family: 'Mulish', style: 'Bold' };
    bubbleTxt.fontSize = FONT.xs;
    bubbleTxt.characters = d.txt;
    bubbleTxt.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.textPrimary), opacity: 1 }];
    bubble.appendChild(bubbleTxt);
    c.appendChild(bubble);

    // Trigger (botão de referência)
    var trigger = figma.createFrame();
    autoLayout(trigger, 'HORIZONTAL', 10, 20, 0);
    trigger.cornerRadius = RADIUS.md;
    trigger.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.actionPrimary), opacity: 1 }];
    var triggerTxt = figma.createText();
    triggerTxt.fontName = { family: 'Mulish', style: 'Regular' };
    triggerTxt.fontSize = FONT.sm; triggerTxt.characters = 'Passe o mouse';
    triggerTxt.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.white), opacity: 1 }];
    trigger.appendChild(triggerTxt);
    c.appendChild(trigger);

    container.appendChild(c);
  }
  return container;
}

// ── Breadcrumb ────────────────────────────────────────────────────
async function buildBreadcrumb(cv, fv) {
  await figma.loadFontAsync({ family: 'Mulish', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });

  var defs = [
    { name: 'Default', items: ['Início', 'Carteira', 'Tesouro Direto'] },
    { name: 'Deep',    items: ['Início', 'Produtos', 'Renda Fixa', 'Tesouro IPCA+'] },
  ];

  var container = makeContainer('Breadcrumb');
  container.layoutMode = 'VERTICAL';
  container.itemSpacing = 20;
  container.counterAxisAlignItems = 'MIN';

  for (var i = 0; i < defs.length; i++) {
    var d = defs[i];
    var c = figma.createComponent();
    c.name = d.name;
    autoLayout(c, 'HORIZONTAL', 0, 0, 8);
    c.counterAxisAlignItems = 'CENTER';
    c.fills = [];

    for (var j = 0; j < d.items.length; j++) {
      var isLast = j === d.items.length - 1;
      var lbl = figma.createText();
      lbl.fontName = { family: 'Mulish', style: isLast ? 'Bold' : 'Regular' };
      lbl.fontSize = FONT.sm;
      lbl.characters = d.items[j];
      lbl.fills = [{ type: 'SOLID', color: hexToRgb(isLast ? COLORS.textDark : COLORS.actionPrimary), opacity: 1 }];
      c.appendChild(lbl);

      if (!isLast) {
        var sep = figma.createText();
        sep.fontName = { family: 'Mulish', style: 'Regular' };
        sep.fontSize = FONT.sm; sep.characters = '/';
        sep.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.textMuted), opacity: 1 }];
        c.appendChild(sep);
      }
    }
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
        // Mulish: Regular=400, SemiBold=600, Bold=700, ExtraBold=800
        var fontDefs = [
          { name: NS + '/display', size: FONT.display, style: 'ExtraBold', lh: 110 },
          { name: NS + '/h1',      size: FONT.h1,      style: 'Bold',      lh: 120 },
          { name: NS + '/h2',      size: FONT.h2,      style: 'Bold',      lh: 125 },
          { name: NS + '/h3',      size: FONT.h3,      style: 'SemiBold',  lh: 130 },
          { name: NS + '/h4',      size: FONT.h4,      style: 'SemiBold',  lh: 140 },
          { name: NS + '/body-lg', size: FONT.bodyLg,  style: 'Regular',   lh: 160 },
          { name: NS + '/body',    size: FONT.body,    style: 'Regular',   lh: 160 },
          { name: NS + '/caption', size: FONT.caption, style: 'Regular',   lh: 150 },
          { name: NS + '/mono',    size: FONT.mono,    style: 'Regular',   lh: 150 },
        ];
        await figma.loadFontAsync({ family: 'Mulish', style: 'Regular' });
        await figma.loadFontAsync({ family: 'Mulish', style: 'Bold' });
        await figma.loadFontAsync({ family: 'Mulish', style: 'SemiBold' });
        await figma.loadFontAsync({ family: 'Mulish', style: 'ExtraBold' });
        var existTexts = await figma.getLocalTextStylesAsync();
        var textMap = {};
        for (var i = 0; i < existTexts.length; i++) textMap[existTexts[i].name] = existTexts[i];

        for (var i = 0; i < fontDefs.length; i++) {
          var fd = fontDefs[i];
          try {
            var ts = textMap[fd.name] || figma.createTextStyle();
            ts.name       = fd.name;
            ts.fontSize   = fd.size;
            ts.fontName   = { family: 'Mulish', style: fd.style };
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
        button:   buildButton,
        badge:    buildBadge,
        card:     buildCard,
        input:    buildInput,
        select:   buildSelect,
        spinner:  buildSpinner,
        checkbox: buildCheckbox,
        toggle:   buildToggle,
        toast:      buildToast,
        avatar:     buildAvatar,
        modal:      buildModal,
        table:      buildTable,
        tabs:       buildTabs,
        tooltip:    buildTooltip,
        breadcrumb: buildBreadcrumb,
      };

      var offsetY  = 0;
      var selected = msg.selected;
      for (var i = 0; i < selected.length; i++) {
        var name = selected[i];
        try {
          var builder = BUILDERS[name];
          if (!builder) continue;

          // Versão Light
          applyPalette(COLORS_LIGHT);
          var lightContainer = await builder(cv, fv);

          // Versão Dark
          applyPalette(COLORS_DARK);
          var darkContainer = await builder(cv, fv);

          // Restaura light como padrão
          applyPalette(COLORS_LIGHT);

          if (lightContainer && darkContainer) {
            // Frame wrapper com label de tema
            var wrapper = figma.createFrame();
            wrapper.name = name.charAt(0).toUpperCase() + name.slice(1);
            wrapper.layoutMode = 'HORIZONTAL';
            wrapper.counterAxisSizingMode = 'AUTO';
            wrapper.primaryAxisSizingMode = 'AUTO';
            wrapper.itemSpacing = 60;
            wrapper.paddingTop = 32; wrapper.paddingBottom = 32;
            wrapper.paddingLeft = 32; wrapper.paddingRight = 32;
            wrapper.fills = [];

            lightContainer.name = '☀️ Light';
            darkContainer.name  = '🌙 Dark';
            wrapper.appendChild(lightContainer);
            wrapper.appendChild(darkContainer);

            wrapper.x = 100;
            wrapper.y = offsetY + 100;
            offsetY += wrapper.height + 80;
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
