import Link from 'next/link'
import Image from 'next/image'
import type { Imovel } from '@/types/imovel.types'
import { formatPreco } from '@/lib/utils'
import { TIPO_LABELS, STATUS_LABELS, STATUS_COLORS } from '@/types/imovel.types'

interface Props {
  imovel: Imovel
}

export function ImovelCard({ imovel }: Props) {
  const imagens = [...(imovel.imovel_imagens ?? [])].sort((a, b) => a.ordem - b.ordem)
  const capa = imagens[0]

  return (
    <Link
      href={`/imoveis/${imovel.slug}`}
      className="card group overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-400/10 transition-all duration-300 block"
    >
      {/* Imagem */}
      <div className="relative h-52 bg-green-900 overflow-hidden">
        {capa ? (
          <Image
            src={capa.url}
            alt={capa.alt_text ?? imovel.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-30">
              {imovel.tipo === 'casa' ? '🏠' :
               imovel.tipo === 'apartamento' ? '🏢' :
               imovel.tipo === 'terreno' ? '🌿' : '🏪'}
            </span>
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge bg-green-950/80 text-green-400 backdrop-blur-sm">
            {TIPO_LABELS[imovel.tipo]}
          </span>
          {imovel.destaque && (
            <span className="badge bg-yellow-500/90 text-yellow-950">
              ⭐ Destaque
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span className={`badge backdrop-blur-sm ${STATUS_COLORS[imovel.status]}`}>
            {STATUS_LABELS[imovel.status]}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <h3 className="font-bold text-green-100 mb-1 line-clamp-1 group-hover:text-green-400 transition-colors">
          {imovel.titulo}
        </h3>

        {imovel.bairro && (
          <p className="text-green-500 text-sm mb-3">
            📍 {imovel.bairro}, {imovel.cidade}
          </p>
        )}

        {/* Características */}
        <div className="flex items-center gap-4 text-xs text-green-500 mb-4">
          {imovel.area_m2 && <span>📐 {imovel.area_m2}m²</span>}
          {imovel.quartos != null && <span>🛏️ {imovel.quartos} quartos</span>}
          {imovel.banheiros != null && <span>🚿 {imovel.banheiros} banheiros</span>}
          {imovel.vagas != null && imovel.vagas > 0 && <span>🚗 {imovel.vagas} vagas</span>}
        </div>

        {/* Preço */}
        <div className="flex items-center justify-between">
          <p className="font-serif text-xl font-black text-green-400">
            {formatPreco(imovel.preco)}
          </p>
          <span className="text-green-500 text-xs group-hover:text-green-400 transition">
            Ver detalhes →
          </span>
        </div>
      </div>
    </Link>
  )
}
