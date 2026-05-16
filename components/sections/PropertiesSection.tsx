'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type FilterKey = 'all' | 'venda' | 'aluguel' | 'terreno'

type Property = {
  id: number
  title: string
  type: 'venda' | 'aluguel' | 'terreno'
  tags: string[]
  price: string
  gradient: string
  emoji: string
  badge?: string
  favorited?: boolean
}

const properties: Property[] = [
  {
    id: 1,
    title: 'Casa com 3 Quartos – Boa Vista',
    type: 'venda',
    tags: ['📍 Boa Vista', '🛏 3 qtos', '📐 150m²', '🚗 1 vaga'],
    price: 'R$ 220.000',
    gradient: 'linear-gradient(135deg,#052e16,#0f4c2a)',
    emoji: '🏠',
  },
  {
    id: 2,
    title: 'Casa Moderna Área Gourmet',
    type: 'venda',
    tags: ['📍 Centro', '🛏 4 qtos', '📐 240m²', '🚗 2 vagas'],
    price: 'R$ 410.000',
    gradient: 'linear-gradient(135deg,#134e4a,#0f3d38)',
    emoji: '🏡',
  },
  {
    id: 3,
    title: 'Terreno Plano – Bairro Novo',
    type: 'terreno',
    tags: ['📍 Bairro Novo', '📐 250m²', '✅ Escriturado'],
    price: 'R$ 95.000',
    gradient: 'linear-gradient(135deg,#713f12,#451a03)',
    emoji: '🌿',
  },
  {
    id: 4,
    title: 'Apto 2 Quartos – São José',
    type: 'aluguel',
    tags: ['📍 São José', '🛏 2 qtos', '📐 65m²'],
    price: 'R$ 1.200/mês',
    gradient: 'linear-gradient(135deg,#1e3a5f,#0c1f3a)',
    emoji: '🏢',
  },
  {
    id: 5,
    title: 'Casa Geminada – Boa Vista',
    type: 'venda',
    tags: ['📍 Boa Vista', '🛏 2 qtos', '📐 120m²'],
    price: 'R$ 165.000',
    gradient: 'linear-gradient(135deg,#052e16,#064e3b)',
    emoji: '🏘',
  },
  {
    id: 6,
    title: 'Terreno Comercial – Centro',
    type: 'terreno',
    tags: ['📍 Centro', '📐 500m²', '🏪 Comercial'],
    price: 'R$ 150.000',
    gradient: 'linear-gradient(135deg,#7c2d12,#431407)',
    emoji: '🌄',
  },
]

function filterLabel(t: FilterKey) {
  if (t === 'all') return 'Todos'
  if (t === 'venda') return 'Venda'
  if (t === 'aluguel') return 'Aluguel'
  return 'Terreno'
}

