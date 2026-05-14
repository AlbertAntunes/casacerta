import { getImovelById } from '@/services/imoveis.service'
import { ImovelFormWrapper } from '@/components/admin/ImovelFormWrapper'
import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}

export default async function EditarImovelPage({ params }: Props) {
  const imovel = await getImovelById(params.id)
  if (!imovel) notFound()

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-black text-green-100">
          Editar Imóvel
        </h1>
        <p className="text-green-500 mt-1 truncate max-w-xl">{imovel.titulo}</p>
      </div>
      <ImovelFormWrapper imovel={imovel} />
    </div>
  )
}
