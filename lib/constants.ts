// Limites de upload
export const IMAGE_CONSTANTS = {
  MAX_SIZE_BYTES: 5 * 1024 * 1024, // 5MB
  MAX_SIZE_MB: 5,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'] as const,
  ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp'],
} as const

// Limites de formulário
export const FORM_LIMITS = {
  TITULO_MIN: 3,
  TITULO_MAX: 255,
  SLUG_MIN: 3,
  SLUG_MAX: 255,
  DESCRICAO_MAX: 5000,
  CIDADE_MIN: 2,
} as const

// Geração estática
export const GENERATION_LIMITS = {
  STATIC_PARAMS_PER_BATCH: 100,
  MAX_PRERENDER_PAGES: 200,
  REVALIDATE_SECONDS: 3600, // 1 hora
} as const

// Rotas API
export const API_ROUTES = {
  imovel: (id: string) => `/api/imoveis/${id}`,
  imoveis: () => `/api/imoveis`,
} as const
