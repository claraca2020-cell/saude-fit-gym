import { ExternalLink, MapPin } from 'lucide-react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const MAPS_EMBED_SRC =
  'https://www.google.com/maps?q=Sa%C3%BAde+Fit+GYM+-+Academia+Riacho+Fundo+1&output=embed'
const WAZE_EMBED_SRC = 'https://embed.waze.com/iframe?zoom=16&lat=-15.890847&lon=-48.013237&pin=1&ct=livemap'
const WAZE_OPEN_URL =
  'https://ul.waze.com/ul?place=ChIJybOmgzEsWpMRjlzYXnp5uc0&ll=-15.89084700%2C-48.01323710&navigate=yes'

export function Location() {
  const ref = useRevealOnScroll<HTMLDivElement>()

  return (
    <section id="ambiente" className="border-t border-[var(--color-border)] pt-10 pb-14 md:pt-12 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-[var(--color-accent)]">
              Ambiente
            </p>
            <h2
              className="mt-4 max-w-lg text-4xl leading-tight text-[var(--color-ink)] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              Localizada perto de você.
            </h2>
          </div>

          <div className="flex items-start gap-2 text-sm text-[var(--color-text-muted)] md:max-w-xs">
            <MapPin className="mt-0.5 shrink-0 text-[var(--color-accent)]" size={18} />
            <p>
              Col. Agrícola Sucupira, Lote 01 — Riacho Fundo I, Brasília – DF, 71827-620
            </p>
          </div>
        </div>

        <div ref={ref} className="reveal-group grid grid-cols-2 gap-2 sm:gap-4">
          <div className="overflow-hidden rounded-sm border border-[var(--color-border)]">
            <p className="border-b border-[var(--color-border)] bg-[var(--color-bg-card)] px-2 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)] sm:px-4 sm:py-2.5 sm:text-xs sm:tracking-[0.2em]">
              Google Maps
            </p>
            <iframe
              title="Localização da Saúde Fit Gym no Google Maps"
              src={MAPS_EMBED_SRC}
              className="h-[190px] w-full sm:h-[320px] md:h-[420px]"
              style={{ filter: 'invert(92%) hue-rotate(180deg) contrast(85%) brightness(0.9)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="overflow-hidden rounded-sm border border-[var(--color-border)]">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-card)] px-2 py-1.5 sm:px-4 sm:py-2.5">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)] sm:text-xs sm:tracking-[0.2em]">
                Waze
              </p>
              <a
                href={WAZE_OPEN_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir no Waze"
                className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-soft)]"
              >
                <span className="hidden sm:inline">Abrir no Waze</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <iframe
              title="Localização da Saúde Fit Gym no Waze"
              src={WAZE_EMBED_SRC}
              className="h-[190px] w-full sm:h-[320px] md:h-[420px]"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
