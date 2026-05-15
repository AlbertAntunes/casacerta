'use client'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'

const marqueeItems = [
  'Atendimento Personalizado',
  'Tour Virtual',
  'Entrada Facilitada',
  'Parcelas Acessíveis',
  'Documentação Segura',
  'Quixadá e Região',
]

export function HeroSection() {
  const revealRef = useRef<HTMLDivElement>(null)

  // Scroll reveal simples
  useEffect(() => {
    const els = revealRef.current?.querySelectorAll('.reveal')
    if (!els) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.1 }
    )
    els.forEach((el, i) => {
      ;(el as HTMLElement).style.transitionDelay = `${i * 80}ms`
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <section className="hero" ref={revealRef}>
      <div className="container-sm text-center">

        {/* Eyebrow */}
        <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider mb-6"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            color: 'var(--green)',
          }}
        >
          ✅ Corretor de Confiança · CRECI Ativo
        </div>

        {/* Nome */}
        <h1 className="reveal display-xl mb-2">
          DIOGO<br />
          <span className="accent">SOUSA</span>
        </h1>

        {/* Localização */}
        <div className="reveal inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase mb-6 mt-3"
          style={{ background: 'var(--green)', color: '#fff' }}
        >
          📍 QUIXADÁ – CE
        </div>

        {/* Subtítulo */}
        <p className="reveal text-base leading-relaxed mb-8 mx-auto max-w-xs"
          style={{ color: 'var(--text2)' }}
        >
          Especialista em imóveis residenciais e terrenos.
          Atendimento personalizado do início ao fim.
        </p>

        {/* CTAs */}
        <div className="reveal flex flex-col gap-3 mb-0">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => window.open('https://wa.me/5585999999999', '_blank')}
          >
            💬 Fazer uma simulação gratuita
          </Button>
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => document.getElementById('imoveis')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Imóveis Disponíveis
          </Button>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="overflow-hidden mt-12 py-3"
        style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex gap-8 w-max animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap text-xs font-medium"
              style={{ color: 'var(--text3)' }}
            >
              <span style={{ color: 'var(--green)', fontSize: '8px' }}>●</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
