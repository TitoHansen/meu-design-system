// src/tokens.ts
// 🎨 TOKENS COMPARTILHADOS - React e Figma

export const tokens = {
  versao: "1.0.0",
  ultimaAtualizacao: "2026-04-16",
  
  // SUAS CORES ATUAIS (mantive igual)
  colors: {
    brand: '#6366f1',
    danger: '#e11d48',
    success: '#16a34a',
    neutral: '#6b7280',
  },
  
  // SUAS CORES com nomes em português (para o plugin)
  cores: {
    primaria: {
      clara: '#6366f1',      // = brand
      escura: '#4f46e5',     // versão mais escura
    },
    erro: '#e11d48',          // = danger
    sucesso: '#16a34a',       // = success
    texto: {
      principal: '#1f2937',
      secundario: '#6b7280',  // = neutral
      desabilitado: '#9ca3af',
    },
    fundo: {
      branco: '#ffffff',
      cinzaClaro: '#f9fafb',
      cinzaMedio: '#f3f4f6',
    },
    borda: '#e5e7eb',
  },

  // SEUS RADIUS (convertido para número)
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
  
  raio: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 999,
  },

  // SEUS FONT SIZES (convertido para número)
  fontSizes: {
    sm: '14px',
    md: '16px',
    lg: '20px',
  },
  
  fonte: {
    familia: 'Inter',
    tamanhos: {
      xs: 11,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
    }
  },

  // ESPAÇAMENTO (novo - para o plugin)
  espacamento: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

} as const;

// Helper para React (usa colors, radius, fontSizes)
export const t = (path: string): any => {
  return path.split('.').reduce((obj: any, key) => obj?.[key], tokens);
};

// Exporta como JSON puro (para copiar no plugin)
export const tokensJSON = JSON.stringify(tokens, null, 2);