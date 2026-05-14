import { getImoveisAdmin } from '@/services/imoveis.service'
import { ImovelAdminTable } from '@/components/admin/ImovelAdminTable'
import Link from 'next/link'

export default async function AdminImoveisPage() {
  const imoveis = await getImoveisAdmin()

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl font-black text-green-100">
            Imóveis
          </h1>
          <p className="text-green-500 mt-1">{imoveis.length} imóvel(is) cadastrado(s)</p>
        </div>
        <Link href="/admin/imoveis/novo" className="btn-primary">
          + Novo Imóvel
        </Link>
      </div>

      <ImovelAdminTable imoveis={imoveis} />
    </div>
  )
}
