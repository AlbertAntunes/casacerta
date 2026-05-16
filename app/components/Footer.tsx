export function Footer() {
  return (
    <footer className="py-20">
      <div className="container flex flex-col gap-6 border-t border-white/10 pt-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-green-light mb-3">Casa Certa</p>
            <p className="text-sm text-text-secondary max-w-md">
              Imóveis premium em Quixadá com atendimento à altura do seu investimento.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            <a href="#imoveis" className="transition hover:text-white">
              Imóveis
            </a>
            <a href="#destaques" className="transition hover:text-white">
              Destaques
            </a>
            <a href="#equipe" className="transition hover:text-white">
              Equipe
            </a>
            <a href="#contato" className="transition hover:text-white">
              Contato
            </a>
          </div>
        </div>

        <p className="text-sm text-text-muted">
          © {new Date().getFullYear()} Casa Certa Imóveis. Site otimizado para performance e experiência internacional.
        </p>
      </div>
    </footer>
  )
}
