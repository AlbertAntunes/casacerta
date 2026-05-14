import { getImoveisAdmin } from '@/services/imoveis.service'
import Link from 'next/link'
import { STATUS_LABELS } from '@/types/imovel.types'

export default async function AdminDashboard() {
  const imoveis = await getImoveisAdmin()

  const stats = {
    total: imoveis.length,
    ativos: imoveis.filter((i) => i.ativo).length,
    destaques: imoveis.filter((i) => i.destaque && i.ativo).length,
    disponiveis: imoveis.filter((i) => i.status === 'disponivel' && i.ativo).length,
  }

  const recentes = imoveis.slice(0, 5)

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl font-black text-green-100">
            Dashboard
          </h1>
          <p className="text-green-500 mt-1">Bem-vindo ao painel Casa Certa</p>
        </div>
        <Link href="/admin/imoveis/novo" className="btn-primary">
          + Novo Imóvel
        </Link>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total de Imóveis', value: stats.total, icon: '🏠', color: 'text-green-400' },
          { label: 'Ativos', value: stats.ativos, icon: '✅', color: 'text-green-400' },
          { label: 'Disponíveis', value: stats.disponiveis, icon: '🔑', color: 'text-blue-400' },
          { label: 'Em Destaque', value: stats.destaques, icon: '⭐', color: 'text-yellow-400' },
        ].map((s) => (
          <div key={s.label} className="card p-6">
            <div className="text-3xl mb-3">{s.icon}</div>
            <div className={`font-serif text-3xl font-black ${s.color}`}>
              {s.value}
            </div>
            <div className="text-green-500 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Imóveis recentes */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-green-200 text-lg">Imóveis Recentes</h2>
          <Link
            href="/admin/imoveis"
            className="text-green-400 text-sm hover:text-green-300 transition"
          >
            Ver todos →
          </Link>
        </div>

        <div className="space-y-3">
          {recentes.map((imovel) => (
            <div
              key={imovel.id}
              className="flex items-center justify-between p-4 bg-green-900/30 rounded-xl hover:bg-green-900/50 transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">
                  {imovel.tipo === 'casa' ? '🏠' :
                   imovel.tipo === 'apartamento' ? '🏢' :
                   imovel.tipo === 'terreno' ? '🌿' : '🏪'}
                </span>
                <div>
                  <p className="font-semibold text-green-100 text-sm">
                    {imovel.titulo}
                  </p>
                  <p className="text-green-500 text-xs">
                    {imovel.bairro ?? imovel.cidade}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`badge text-xs ${!imovel.ativo ? 'bg-gray-500/20 text-gray-400' : 'badge-' + imovel.status}`}>
                  {imovel.ativo ? STATUS_LABELS[imovel.status] : 'Inativo'}
                </span>
                <Link
                  href={`/admin/imoveis/${imovel.id}`}
                  className="text-green-400 text-xs hover:text-green-300 transition"
                >
                  Editar →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
