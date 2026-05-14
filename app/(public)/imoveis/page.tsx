export const dynamic = 'force-dynamic'
import { getImoveis } from '@/services/imoveis.service'
import { ImovelCard } from '@/components/imoveis/ImovelCard'
import { FilterBar } from '@/components/imoveis/FilterBar'
import type { FiltrosImovel, TipoImovel, StatusImovel } from '@/types/imovel.types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imóveis em Quixadá CE',
  description: 'Casas, apartamentos e terrenos disponíveis em Quixadá. Encontre seu imóvel ideal com a Casa Certa Imóveis.',
}

interface Props {
  searchParams: {
    tipo?: string
    status?: string
    cidade?: string
    bairro?: string
    preco_min?: string
    preco_max?: string
    quartos_min?: string
    busca?: string
    pagina?: string
  }
}

export default async function ImoveisPage({ searchParams }: Props) {
  const pagina = Number(searchParams.pagina ?? 1)

  const filtros: FiltrosImovel = {
    tipo: searchParams.tipo as TipoImovel | undefined,
    status: (searchParams.status as StatusImovel | undefined) ?? 'disponivel',
    cidade: searchParams.cidade,
    bairro: searchParams.bairro,
    preco_min: searchParams.preco_min ? Number(searchParams.preco_min) : undefined,
    preco_max: searchParams.preco_max ? Number(searchParams.preco_max) : undefined,
    quartos_min: searchParams.quartos_min ? Number(searchParams.quartos_min) : undefined,
    busca: searchParams.busca,
  }

  const { data: imoveis, total } = await getImoveis(filtros, pagina, 12)
  const totalPaginas = Math.ceil(total / 12)

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        <div className="mb-10">
          <div className="section-label">🏠 Imóveis</div>
          <h1 className="section-title">
            Imóveis em <span className="accent">Quixadá</span>
          </h1>
          <p className="text-green-400/80">{total} imóvel(is) encontrado(s)</p>
        </div>

        <FilterBar />

        {imoveis.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl">🏚️</span>
            <p className="text-green-400 mt-4 text-lg">
              Nenhum imóvel encontrado com esses filtros.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {imoveis.map((imovel) => (
              <ImovelCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        )}

        {/* Paginação */}
        {totalPaginas > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`?pagina=${p}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition ${
                  p === pagina
                    ? 'bg-green-400 text-white'
                    : 'bg-green-900/50 text-green-300 hover:bg-green-800'
                }`}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
