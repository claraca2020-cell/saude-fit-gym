import { MapPin } from 'lucide-react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const MAPS_EMBED_SRC =
  'https://www.google.com/maps?q=Sa%C3%BAde+Fit+GYM+-+Academia+Riacho+Fundo+1&output=embed'

export function Location() {
  const ref = useRevealOnScroll<HTMLDivElement>()

  return (
    <section id="ambiente" className="border-t border-[var(--color-border)] pt-10 pb-14 md:pt-12 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[var(--color-accent)] sm:text-base">
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
            <MapPin className="mt-0.5 shrink-0 text-[var(--color-ink)]" size={18} />
            <p>
              Col. Agrícola Sucupira, Lote 01, Riacho Fundo I, Brasília – DF, 71827-620
            </p>
          </div>
        </div>

        <div ref={ref} className="reveal-group overflow-hidden rounded-sm border border-[var(--color-border)]">
          <iframe
            title="Localização da Saúde Fit Gym"
            src={MAPS_EMBED_SRC}
            className="h-[320px] w-full md:h-[420px]"
            style={{ filter: 'invert(92%) hue-rotate(180deg) contrast(85%) brightness(0.9)' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
