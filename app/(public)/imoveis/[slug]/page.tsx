import { getImovelBySlug, getImoveis } from '@/services/imoveis.service'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ImageCarousel } from '@/components/imoveis/ImageCarousel'
import { formatPreco, whatsappImovel } from '@/lib/utils'
import { TIPO_LABELS, STATUS_LABELS, STATUS_COLORS } from '@/types/imovel.types'
import Link from 'next/link'

export const revalidate = 3600

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const imovel = await getImovelBySlug(params.slug)
  if (!imovel) return { title: 'Imóvel não encontrado' }

  const preco = formatPreco(imovel.preco)
  const imagemCapa = imovel.imovel_imagens?.find(i => i.ordem === 0)?.url

  return {
    title: `${imovel.titulo} — ${preco}`,
    description:
      imovel.descricao?.slice(0, 155) ??
      `${TIPO_LABELS[imovel.tipo]} em ${imovel.bairro ?? imovel.cidade}. ${preco}.`,
    openGraph: {
      title: imovel.titulo,
      description: imovel.descricao ?? '',
      images: imagemCapa ? [imagemCapa] : [],
      type: 'article',
    },
    alternates: { canonical: `/imoveis/${params.slug}` },
  }
}

export async function generateStaticParams() {
  const { data } = await getImoveis({}, 1, 200)
  return data.map((i) => ({ slug: i.slug }))
}

export default async function ImovelPage({ params }: Props) {
  const imovel = await getImovelBySlug(params.slug)
  if (!imovel) notFound()

  const imagens = [...(imovel.imovel_imagens ?? [])].sort(
    (a, b) => a.ordem - b.ordem
  )

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: imovel.titulo,
    description: imovel.descricao,
    price: imovel.preco,
    priceCurrency: 'BRL',
    address: {
      '@type': 'PostalAddress',
      addressLocality: imovel.cidade,
      addressRegion: 'CE',
      addressCountry: 'BR',
      streetAddress: imovel.endereco,
    },
    image: imagens.map((i) => i.url),
  }

  const wppDiogo = whatsappImovel(
    process.env.NEXT_PUBLIC_WHATSAPP_DIOGO ?? '',
    imovel.titulo,
    imovel.slug
  )
  const wppSalomao = whatsappImovel(
    process.env.NEXT_PUBLIC_WHATSAPP_SALOMAO ?? '',
    imovel.titulo,
    imovel.slug
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="pt-24 pb-20">
        <div className="container">
          <Link
            href="/imoveis"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mb-8 transition"
          >
            ← Voltar aos imóveis
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Carrossel */}
            <div>
              <ImageCarousel imagens={imagens} titulo={imovel.titulo} />
            </div>

            {/* Informações */}
            <div>
              {/* Tags */}
              <div className="flex items-center gap-3 mb-4">
                <span className="badge bg-green-400/10 text-green-400 border border-green-400/20">
                  {TIPO_LABELS[imovel.tipo]}
                </span>
                <span
                  className={`badge ${STATUS_COLORS[imovel.status]}`}
                >
                  {STATUS_LABELS[imovel.status]}
                </span>
                {imovel.destaque && (
                  <span className="badge bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                    ⭐ Destaque
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-black mb-3">
                {imovel.titulo}
              </h1>

              {imovel.bairro && (
                <p className="text-green-400 mb-2">
                  📍 {imovel.bairro}, {imovel.cidade}
                </p>
              )}

              <p className="font-serif text-4xl font-black text-green-400 mb-8">
                {formatPreco(imovel.preco)}
              </p>

              {/* Características */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {imovel.area_m2 && (
                  <div className="card p-4 text-center">
                    <div className="text-2xl mb-1">📐</div>
                    <div className="font-bold text-green-300">{imovel.area_m2}m²</div>
                    <div className="text-xs text-green-500">Área</div>
                  </div>
                )}
                {imovel.quartos != null && (
                  <div className="card p-4 text-center">
                    <div className="text-2xl mb-1">🛏️</div>
                    <div className="font-bold text-green-300">{imovel.quartos}</div>
                    <div className="text-xs text-green-500">Quartos</div>
                  </div>
                )}
                {imovel.banheiros != null && (
                  <div className="card p-4 text-center">
                    <div className="text-2xl mb-1">🚿</div>
                    <div className="font-bold text-green-300">{imovel.banheiros}</div>
                    <div className="text-xs text-green-500">Banheiros</div>
                  </div>
                )}
                {imovel.vagas != null && imovel.vagas > 0 && (
                  <div className="card p-4 text-center">
                    <div className="text-2xl mb-1">🚗</div>
                    <div className="font-bold text-green-300">{imovel.vagas}</div>
                    <div className="text-xs text-green-500">Vagas</div>
                  </div>
                )}
              </div>

              {/* Descrição */}
              {imovel.descricao && (
                <div className="mb-8">
                  <h2 className="font-bold text-green-300 mb-3">Descrição</h2>
                  <p className="text-green-400/90 leading-relaxed whitespace-pre-line">
                    {imovel.descricao}
                  </p>
                </div>
              )}

              {/* CTA WhatsApp */}
              {imovel.status === 'disponivel' && (
                <div className="space-y-3">
                  <a
                    href={wppDiogo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center text-base"
                  >
                    💬 Falar com Diogo Sousa
                  </a>
                  <a
                    href={wppSalomao}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost w-full justify-center text-base"
                  >
                    💬 Falar com Salomão Teodoseo
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
