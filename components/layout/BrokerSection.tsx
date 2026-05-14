export function BrokerSection() {
  const brokers = [
    {
      name: 'Diogo Sousa',
      initials: 'DS',
      creci: '28948-F',
      bio: 'Especialista em imóveis residenciais em Quixadá e região. Atendimento humanizado, do primeiro contato à entrega das chaves.',
      anos: '10+',
      clientes: '300+',
      nota: '4.9★',
      wpp: process.env.NEXT_PUBLIC_WHATSAPP_DIOGO ?? '',
      gradient: 'from-green-500 to-green-700',
    },
    {
      name: 'Salomão Teodoseo',
      initials: 'ST',
      creci: '15784-F',
      bio: 'Especialista em terrenos e investimentos imobiliários. Conhecimento profundo do mercado local para garantir o melhor negócio.',
      anos: '8+',
      clientes: '200+',
      nota: '4.8★',
      wpp: process.env.NEXT_PUBLIC_WHATSAPP_SALOMAO ?? '',
      gradient: 'from-yellow-600 to-yellow-800',
    },
  ]

  return (
    <section id="equipe" className="py-24 bg-green-950/60">
      <div className="container">
        <div className="text-center mb-14">
          <div className="section-label justify-center">👥 Equipe</div>
          <h2 className="section-title">
            Conheça Nossa <span className="accent">Equipe</span>
          </h2>
          <p className="text-green-400/70 max-w-md mx-auto">
            Dois corretores certificados, uma missão: realizar o sonho do seu imóvel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {brokers.map((b) => (
            <div key={b.name} className="card overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              {/* Banner */}
              <div className={`h-28 bg-gradient-to-br ${b.gradient} relative`}>
                <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-full border-4 border-green-900 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center font-serif text-2xl font-black text-white shadow-xl">
                  {b.initials}
                </div>
              </div>

              <div className="pt-14 p-6">
                <h3 className="font-serif text-xl font-black text-green-100">{b.name}</h3>
                <p className="text-green-500 text-sm mb-3">Corretor de Imóveis</p>

                <span className="inline-flex items-center gap-1.5 bg-green-400/10 border border-green-400/20 rounded-full px-3 py-1 text-xs font-bold text-green-400 mb-4">
                  ✅ CRECI {b.creci}
                </span>

                <p className="text-green-400/80 text-sm leading-relaxed mb-5">{b.bio}</p>

                <div className="flex gap-4 pb-5 mb-5 border-b border-green-800/40">
                  {[
                    { val: b.anos, label: 'Anos exp.' },
                    { val: b.clientes, label: 'Clientes' },
                    { val: b.nota, label: 'Avaliação' },
                  ].map((s) => (
                    <div key={s.label} className="text-center flex-1">
                      <div className="font-serif text-xl font-black text-green-400">{s.val}</div>
                      <div className="text-xs text-green-600">{s.label}</div>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/${b.wpp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
