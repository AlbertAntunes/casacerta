import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface Params {
  params: { id: string }
}

// GET /api/imoveis/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('imoveis')
    .select('*, imovel_imagens(*)')
    .eq('id', params.id)
    .single()

  if (error) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
  return NextResponse.json(data)
}

// PUT /api/imoveis/[id] — atualização completa (requer auth)
export async function PUT(request: NextRequest, { params }: Params) {
  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await request.json()

  // Remove campos que não devem ser atualizados
  delete body.id
  delete body.created_at
  delete body.views

  const { data, error } = await supabase
    .from('imoveis')
    .update(body)
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

// PATCH /api/imoveis/[id] — atualização parcial (ativo, destaque, status)
export async function PATCH(request: NextRequest, { params }: Params) {
  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await request.json()

  // Permite atualizar apenas campos seguros via PATCH
  const allowed = ['ativo', 'destaque', 'status']
  const patch: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) patch[key] = body[key]
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'Nenhum campo válido' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('imoveis')
    .update(patch)
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

// DELETE /api/imoveis/[id] — exclusão lógica (ativo = false)
export async function DELETE(_req: NextRequest, { params }: Params) {
  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  // Nunca deleta do banco — apenas desativa
  const { error } = await supabase
    .from('imoveis')
    .update({ ativo: false })
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
