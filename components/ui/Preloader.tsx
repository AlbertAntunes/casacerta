'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => {
      const fill = document.querySelector('.preloader-fill') as HTMLElement | null
      if (fill) fill.style.width = '100%'
    }, 50)

    const t2 = setTimeout(() => setVisible(false), 1600 + 600) // wait animation + hide transition

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="preloader" role="status" aria-hidden={!visible}>
      <div className="preloader-inner">
        <div className="preloader-logo">Casa Certa</div>
        <div className="preloader-bar">
          <div className="preloader-fill" />
        </div>
      </div>
    </div>
  )
}
