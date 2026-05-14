'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

export function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [busca, setBusca] = useState(searchParams.get('busca') ?? '')

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('pagina')
      router.push(`?${params.toString()}`)
    },
    [router, searchParams]
  )

  const tipoAtivo = searchParams.get('tipo') ?? 'all'

  return (
    <div className="space-y-4">
      {/* Busca */}
      <div className="relative">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && updateFilter('busca', busca)}
          placeholder="🔍 Buscar por título, bairro..."
          className="input pr-24"
        />
        <button
          onClick={() => updateFilter('busca', busca)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-400 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-green-500 transition"
        >
          Buscar
        </button>
      </div>

      {/* Filtros de tipo */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'all', label: 'Todos' },
          { value: 'casa', label: '🏠 Casas' },
          { value: 'apartamento', label: '🏢 Apartamentos' },
          { value: 'terreno', label: '🌿 Terrenos' },
          { value: 'comercial', label: '🏪 Comercial' },
        ].map((t) => (
          <button
            key={t.value}
            onClick={() => updateFilter('tipo', t.value === 'all' ? '' : t.value)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              tipoAtivo === t.value || (t.value === 'all' && !searchParams.get('tipo'))
                ? 'bg-green-400 text-white'
                : 'bg-green-900/50 text-green-300 hover:bg-green-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Filtros adicionais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <select
          value={searchParams.get('quartos_min') ?? ''}
          onChange={(e) => updateFilter('quartos_min', e.target.value)}
          className="input text-sm"
        >
          <option value="">🛏️ Quartos</option>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>{n}+ quartos</option>
          ))}
        </select>

        <select
          value={searchParams.get('preco_max') ?? ''}
          onChange={(e) => updateFilter('preco_max', e.target.value)}
          className="input text-sm"
        >
          <option value="">💰 Preço máx.</option>
          {[100000, 200000, 300000, 500000, 1000000].map((p) => (
            <option key={p} value={p}>
              até {p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
            </option>
          ))}
        </select>

        <button
          onClick={() => updateFilter('destaque', searchParams.get('destaque') ? '' : 'true')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            searchParams.get('destaque')
              ? 'bg-yellow-500 text-yellow-950'
              : 'input'
          }`}
        >
          ⭐ Destaques
        </button>

        {(searchParams.toString()) && (
          <button
            onClick={() => router.push('?')}
            className="px-4 py-2 rounded-xl text-sm text-red-400 hover:bg-red-900/20 transition border border-red-800/30"
          >
            ✕ Limpar filtros
          </button>
        )}
      </div>
    </div>
  )
}
