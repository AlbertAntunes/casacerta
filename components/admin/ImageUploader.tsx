'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import type { ImovelImagem } from '@/types/imovel.types'
import { deleteImagem } from '@/services/imagens.service'
import { IMAGE_CONSTANTS } from '@/lib/constants'

interface Props {
  imovelId?: string
  imagens: ImovelImagem[]
  onImagensChange: (imagens: ImovelImagem[]) => void
  onFilesQueued: (files: File[]) => void
}

export function ImageUploader({
  imovelId,
  imagens,
  onImagensChange,
  onFilesQueued,
}: Props) {
  const [dragOver, setDragOver] = useState(false)
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([])
  const [deletando, setDeletando] = useState<string | null>(null)

  const handleFiles = useCallback(
    (files: FileList) => {
      const novos: { file: File; url: string }[] = []
      const validos: File[] = []
      const erros: string[] = []

      Array.from(files).forEach((file) => {
        // Valida tipo
        if (!IMAGE_CONSTANTS.ALLOWED_TYPES.includes(file.type as any)) {
          erros.push(`${file.name}: formato não permitido (apenas JPEG, PNG, WebP)`)
          return
        }

        // Valida tamanho
        if (file.size > IMAGE_CONSTANTS.MAX_SIZE_BYTES) {
          erros.push(`${file.name}: arquivo muito grande (máximo ${IMAGE_CONSTANTS.MAX_SIZE_MB}MB)`)
          return
        }

        novos.push({ file, url: URL.createObjectURL(file) })
        validos.push(file)
      })

      if (erros.length > 0) {
        alert(`Erros ao adicionar imagens:\n${erros.join('\n')}`)
      }

      setPreviews((p) => [...p, ...novos])
      onFilesQueued(validos)
    },
    [onFilesQueued]
  )

  const removerPreview = (idx: number) => {
    setPreviews((p) => {
      URL.revokeObjectURL(p[idx].url)
      const novo = p.filter((_, i) => i !== idx)
      onFilesQueued(novo.map((n) => n.file))
      return novo
    })
  }

  const removerImagem = async (img: ImovelImagem) => {
    if (!confirm('Remover esta imagem?')) return
    setDeletando(img.id)
    try {
      await deleteImagem(img)
      onImagensChange(imagens.filter((i) => i.id !== img.id))
    } catch (error) {
      const mensagem = error instanceof Error 
        ? error.message 
        : 'Erro desconhecido ao remover imagem.'
      alert(`Erro ao remover imagem: ${mensagem}`)
      console.error('Erro ao remover imagem:', error)
    } finally {
      setDeletando(null)
    }
  }

  const totalImagens = imagens.length + previews.length

  return (
    <div className="space-y-5">
      {/* Zona de drop */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFiles(e.dataTransfer.files)
        }}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
          dragOver
            ? 'border-green-400 bg-green-400/10'
            : 'border-green-700/50 hover:border-green-600 hover:bg-green-900/20'
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <div className="text-4xl mb-3">📷</div>
        <p className="text-green-300 font-semibold">
          Arraste imagens aqui ou clique para selecionar
        </p>
        <p className="text-green-600 text-sm mt-1">
          {IMAGE_CONSTANTS.ALLOWED_EXTENSIONS.map(e => e.toUpperCase()).join(', ')} · Máximo {IMAGE_CONSTANTS.MAX_SIZE_MB}MB por imagem
        </p>
        {totalImagens > 0 && (
          <p className="text-green-400 text-sm mt-2 font-bold">
            {totalImagens} imagem(ns) selecionada(s)
          </p>
        )}
      </div>

      {/* Imagens já salvas no banco */}
      {imagens.length > 0 && (
        <div>
          <p className="text-green-500 text-xs font-semibold mb-3 uppercase tracking-wide">
            Imagens salvas
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {[...imagens]
              .sort((a, b) => a.ordem - b.ordem)
              .map((img, idx) => (
                <div key={img.id} className="relative group">
                  <div className="relative h-20 rounded-xl overflow-hidden bg-green-900">
                    <Image
                      src={img.url}
                      alt={img.alt_text ?? ''}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                    {idx === 0 && (
                      <span className="absolute bottom-0 inset-x-0 bg-green-500/80 text-white text-xs text-center py-0.5 font-bold">
                        Capa
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removerImagem(img)}
                    disabled={deletando === img.id}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white text-xs hidden group-hover:flex items-center justify-center hover:bg-red-700 transition z-10"
                    aria-label="Remover"
                  >
                    {deletando === img.id ? '…' : '✕'}
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Previews de novas imagens (ainda não enviadas) */}
      {previews.length > 0 && (
        <div>
          <p className="text-green-500 text-xs font-semibold mb-3 uppercase tracking-wide">
            Novas imagens (serão enviadas ao salvar)
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {previews.map((pv, idx) => (
              <div key={pv.url} className="relative group">
                <div className="relative h-20 rounded-xl overflow-hidden bg-green-900 ring-2 ring-green-400/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pv.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-green-900/80 text-green-400 text-xs text-center py-0.5">
                    Nova
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removerPreview(idx)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white text-xs hidden group-hover:flex items-center justify-center hover:bg-red-700 transition z-10"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalImagens === 0 && (
        <p className="text-green-600 text-sm text-center">
          Nenhuma imagem adicionada. A primeira imagem será a capa do imóvel.
        </p>
      )}
    </div>
  )
}
