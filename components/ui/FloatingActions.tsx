'use client'

import { useEffect, useState } from 'react'
import { BrokerModal } from './BrokerModal'

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 480)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="floating-actions">
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DIOGO}`}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-action"
          aria-label="WhatsApp Casa Certa"
        >
          💬
        </a>
        <button type="button" className="floating-action" onClick={() => setOpenModal(true)}>
          📅
        </button>
      </div>

      {showTop && (
        <button
          type="button"
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Voltar ao topo"
        >
          ↑
        </button>
      )}

      <div className="mobile-sticky-cta">
        <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DIOGO}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center">
          WhatsApp VIP
        </a>
      </div>

      <BrokerModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  )
}