export function PropertiesSection() {
  const [filter, setFilter] = useState<FilterKey>('all')
  const [visibleMap, setVisibleMap] = useState<Record<number, boolean>>(() => {
    const m: Record<number, boolean> = {}
    properties.forEach((p) => (m[p.id] = true))
    return m
  })

  const timeoutsRef = useRef<number[]>([])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t))
      timeoutsRef.current = []
    }
  }, [])

  // Lógica: opacity/scale imediatos -> após 350ms display:none
  useEffect(() => {
    const shouldShow = (p: Property) => (filter === 'all' ? true : p.type === filter)

    // 1) seta todos como "presentes" inicialmente (para permitir animação de saída)
    setVisibleMap((prev) => {
      const next = { ...prev }
      properties.forEach((p) => {
        next[p.id] = shouldShow(p)
      })
      return next
    })

    // 2) aplica display:none com atraso
    const t = window.setTimeout(() => {
      // no estado já setamos: true/false. O display:none será aplicado via classe.
    }, 350)

    timeoutsRef.current.push(t)
  }, [filter])

  const filteredForOrder = useMemo(() => properties, [])

  return (
    <section className="properties" id="imoveis">
      <div className="container">
        <div className="text-center mb-14">
          <div className="section-label justify-center">Imóveis</div>
          <h2 className="section-title">
            Encontre seu <span className="accent">refúgio em Quixadá</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(['all', 'venda', 'aluguel', 'terreno'] as FilterKey[]).map((k) => {
            const isActive = filter === k
            return (
              <button
                key={k}
                type="button"
                className={
                  isActive
                    ? 'filter-tab filter-tab-active'
                    : 'filter-tab'
                }
                onClick={() => setFilter(k)}
              >
                {filterLabel(k)}
              </button>
            )
          })}
        </div>

        <div className="prop-grid">
          {filteredForOrder.map((p) => {
            const show = visibleMap[p.id]
            const isMatch = filter === 'all' ? true : p.type === filter

            return (
              <article
                key={p.id}
                className={
                  `prop-card ${show ? '' : 'prop-card-hidden'}`
                }
                aria-hidden={!show}
                data-type={p.type}
                style={{
                  opacity: isMatch ? 1 : 0,
                  transform: isMatch ? 'scale(1)' : 'scale(.95)',
                }}
              >
                <div className="prop-photo" style={{ backgroundImage: p.gradient }}>
                  <div className="prop-photo-overlay" />
                  <div className="prop-photo-emoji">{p.emoji}</div>

                  <div
                    className="prop-badge"
                    data-badge={p.type}
                  >
                    {p.type === 'venda' ? 'Venda' : p.type === 'aluguel' ? 'Aluguel' : 'Terreno'}
                  </div>

                  <button type="button" className="prop-fav" aria-label="Favoritar">
                    ♡
                  </button>
                </div>

                <div className="prop-body">
                  <h3 className="prop-title">{p.title}</h3>

                  <div className="prop-tags">
                    {p.tags.slice(0, 4).map((t, idx) => (
                      <span key={idx} className="prop-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="prop-price">{p.price}</div>

                  <div className="prop-actions">
                    <button type="button" className="btn btn-primary prop-btn">
                      💬 Falar com corretor
                    </button>
                    <button type="button" className="btn btn-ghost prop-btn-ghost">
                      📍 Ver região
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .properties {
          background: var(--bg);
          padding: 96px 0;
        }

        .filter-tab {
          background: var(--card);
          border: 1px solid var(--border);
          color: var(--text2);
          border-radius: 99px;
          padding: 10px 22px;
          font-size: 13px;
          font-weight: 700;
          transition: var(--tr);
        }

        .filter-tab:hover {
          border-color: var(--g400);
          color: var(--g400);
        }

        .filter-tab.filter-tab-active {
          background: var(--g400);
          color: #fff;
        }

        .prop-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .prop-card {
          position: relative;
          overflow: hidden;
          border-radius: var(--r2);
          border: 1px solid var(--border);
          transition: var(--tr);
        }

        .prop-card::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: var(--r2);
          background: linear-gradient(135deg, var(--g400), var(--gold));
          z-index: -1;
          opacity: 0;
          transition: opacity .3s;
        }

        .prop-card:hover::after {
          opacity: .35;
        }

        .prop-card-hidden {
          pointer-events: none;
        }

        .prop-photo {
          height: 200px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background-size: cover;
        }

        .prop-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,.15), rgba(0,0,0,.65));
        }

        .prop-photo-emoji {
          position: relative;
          font-size: 48px;
          z-index: 1;
          filter: drop-shadow(0 0 20px rgba(34,197,94,.4));
        }

        .prop-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          border-radius: 99px;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 700;
          color: var(--g900);
          z-index: 2;
          background: var(--g400);
        }

        .prop-badge[data-badge='aluguel'] {
          background: #2563EB;
          color: #fff;
        }

        .prop-badge[data-badge='terreno'] {
          background: var(--gold);
          color: var(--g900);
        }

        .prop-fav {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(0,0,0,.4);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,.08);
          color: #fff;
          z-index: 2;
          transition: var(--tr);
        }

        .prop-fav:hover {
          background: rgba(239,68,68,.8);
          transform: translateY(-1px);
        }

        .prop-body {
          padding: 20px;
        }

        .prop-title {
          font-size: 16px;
          font-weight: 900;
          font-family: 'Playfair Display', serif;
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .prop-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 14px;
        }

        .prop-tag {
          border-radius: 99px;
          background: var(--bg3);
          border: 1px solid var(--border);
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 700;
          color: var(--text2);
        }

        .prop-price {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 900;
          color: var(--g400);
          margin-bottom: 14px;
        }

        .prop-actions {
          display: flex;
          gap: 12px;
        }

        .prop-btn {
          flex: 1;
          justify-content: center;
          padding: 12px 14px;
          font-size: 13px;
          border-radius: 12px;
        }

        .prop-btn-ghost {
          flex: 1;
          justify-content: center;
          padding: 12px 14px;
          font-size: 13px;
          border-radius: 12px;
          border: 1px solid var(--border2);
        }

        @media(max-width:1024px) {
          .prop-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media(max-width:768px) {
          .prop-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

