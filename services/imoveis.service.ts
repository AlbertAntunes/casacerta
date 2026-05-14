import { createClient, createPublicClient } from '@/lib/supabase/server'
import type {
  Imovel,
  FiltrosImovel,
  ImovelCreateInput,
  ImovelUpdateInput,
} from '@/types/imovel.types'

// ── LISTAR (com filtros e paginação) ──────────────────────────────────
export async function getImoveis(
  filtros: FiltrosImovel = {},
  page = 1,
  perPage = 12,
  usePublicClient = false
): Promise<{ data: Imovel[]; total: number }> {
  const supabase = usePublicClient ? createPublicClient() : createClient()

  let query = supabase
    .from('imoveis')
    .select('*, imovel_imagens(*)', { count: 'exact' })
    .eq('ativo', true)
    .order('destaque', { ascending: false })
    .order('created_at', { ascending: false })

  if (filtros.tipo) query = query.eq('tipo', filtros.tipo)
  if (filtros.status) query = query.eq('status', filtros.status)
  if (filtros.cidade) query = query.ilike('cidade', `%${filtros.cidade}%`)
  if (filtros.bairro) query = query.ilike('bairro', `%${filtros.bairro}%`)
  if (filtros.preco_min) query = query.gte('preco', filtros.preco_min)
  if (filtros.preco_max) query = query.lte('preco', filtros.preco_max)
  if (filtros.quartos_min) query = query.gte('quartos', filtros.quartos_min)
  if (filtros.destaque) query = query.eq('destaque', true)
  if (filtros.busca) {
    query = query.or(
      `titulo.ilike.%${filtros.busca}%,descricao.ilike.%${filtros.busca}%,bairro.ilike.%${filtros.busca}%`
    )
  }

  const from = (page - 1) * perPage
  query = query.range(from, from + perPage - 1)

  const { data, count, error } = await query
  if (error) throw error

  return { data: (data as Imovel[]) ?? [], total: count ?? 0 }
}

// ── TODOS OS IMÓVEIS (admin, inclui inativos) ─────────────────────────
export async function getImoveisAdmin(): Promise<Imovel[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('imoveis')
    .select('*, imovel_imagens(*)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as Imovel[]) ?? []
}

// ── BUSCAR POR SLUG ───────────────────────────────────────────────────
export async function getImovelBySlug(
  slug: string,
  usePublicClient = false
): Promise<Imovel | null> {
  const supabase = usePublicClient ? createPublicClient() : createClient()
  const { data, error } = await supabase
    .from('imoveis')
    .select('*, imovel_imagens(*)')
    .eq('slug', slug)
    .eq('ativo', true)
    .single()

  if (error) return null

  // Incrementa views de forma silenciosa
  supabase
    .from('imoveis')
    .update({ views: (data.views ?? 0) + 1 })
    .eq('id', data.id)
    .then(({ error }) => {
      if (error) console.error('Erro ao incrementar views:', error)
    })

  return data as Imovel
}

// ── BUSCAR POR ID (admin) ─────────────────────────────────────────────
export async function getImovelById(id: string): Promise<Imovel | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('imoveis')
    .select('*, imovel_imagens(*)')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Imovel
}

// ── CRIAR ─────────────────────────────────────────────────────────────
export async function createImovel(input: ImovelCreateInput): Promise<Imovel> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('imoveis')
    .insert(input)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Imovel
}

// ── ATUALIZAR ─────────────────────────────────────────────────────────
export async function updateImovel(
  id: string,
  input: ImovelUpdateInput
): Promise<Imovel> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('imoveis')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Imovel
}

// ── EXCLUSÃO LÓGICA (nunca deleta do banco) ───────────────────────────
export async function desativarImovel(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('imoveis')
    .update({ ativo: false })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

// ── REATIVAR ──────────────────────────────────────────────────────────
export async function reativarImovel(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('imoveis')
    .update({ ativo: true })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

// ── ALTERNAR DESTAQUE ─────────────────────────────────────────────────
export async function toggleDestaque(
  id: string,
  destaque: boolean
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('imoveis')
    .update({ destaque })
    .eq('id', id)

  if (error) throw new Error(error.message)
}
