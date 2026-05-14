import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils'
import { z } from 'zod'

const createImovelSchema = z.object({
  titulo: z.string().min(3).max(255),
  descricao: z.string().optional(),
  preco: z.number().positive(),
  tipo: z.enum(['casa', 'apartamento', 'terreno', 'comercial']),
  status: z.enum(['disponivel', 'vendido', 'alugado', 'reservado']).default('disponivel'),
  cidade: z.string().min(1).default('Quixadá'),
  bairro: z.string().optional(),
  endereco: z.string().optional(),
  quartos: z.number().int().min(0).optional(),
  banheiros: z.number().int().min(0).optional(),
  vagas: z.number().int().min(0).default(0),
  area_m2: z.number().positive().optional(),
  destaque: z.boolean().default(false),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens').optional(),
  ativo: z.boolean().default(true),
})

// GET /api/imoveis — listagem pública com filtros
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const supabase = createClient()

  let query = supabase
    .from('imoveis')
    .select('*, imovel_imagens(*)', { count: 'exact' })
    .eq('ativo', true)
    .order('destaque', { ascending: false })
    .order('created_at', { ascending: false })

  const tipo = searchParams.get('tipo')
  const status = searchParams.get('status')
  const busca = searchParams.get('busca')

  if (tipo) query = query.eq('tipo', tipo)
  if (status) query = query.eq('status', status)
  if (busca) query = query.ilike('titulo', `%${busca}%`)

  const { data, count, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, total: count })
}

// POST /api/imoveis — criar imóvel (requer autenticação)
export async function POST(request: NextRequest) {
  const supabase = createClient()

  // Verifica autenticação
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await request.json()

  // Valida entrada
  const validation = createImovelSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json({ 
      error: 'Dados inválidos', 
      details: validation.error.issues 
    }, { status: 400 })
  }

  const validatedData = validation.data

  // Garante slug único
  if (!validatedData.slug) {
    validatedData.slug = generateSlug(validatedData.titulo)
  }

  // Verifica se slug já existe
  const { data: existing } = await supabase
    .from('imoveis')
    .select('id')
    .eq('slug', validatedData.slug)
    .single()

  if (existing) {
    validatedData.slug = `${validatedData.slug}-${Date.now()}`
  }

  const insertData = {
    ...validatedData,
    corretor_id: session.user.id,
  }

  const { data, error } = await supabase
    .from('imoveis')
    .insert(insertData)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data, { status: 201 })
}
