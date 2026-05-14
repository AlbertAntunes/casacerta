import { getImoveis } from '@/services/imoveis.service'
import { ImovelCard } from '@/components/imoveis/ImovelCard'
import { FilterBar } from '@/components/imoveis/FilterBar'
import { BrokerSection } from '@/components/layout/BrokerSection'
import Link from 'next/link'

export const revalidate = 3600 // revalida a cada 1h

export default async function HomePage() {
  const [{ data: destaques }, { data: recentes, total }] = await Promise.all([
    getImoveis({ destaque: true, status: 'disponivel' }, 1, 6),
    getImoveis({ status: 'disponivel' }, 1, 9),
  ])

  return (
    <>
      {/* HERO */}
      <section className="min-h-screen relative flex items-center overflow-hidden pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-green-400/20 via-transparent to-transparent" />
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-green-400/10 border border-green-400/25 rounded-full px-4 py-2 text-xs font-bold text-green-400 uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Quixadá · Ceará
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6">
              Seu imóvel em{' '}
              <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                Quixadá
              </span>{' '}
              começa aqui
            </h1>

            <p className="text-lg text-green-300 leading-relaxed mb-10 max-w-lg">
              Casas, apartamentos e terrenos com entrada facilitada.
              Atendimento humanizado do primeiro contato à entrega das chaves.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#imoveis" className="btn-primary text-base">
                Ver Imóveis
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DIOGO}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                💬 Falar no WhatsApp
              </a>
            </div>

            <div className="flex gap-10 mt-14">
              {[
                { num: '10+', label: 'Anos de exp.' },
                { num: '500+', label: 'Clientes' },
                { num: '4.9★', label: 'Avaliação' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-3xl font-black text-green-400">
                    {s.num}
                  </div>
                  <div className="text-xs text-green-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DESTAQUES */}
      {destaques.length > 0 && (
        <section id="destaques" className="py-24 bg-green-950/50">
          <div className="container">
            <div className="text-center mb-14">
              <div className="section-label justify-center">⭐ Destaques</div>
              <h2 className="section-title">
                Imóveis em{' '}
                <span className="accent">Destaque</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destaques.map((imovel) => (
                <ImovelCard key={imovel.id} imovel={imovel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TODOS OS IMÓVEIS */}
      <section id="imoveis" className="py-24">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-label">🏠 Imóveis</div>
              <h2 className="section-title mb-0">
                Encontre seu{' '}
                <span className="accent">imóvel ideal</span>
              </h2>
            </div>
            <p className="text-green-400 font-bold">{total} disponíveis</p>
          </div>

          <FilterBar />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {recentes.map((imovel) => (
              <ImovelCard key={imovel.id} imovel={imovel} />
            ))}
          </div>

          {total > 9 && (
            <div className="text-center mt-12">
              <Link href="/imoveis" className="btn-ghost">
                Ver todos os imóveis →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CORRETORES */}
      <BrokerSection />

      {/* FAQ rápido */}
      <section className="py-24 bg-green-950/50">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label justify-center">❓ Dúvidas</div>
            <h2 className="section-title">Perguntas Frequentes</h2>
          </div>
          {[
            {
              q: 'Posso usar o FGTS?',
              a: 'Sim! Trabalhamos com FGTS como entrada ou amortização do financiamento. Fazemos a análise de elegibilidade gratuitamente.',
            },
            {
              q: 'Como funciona o processo de compra?',
              a: 'Você nos contata, apresentamos as opções, realizamos a visita e cuidamos de toda a documentação até a entrega das chaves.',
            },
            {
              q: 'Vocês trabalham com financiamento bancário?',
              a: 'Sim, trabalhamos com Caixa Econômica, Banco do Brasil e outros bancos. Te ajudamos a encontrar a melhor taxa.',
            },
          ].map((item) => (
            <div
              key={item.q}
              className="card p-6 mb-4"
            >
              <h3 className="font-bold text-green-300 mb-2">{item.q}</h3>
              <p className="text-green-400/80 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
