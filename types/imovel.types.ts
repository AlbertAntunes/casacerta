// types/imovel.types.ts

export type TipoImovel = 'casa' | 'apartamento' | 'terreno' | 'comercial'
export type StatusImovel = 'disponivel' | 'vendido' | 'alugado' | 'reservado'

export interface ImovelImagem {
  id: string
  imovel_id: string
  url: string
  storage_path: string
  ordem: number
  alt_text?: string
  created_at: string
}

export interface Imovel {
  id: string
  titulo: string
  descricao?: string
  preco: number
  tipo: TipoImovel
  status: StatusImovel
  cidade: string
  bairro?: string
  endereco?: string
  quartos?: number
  banheiros?: number
  vagas?: number
  area_m2?: number
  destaque: boolean
  slug: string
  ativo: boolean
  views: number
  corretor_id?: string
  created_at: string
  updated_at: string
  imovel_imagens?: ImovelImagem[]
}

export interface FiltrosImovel {
  tipo?: TipoImovel
  status?: StatusImovel
  cidade?: string
  bairro?: string
  preco_min?: number
  preco_max?: number
  quartos_min?: number
  destaque?: boolean
  busca?: string
}

export type ImovelCreateInput = Omit<
  Imovel,
  'id' | 'created_at' | 'updated_at' | 'views' | 'imovel_imagens'
>

export type ImovelUpdateInput = Partial<ImovelCreateInput>

export const TIPO_LABELS: Record<TipoImovel, string> = {
  casa: 'Casa',
  apartamento: 'Apartamento',
  terreno: 'Terreno',
  comercial: 'Comercial',
}

export const STATUS_LABELS: Record<StatusImovel, string> = {
  disponivel: 'Disponível',
  vendido: 'Vendido',
  alugado: 'Alugado',
  reservado: 'Reservado',
}

export const STATUS_COLORS: Record<StatusImovel, string> = {
  disponivel: 'bg-green-100 text-green-800',
  vendido: 'bg-red-100 text-red-800',
  alugado: 'bg-blue-100 text-blue-800',
  reservado: 'bg-yellow-100 text-yellow-800',
}
