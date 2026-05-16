'use client'

import { useEffect, useState } from 'react'

export function CookieBanner() {
  const [accepted, setAccepted] = useState<boolean | null>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem('cookieAccepted')
    setAccepted(stored === 'true')
  }, [])

  function accept() {
    window.localStorage.setItem('cookieAccepted', 'true')
    setAccepted(true)
  }

  if (accepted === true) return null

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <div>
          <p className="font-semibold text-white">Cookies para uma experiência premium.</p>
          <p className="text-text-secondary text-sm leading-6">
            Utilizamos cookies essenciais para manter seu acesso seguro, análises de uso e melhorias contínuas da navegação.
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={accept}>
          Aceitar e continuar
        </button>
      </div>
    </div>
  )
}
