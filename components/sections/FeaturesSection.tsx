export function FeaturesSection() {
  const features = [
    {
      title: 'Seleção criteriosa',
      description: 'Imóveis escolhidos para quem valoriza qualidade, acabamento e localização premium.',
    },
    {
      title: 'Consultoria dedicada',
      description: 'Apoio completo durante visitação, proposta e fechamento para decisões seguras.',
    },
    {
      title: 'Financiamento estratégico',
      description: 'Analisamos as melhores opções de crédito para que você avance com confiança e tranquilidade.',
    },
  ]

  return (
      <section id="diferenciais" className="py-24 bg-[#08110b]">
      <div className="container">
        <div className="text-center mb-14">
          <div className="section-label justify-center">Diferenciais</div>
          <h2 className="section-title">O que diferencia a experiência Casa Certa.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary leading-8">
            Atendimento exclusivo, seleção premium e segurança documental para clientes que buscam mais do que apenas um imóvel.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((item) => (
            <div key={item.title} className="glass-section p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
              <p className="text-text-secondary leading-7">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
