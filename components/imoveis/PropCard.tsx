import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPreco } from '@/lib/utils'

export interface Imovel {
  id:        string
  titulo:    string
  tipo:      'VENDA' | 'ALUGUEL'
  status:    'disponivel' | 'vendido' | 'alugado' | 'reservado'
  preco:     number
  bairro:    string
  quartos?:  number
  banheiros?: number
  area?:     number
  foto?:     string
  destaque?: boolean
}

interface PropCardProps {
  imovel: Imovel
  onContact?: (id: string) => void
}

export function PropCard({ imovel, onContact }: PropCardProps) {
  const statusLabel: Record<Imovel['status'], string> = {
    disponivel: 'Disponível',
    vendido:    'Vendido',
    alugado:    'Alugado',
    reservado:  'Reservado',
  }

  return (
    <article className={`prop-card ${imovel.destaque ? 'card-featured' : ''}`}>
      {/* Foto */}
      <div className="prop-photo">
        {imovel.foto ? (
          <Image
            src={imovel.foto}
            alt={imovel.titulo}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <span className="text-6xl opacity-30" aria-hidden="true">🏡</span>
        )}

        {/* Badge de tipo absoluto */}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant={imovel.tipo === 'VENDA' ? 'green' : 'blue'}>
            {imovel.tipo}
          </Badge>
        </div>

        {/* Badge de status */}
        <div className="absolute top-3 right-3 z-10">
          <Badge variant={imovel.status}>
            {statusLabel[imovel.status]}
          </Badge>
        </div>
      </div>

      {/* Corpo */}
      <div className="prop-body">
        <h3 className="prop-title">{imovel.titulo}</h3>

        {/* Meta tags */}
        <div className="prop-meta">
          <span className="prop-tag">📍 {imovel.bairro}</span>
          {imovel.quartos   && <span className="prop-tag">🛏 {imovel.quartos} quartos</span>}
          {imovel.banheiros && <span className="prop-tag">🚿 {imovel.banheiros} banheiros</span>}
          {imovel.area      && <span className="prop-tag">📐 {imovel.area}m²</span>}
        </div>

        {/* Preço */}
        <p className="prop-price">{formatPreco(imovel.preco)}</p>

        {/* CTA */}
        <Button
          variant="primary"
          fullWidth
          onClick={() => onContact?.(imovel.id)}
          disabled={imovel.status !== 'disponivel'}
        >
          {imovel.status === 'disponivel' ? '💬 Falar com Corretor' : '❌ Indisponível'}
        </Button>
      </div>
    </article>
  )
}
