'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Imovel } from '@/types/imovel.types'
import { formatPreco } from '@/lib/utils'
import { TIPO_LABELS, STATUS_LABELS } from '@/types/imovel.types'

interface Props {
  imoveis: Imovel[]
}

export function ImovelAdminTable({ imoveis: initialImoveis }: Props) {
  const [imoveis, setImoveis] = useState(initialImoveis)
  const [busca, setBusca] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const filtrados = imoveis.filter((i) =>
    i.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    (i.bairro ?? '').toLowerCase().includes(busca.toLowerCase())
  )

  const toggleAtivo = async (imovel: Imovel) => {
    const res = await fetch(`/api/imoveis/${imovel.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ativo: !imovel.ativo }),
    })
    if (res.ok) {
      setImoveis((prev) =>
        prev.map((i) => (i.id === imovel.id ? { ...i, ativo: !i.ativo } : i))
      )
    }
  }

  const toggleDestaque = async (imovel: Imovel) => {
    const res = await fetch(`/api/imoveis/${imovel.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destaque: !imovel.destaque }),
    })
    if (res.ok) {
      setImoveis((prev) =>
        prev.map((i) =>
          i.id === imovel.id ? { ...i, destaque: !i.destaque } : i
        )
      )
    }
  }

  return (
    <div>
      {/* Busca */}
      <div className="mb-6">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="🔍 Filtrar por título ou bairro..."
          className="input max-w-sm"
        />
      </div>

      {/* Tabela */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-green-800/40 text-left">
                <th className="px-4 py-3 text-green-500 font-semibold">Imóvel</th>
                <th className="px-4 py-3 text-green-500 font-semibold hidden md:table-cell">Tipo</th>
                <th className="px-4 py-3 text-green-500 font-semibold hidden md:table-cell">Preço</th>
                <th className="px-4 py-3 text-green-500 font-semibold hidden lg:table-cell">Status</th>
                <th className="px-4 py-3 text-green-500 font-semibold">Ativo</th>
                <th className="px-4 py-3 text-green-500 font-semibold">⭐</th>
                <th className="px-4 py-3 text-green-500 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((imovel, idx) => (
                <tr
                  key={imovel.id}
                  className={`border-b border-green-800/20 hover:bg-green-900/20 transition ${
                    !imovel.ativo ? 'opacity-50' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-green-100 line-clamp-1">
                        {imovel.titulo}
                      </p>
                      <p className="text-green-600 text-xs">
                        {imovel.bairro ?? imovel.cidade}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-green-400">
                    {TIPO_LABELS[imovel.tipo]}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell font-semibold text-green-400">
                    {formatPreco(imovel.preco)}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={`badge badge-${imovel.status}`}>
                      {STATUS_LABELS[imovel.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleAtivo(imovel)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${
                        imovel.ativo ? 'bg-green-500' : 'bg-green-900'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          imovel.ativo ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleDestaque(imovel)}
                      className={`text-xl transition ${
                        imovel.destaque ? 'opacity-100' : 'opacity-20 hover:opacity-60'
                      }`}
                      title={imovel.destaque ? 'Remover destaque' : 'Marcar destaque'}
                    >
                      ⭐
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/imoveis/${imovel.id}`}
                        className="px-3 py-1.5 bg-green-800/50 text-green-300 rounded-lg text-xs hover:bg-green-700 transition"
                      >
                        Editar
                      </Link>
                      <Link
                        href={`/imoveis/${imovel.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 bg-green-900/50 text-green-500 rounded-lg text-xs hover:bg-green-800 transition"
                      >
                        Ver
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtrados.length === 0 && (
            <div className="text-center py-16 text-green-600">
              <span className="text-4xl">🏚️</span>
              <p className="mt-3">Nenhum imóvel encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
