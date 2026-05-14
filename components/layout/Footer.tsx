import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-green-950 border-t border-green-800/40 pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🏠</span>
              <span className="font-serif font-black text-green-400 text-xl">
                Casa Certa Imóveis
              </span>
            </div>
            <p className="text-green-500 text-sm leading-relaxed">
              Corretores especializados em Quixadá e região.
              Realizando sonhos desde 2015.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-green-300 mb-4">Links</h3>
            <div className="flex flex-col gap-2">
              {[
                { href: '/', label: 'Início' },
                { href: '/imoveis', label: 'Todos os Imóveis' },
                { href: '/#equipe', label: 'Nossa Equipe' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-green-500 hover:text-green-400 text-sm transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-green-300 mb-4">Contato</h3>
            <div className="space-y-2 text-sm text-green-500">
              <p>📍 Quixadá, Ceará</p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DIOGO}`}
                className="flex items-center gap-2 hover:text-green-400 transition"
              >
                💬 Diogo · (88) 98154-5786
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_SALOMAO}`}
                className="flex items-center gap-2 hover:text-green-400 transition"
              >
                💬 Salomão · (88) 99713-7356
              </a>
              <p className="pt-2 text-green-600 text-xs">
                CRECI 28948-F · CRECI 15784-F
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-green-600">
          <p>© {new Date().getFullYear()} Casa Certa Imóveis. Todos os direitos reservados.</p>
          <p>Desenvolvido com ❤️ em Quixadá CE</p>
        </div>
      </div>
    </footer>
  )
}
