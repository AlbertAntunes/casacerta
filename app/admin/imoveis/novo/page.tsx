import { ImovelFormWrapper } from '@/components/admin/ImovelFormWrapper'

export default function NovoImovelPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-black text-green-100">
          Novo Imóvel
        </h1>
        <p className="text-green-500 mt-1">Preencha os dados do imóvel</p>
      </div>
      <ImovelFormWrapper />
    </div>
  )
}
