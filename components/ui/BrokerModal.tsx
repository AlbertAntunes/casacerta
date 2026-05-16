'use client'

import { useEffect } from 'react'

interface BrokerModalProps {
  open: boolean
  onClose: () => void
}

export function BrokerModal({ open, onClose }: BrokerModalProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-panel">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar modal">
          ✕
        </button>
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-green-300">Atendimento VIP</p>
          <h2 className="text-3xl font-black text-white">Converse com nossos corretores agora.</h2>
          <p className="text-text-secondary leading-8">
            Escolha o corretor ideal para sua jornada e receba respostas rápidas, tour privativo e apoio na documentação.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { name: 'Diogo Sousa', phone: process.env.NEXT_PUBLIC_WHATSAPP_DIOGO },
              { name: 'Salomão Teodoseo', phone: process.env.NEXT_PUBLIC_WHATSAPP_SALOMAO },
            ].map((broker) => (
              <a
                key={broker.name}
                href={`https://wa.me/${broker.phone}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary w-full justify-center"
              >
                💬 {broker.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
