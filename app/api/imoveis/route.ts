import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils'

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

  // Garante slug único
  if (!body.slug) {
    body.slug = generateSlug(body.titulo)
  }

  // Verifica se slug já existe
  const { data: existing } = await supabase
    .from('imoveis')
    .select('id')
    .eq('slug', body.slug)
    .single()

  if (existing) {
    body.slug = `${body.slug}-${Date.now()}`
  }

  body.corretor_id = session.user.id

  const { data, error } = await supabase
    .from('imoveis')
    .insert(body)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data, { status: 201 })
}
