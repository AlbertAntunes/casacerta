export function CTASection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="glass-section p-12 xl:p-16 text-center">
          <p className="section-label justify-center">Pronto para mudar</p>
          <h2 className="section-title">Agende seu atendimento VIP e descubra imóveis com valor real.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary leading-8">
            Atendimento dedicado, visitas privativas e negociações estruturadas para que você avance com segurança e tranquilidade.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:justify-center gap-4">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DIOGO}`} target="_blank" rel="noreferrer" className="btn btn-primary">
              💬 Reservar atendimento
            </a>
            <a href="#imoveis" className="btn btn-outline">
              Ver imóveis agora
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
