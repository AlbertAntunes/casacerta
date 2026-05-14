'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ImovelImagem } from '@/types/imovel.types'

interface Props {
  imagens: ImovelImagem[]
  titulo: string
}

export function ImageCarousel({ imagens, titulo }: Props) {
  const [current, setCurrent] = useState(0)

  if (imagens.length === 0) {
    return (
      <div className="aspect-video bg-green-900/50 rounded-2xl flex items-center justify-center">
        <span className="text-8xl opacity-30">🏠</span>
      </div>
    )
  }

  const prev = () => setCurrent((c) => (c === 0 ? imagens.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === imagens.length - 1 ? 0 : c + 1))

  return (
    <div className="space-y-3">
      {/* Imagem principal */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-green-900">
        <Image
          src={imagens[current].url}
          alt={imagens[current].alt_text ?? titulo}
          fill
          className="object-cover"
          priority={current === 0}
          sizes="(max-width: 768px) 100vw, 600px"
        />

        {imagens.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-green-950/70 backdrop-blur text-white flex items-center justify-center hover:bg-green-900 transition"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-green-950/70 backdrop-blur text-white flex items-center justify-center hover:bg-green-900 transition"
              aria-label="Próxima"
            >
              →
            </button>
            <div className="absolute bottom-3 right-3 bg-green-950/70 backdrop-blur rounded-full px-3 py-1 text-xs text-green-300">
              {current + 1} / {imagens.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {imagens.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {imagens.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setCurrent(i)}
              className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition ${
                i === current
                  ? 'border-green-400'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt_text || `${titulo} - Imagem ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
