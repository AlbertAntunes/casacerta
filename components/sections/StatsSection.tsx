export function StatsSection() {
  const stats = [
    { value: '98%', label: 'Taxa de satisfação' },
    { value: '120+', label: 'Clientes atendidos' },
    { value: '75+', label: 'Imóveis selecionados' },
    { value: '15', label: 'Anos de experiência' },
  ]

  return (
      <section id="diferenciais" className="py-24 bg-[#090f0b]">
      <div className="container">
        <div className="text-center mb-16">
          <div className="section-label justify-center">Resultados</div>
          <h2 className="section-title">Performance que confirma confiança e resultado.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="stat-card">
              <div className="stat-value">{item.value}</div>
              <p className="stat-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
