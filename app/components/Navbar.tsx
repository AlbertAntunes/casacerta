'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#imoveis', label: 'Imóveis' },
  { href: '#destaques', label: 'Destaques' },
  { href: '#equipe', label: 'Equipe' },
  { href: '#contato', label: 'Contato' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="#" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-3xl flex items-center justify-center bg-gradient-to-br from-green-400 to-green-700 text-black text-lg font-black shadow-[0_20px_60px_rgba(34,197,94,0.18)]">
            🏡
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-green-light">Casa Certa</p>
            <p className="font-semibold text-white">Imóveis Premium</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-text-secondary">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex text-white border border-white/10 bg-white/5 hover:bg-white/10"
            onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DIOGO}`, '_blank')}
          >
            WhatsApp
          </Button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white md:hidden"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DIOGO}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 px-5 py-3 text-black font-semibold"
            >
              Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
