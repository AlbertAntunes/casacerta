'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/#imoveis', label: 'Imóveis' },
  { href: '/#destaques', label: 'Destaques' },
  { href: '/#equipe', label: 'Equipe' },
  { href: '/imoveis', label: 'Todos' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-green-950/90 backdrop-blur-xl border-b border-green-800/40 shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <span className="font-serif font-black text-green-400 text-lg leading-none">
              Casa<br />
              <span className="text-green-100">Certa</span>
            </span>
          </Link>

          {/* Links desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'text-sm font-semibold transition relative pb-0.5',
                  'after:absolute after:bottom-0 after:left-0 after:h-0.5',
                  'after:bg-green-400 after:transition-all after:duration-300',
                  pathname === l.href
                    ? 'text-green-400 after:w-full'
                    : 'text-green-300 hover:text-green-400 after:w-0 hover:after:w-full'
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DIOGO}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-2 px-5 text-sm"
            >
              💬 WhatsApp
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg bg-green-900/50 border border-green-700/30"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <div className={cn('w-5 h-0.5 bg-green-300 transition-all', open && 'rotate-45 translate-y-1.5')} />
            <div className={cn('w-5 h-0.5 bg-green-300 my-1 transition-all', open && 'opacity-0')} />
            <div className={cn('w-5 h-0.5 bg-green-300 transition-all', open && '-rotate-45 -translate-y-1.5')} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-16 z-40 md:hidden transition-all duration-300',
          'bg-green-950/95 backdrop-blur-xl border-b border-green-800/40',
          open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        )}
      >
        <nav className="container py-6 flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-green-300 font-semibold hover:bg-green-900 hover:text-green-400 transition"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DIOGO}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary justify-center mt-2"
          >
            💬 WhatsApp
          </a>
        </nav>
      </div>
    </>
  )
}
