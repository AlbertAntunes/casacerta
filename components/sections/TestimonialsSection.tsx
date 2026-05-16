'use client'

import { useState } from 'react'

const testimonials = [
  {
    quote: 'A Casa Certa superou nossas expectativas com um atendimento ágil e uma seleção impecável de imóveis.',
    name: 'Carla Oliveira',
    role: 'Cliente satisfeita',
  },
  {
    quote: 'Fomos orientados a cada passo. A negociação foi clara e tranquila, e o imóvel foi entregue conforme combinado.',
    name: 'João Pereira',
    role: 'Investidor residencial',
  },
  {
    quote: 'Profissionais experientes, foco total no cliente e reforço de segurança documental. Recomendo de olhos fechados.',
    name: 'Marina Costa',
    role: 'Compradora',
  },
]

export function TestimonialsSection() {
  const [active, setActive] = useState(0)

  return (
    <section id="depoimentos" className="py-24">
      <div className="container">
        <div className="text-center mb-14">
          <div className="section-label justify-center">Depoimentos</div>
          <h2 className="section-title">Feedback real de clientes que confiaram na Casa Certa.</h2>
        </div>

        <div className="glass-section p-10 max-w-4xl mx-auto">
          <div className="testimonial-card">
            <p className="text-xl leading-9 text-text-secondary mb-8">“{testimonials[active].quote}”</p>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-white">{testimonials[active].name}</span>
              <span className="text-sm text-text-secondary">{testimonials[active].role}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`inline-flex h-3 w-3 rounded-full transition ${active === index ? 'bg-green-400' : 'bg-white/20 hover:bg-white/40'}`}
                onClick={() => setActive(index)}
                aria-label={`Depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
