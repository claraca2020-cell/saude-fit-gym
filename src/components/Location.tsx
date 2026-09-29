import { useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'

const MAPS_EMBED_SRC = 'https://www.google.com/maps?q=Sa%C3%BAde+Fit+GYM+-+Academia+Riacho+Fundo+1&output=embed'
const MAPS_ROUTE_URL = 'https://www.google.com/maps/dir/?api=1&destination=Sa%C3%BAde+Fit+GYM+-+Academia+Riacho+Fundo+1'
const ENDERECO = 'Col. Agrícola Sucupira, Lote 01, Riacho Fundo I, Brasília – DF, 71827-620'

export function Location() {
  // O mapa do Google só carrega quando a pessoa pede: a página rola leve.
  const [showMap, setShowMap] = useState(false)

  return (
    <section id="ambiente" className="border-t border-[var(--color-border)] py-10 md:py-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[var(--color-accent)]">Localização</p>
        <h2 className="mt-3 max-w-lg text-3xl leading-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Localizada perto de você.
        </h2>

        <div className="mt-6 overflow-hidden rounded-sm border border-[var(--color-border)] md:mt-10">
          {showMap ? (
            <iframe title="Localização da Saúde Fit Gym" src={MAPS_EMBED_SRC} className="block h-[320px] w-full md:h-[420px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <div className="flex flex-col gap-5 bg-[var(--color-bg-card)] p-6 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-accent)]">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="font-semibold text-[var(--color-ink)]">Saúde Fit Gym</p>
                  <p className="mt-1 max-w-md text-sm text-[var(--color-text-muted)]">{ENDERECO}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <a href={MAPS_ROUTE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em]">
                  <Navigation size={14} /> Como chegar
                </a>
                <button type="button" onClick={() => setShowMap(true)} className="inline-flex items-center justify-center rounded-sm border border-[var(--color-border)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]">
                  Ver mapa aqui
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
