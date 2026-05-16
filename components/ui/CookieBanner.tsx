'use client'

import { useEffect, useState } from 'react'

export function CookieBanner() {
  const [decision, setDecision] = useState<'accepted' | 'declined' | null>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem('cookieConsent')
    if (stored === 'accepted' || stored === 'declined') setDecision(stored)
  }, [])

  function accept() {
    window.localStorage.setItem('cookieConsent', 'accepted')
    setDecision('accepted')
  }

  function decline() {
    window.localStorage.setItem('cookieConsent', 'declined')
    setDecision('declined')
  }

  if (decision) return null

  return (
    <div id="cookieBanner">
      <p className="font-semibold text-white">Cookies para uma experiência premium.</p>
      <p className="text-text-secondary text-sm">
        Utilizamos cookies essenciais para manter seu acesso seguro e melhorar sua navegação.
      </p>

      <a
        href="#"
        className="cookie-privacy-link"
        onClick={(e) => e.preventDefault()}
      >
        Política de Privacidade
      </a>

      <div className="cookie-actions">
        <button type="button" className="cookie-accept" onClick={accept}>
          Aceitar
        </button>
        <button type="button" className="cookie-decline" onClick={decline}>
          Recusar
        </button>
      </div>
    </div>
  )
}
