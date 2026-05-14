import { createClient } from '@/lib/supabase/client'
import type { ImovelImagem } from '@/types/imovel.types'

const BUCKET = 'imoveis-imagens'
const MAX_SIZE_MB = 5
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function uploadImagem(
  file: File,
  imovelId: string,
  ordem: number
): Promise<ImovelImagem> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Formato inválido. Use JPG, PNG ou WebP.')
  }
  if (file.size > MAX_SIZE) {
    throw new Error(`Arquivo muito grande. Máximo ${MAX_SIZE_MB}MB.`)
  }

  const supabase = createClient()
  const ext = file.name.split('.').pop()
  const path = `${imovelId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error: upError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false })

  if (upError) throw new Error(upError.message)

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path)

  const { data, error } = await supabase
    .from('imovel_imagens')
    .insert({
      imovel_id: imovelId,
      url: publicUrl,
      storage_path: path,
      ordem,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as ImovelImagem
}

export async function deleteImagem(imagem: ImovelImagem): Promise<void> {
  const supabase = createClient()

  await supabase.storage.from(BUCKET).remove([imagem.storage_path])
  const { error } = await supabase
    .from('imovel_imagens')
    .delete()
    .eq('id', imagem.id)

  if (error) throw new Error(error.message)
}

export async function reordenarImagens(
  imagens: Pick<ImovelImagem, 'id' | 'ordem'>[]
): Promise<void> {
  const supabase = createClient()
  await Promise.all(
    imagens.map(({ id, ordem }) =>
      supabase.from('imovel_imagens').update({ ordem }).eq('id', id)
    )
  )
}
