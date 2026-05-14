'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/imoveis', label: 'Imóveis', icon: '🏠', exact: false },
  { href: '/admin/imoveis/novo', label: 'Novo Imóvel', icon: '➕', exact: true },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-60 min-h-screen bg-green-950 border-r border-green-800/40 p-5">
        {/* Logo */}
        <div className="mb-10 px-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🏠</span>
            <span className="font-serif font-black text-green-400">Casa Certa</span>
          </div>
          <p className="text-xs text-green-600 ml-9">Painel Admin</p>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 flex-1">
          {links.map((l) => {
            const active = l.exact
              ? pathname === l.href
              : pathname.startsWith(l.href) && !(l.href === '/admin/imoveis' && pathname === '/admin/imoveis/novo')
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition',
                  active
                    ? 'bg-green-400/20 text-green-400 border border-green-400/20'
                    : 'text-green-400/60 hover:bg-green-900/50 hover:text-green-300'
                )}
              >
                <span>{l.icon}</span>
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Links úteis */}
        <div className="mt-4 pt-4 border-t border-green-800/40 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-green-600 hover:text-green-400 transition"
          >
            <span>🌐</span> Ver site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-900/20 transition"
          >
            <span>🚪</span> Sair
          </button>
        </div>
      </aside>

      {/* Topbar mobile */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-green-950 border-b border-green-800/40 flex items-center justify-between px-4 h-14">
        <span className="font-serif font-black text-green-400">🏠 Admin</span>
        <div className="flex gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'p-2 rounded-lg text-lg transition',
                pathname === l.href ? 'bg-green-400/20' : 'text-green-600'
              )}
              title={l.label}
            >
              {l.icon}
            </Link>
          ))}
          <button onClick={handleLogout} className="p-2 text-red-400" title="Sair">
            🚪
          </button>
        </div>
      </div>
    </>
  )
}
