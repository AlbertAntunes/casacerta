export function HowItWorksSection() {
  const steps = [
    {
      title: 'Briefing personalizado',
      description: 'Entendemos seu perfil, preferências e exigências para apresentar imóveis alinhados ao seu estilo de vida.',
    },
    {
      title: 'Tour VIP e seleção',
      description: 'Visitas agendadas com cuidado, análise de localização e curadoria premium dos melhores imóveis.',
    },
    {
      title: 'Negociação transparente',
      description: 'Acompanhamos todo o caminho até a proposta, aprovação de crédito e fechamento seguro.',
    },
  ]

  return (
    <section id="processo" className="py-24">
      <div className="container">
        <div className="text-center mb-14">
          <div className="section-label justify-center">Nosso Processo</div>
          <h2 className="section-title">A jornada premium para seu novo imóvel.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((item) => (
            <article key={item.title} className="feature-card p-8">
              <div className="badge-pill mb-5">{item.title}</div>
              <p className="text-text-secondary leading-7">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
