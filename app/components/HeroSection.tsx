'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'

const typingPhrases = [
  'casas com entrada facilitada',
  'terrenos escriturados',
  'apartamentos no centro',
  'financiamento pelo FGTS',
]

export function HeroSection() {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing')
  const [index, setIndex] = useState(0)

  const phrase = useMemo(() => typingPhrases[index], [index])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDisplayed((current) => {
        if (phase === 'typing') {
          const next = phrase.slice(0, current.length + 1)
          if (next === current) return current
          if (next === phrase) {
            setPhase('deleting')
            return next
          }
          return next
        }

        const next = phrase.slice(0, current.length - 1)
        if (next === '') {
          setPhase('typing')
          setIndex((prev) => (prev + 1) % typingPhrases.length)
          return ''
        }
        return next
      })
    }, phase === 'typing' ? 85 : 45)

    return () => window.clearInterval(interval)
  }, [phrase, phase])

  return (
    <section className="hero" aria-label="Hero">
      <div className="hero-bg" />

      {/* 3 esferas flutuantes (spec) */}
      <div className="hero-shape shape-1" />
      <div className="hero-shape shape-2" />
      <div className="hero-shape shape-3" />

      <div className="hero-inner container">
        <div className="hero-left">
          <div className="hero-badge reveal" style={{ animationDelay: '0s' }}>
            <span className="badge-dot" aria-hidden="true" />
            ✅ Corretor Especialista • CRECI Ativo
          </div>

          <h1 className="hero-title reveal" style={{ animationDelay: '.1s' }}>
            Encontre seu <span className="line-green">próximo imóvel</span> com segurança.
          </h1>

          <div className="hero-location-badge reveal" style={{ animationDelay: '.2s' }}>
            📍 Quixadá - CE
          </div>

          <p className="hero-sub reveal" style={{ animationDelay: '.3s' }}>
            Especialistas em <span className="typewriter-text">{displayed}</span>
            <span className="typewriter-cursor" aria-hidden="true" />
          </p>

          {/* Mini-stats */}
          <div className="hero-stats reveal" style={{ animationDelay: '.35s' }}>
            <div>
              <div className="hero-stat-value">120+</div>
              <div className="hero-stat-label">Imóveis disponíveis</div>
            </div>
            <div>
              <div className="hero-stat-value">500+</div>
              <div className="hero-stat-label">Chaves entregues</div>
            </div>
            <div>
              <div className="hero-stat-value">4.9★</div>
              <div className="hero-stat-label">Avaliação média</div>
            </div>
          </div>

          <div className="hero-btns reveal" style={{ animationDelay: '.4s' }}>
            <Button
              variant="primary"
              size="lg"
              className="btn-primary"
              onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DIOGO}`, '_blank')}
            >
              💬 Falar no WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="btn-ghost"
              onClick={() => document.getElementById('imoveis')?.scrollIntoView({ behavior: 'smooth' })}
            >
              📍 Ver imóveis
            </Button>
          </div>

          <div className="hero-scroll-indicator reveal" style={{ animationDelay: '.8s' }} aria-hidden="true">
            <div className="hero-scroll-line" />
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-visual-card reveal" style={{ animationDelay: '.5s' }}>
            <div className="hero-visual-image">
              🏠
              {/* overlay */}
            </div>
            <div className="hero-visual-body">
              <p className="hero-visual-title">Atendimento rápido e suporte completo</p>
              <p className="hero-visual-desc">Do primeiro contato à entrega das chaves, cuidamos de tudo com transparência.</p>
              <div className="hero-visual-actions">
                <Button
                  variant="primary"
                  size="md"
                  className="btn-primary"
                  onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DIOGO}`, '_blank')}
                >
                  💬 Agendar
                </Button>
              </div>
            </div>

            <div className="hero-badge-float hero-badge-float-top-left">
              ✅ Imóveis disponíveis
              <span className="hero-badge-float-count">120+</span>
            </div>
            <div className="hero-badge-float hero-badge-float-bottom-right">
              🔑 Chaves entregues
              <span className="hero-badge-float-count">500+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee band (spec) */}
      <div className="marquee-band" aria-hidden="true">
        <div className="marquee-track">
          {[
            '🏠 Compra & Venda',
            '🌿 Terrenos Escriturados',
            '🔑 Entrada Facilitada',
            '✅ CRECI 28948 & 15784',
            '📍 Quixadá CE',
            '💬 Atendimento Rápido',
            '⭐ 4.9 de Avaliação',
          ].concat([
            '🏠 Compra & Venda',
            '🌿 Terrenos Escriturados',
            '🔑 Entrada Facilitada',
            '✅ CRECI 28948 & 15784',
            '📍 Quixadá CE',
            '💬 Atendimento Rápido',
            '⭐ 4.9 de Avaliação',
          ]).map((item, i) => (
            <div key={i} className="marquee-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

