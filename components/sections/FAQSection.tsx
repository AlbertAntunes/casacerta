'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Como faço para começar a busca por imóvel?',
    a: 'Entre em contato via WhatsApp, esclareça suas prioridades e receba uma seleção de imóveis premium alinhados ao seu perfil.',
  },
  {
    q: 'Posso usar financiamento ou FGTS?',
    a: 'Sim, assessora¬mos financiamento e utilização de FGTS para que você encontre a melhor alternativa financeira.',
  },
  {
    q: 'Vocês atuam apenas em Quixadá?',
    a: 'Nosso foco principal é Quixadá CE, mas temos parcerias locais em cidades vizinhas para oportunidades estratégicas.',
  },
  {
    q: 'Qual o diferencial da consultoria Casa Certa?',
    a: 'Atendimento personalizado, curadoria de imóveis e suporte total nos processos de visita, negociação e documentação.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 bg-[#08120c]">
      <div className="container">
        <div className="text-center mb-14">
          <div className="section-label justify-center">FAQ</div>
          <h2 className="section-title">Perguntas frequentes sobre o atendimento Casa Certa.</h2>
        </div>

        <div className="grid gap-4 max-w-4xl mx-auto">
          {faqs.map((item, index) => {
            const open = index === openIndex
            return (
              <button
                key={item.q}
                type="button"
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="faq-item"
              >
                <div className="faq-summary">
                  <span>{item.q}</span>
                  <span className="faq-icon">{open ? '−' : '+'}</span>
                </div>
                <div className={`faq-answer ${open ? 'open' : ''}`}>
                  <p>{item.a}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
