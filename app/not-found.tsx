import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <span className="text-8xl mb-6">🏠</span>
      <h1 className="font-serif text-5xl font-black text-green-400 mb-4">404</h1>
      <p className="text-xl text-green-300 mb-8">Página não encontrada</p>
      <Link href="/" className="btn-primary">← Voltar ao início</Link>
    </div>
  )
}
