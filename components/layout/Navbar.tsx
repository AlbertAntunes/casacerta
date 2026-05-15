'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [scrolled, setScrolled] = useState(false)

  // Persistir tema
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (saved) applyTheme(saved)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function applyTheme(t: 'dark' | 'light') {
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('theme', t)
    setTheme(t)
  }

  function toggleTheme() {
    applyTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header
      className="navbar"
      style={{
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        borderBottomColor: scrolled ? 'var(--border-hover)' : 'var(--border)',
      }}
    >
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-content-center text-lg font-bold"
            style={{ background: 'linear-gradient(135deg, var(--green), var(--green-700))' }}
          >
            🏠
          </div>
          <span
            className="font-display font-black text-base tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            Casa<span style={{ color: 'var(--green)' }}>Certa</span>
          </span>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {['Início', 'Imóveis', 'Sobre', 'Contato'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="btn btn-ghost btn-sm text-sm"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="w-12 h-6 rounded-full relative transition-all duration-300"
            style={{
              background: theme === 'dark' ? 'var(--bg3)' : 'var(--green)',
              border: '1px solid var(--border)',
            }}
          >
            <span
              className="absolute top-0.5 w-5 h-5 rounded-full text-xs flex items-center justify-center transition-all duration-300"
              style={{
                background: theme === 'dark' ? 'var(--green)' : '#fff',
                left: theme === 'dark' ? '2px' : '22px',
              }}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => window.open('https://wa.me/5585999999999', '_blank')}
          >
            💬 WhatsApp
          </Button>
        </div>
      </div>
    </header>
  )
}