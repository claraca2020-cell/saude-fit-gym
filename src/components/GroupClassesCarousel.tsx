import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import bikeIndoor from '../assets/photos/aula-bike-indoor.jpg'
import crossFlux from '../assets/photos/aula-cross-flux.jpg'
import fitdance from '../assets/photos/aula-fitdance.jpg'
import forro from '../assets/photos/aula-forro.jpg'
import pilates from '../assets/photos/aula-pilates.jpg'

export const GROUP_CLASS_SLIDES = [
  { image: pilates, label: 'Pilates', description: 'Fortalecimento e consciência corporal em aula coletiva.' },
  { image: fitdance, label: 'Fit Dance', description: 'Dança em grupo, energia e comunidade no ritmo da aula.' },
  { image: crossFlux, label: 'Cross & Flux Training', description: 'Treino funcional em grupo, com energia de fim de ano.' },
  { image: forro, label: 'Forró', description: 'Aula coletiva de dança que também vira festa.' },
  { image: bikeIndoor, label: 'Bike Indoor', description: 'Aula de ciclismo indoor ao ar livre, com vista da cidade.' },
]

interface GroupClassesCarouselProps {
  index: number
  direction: number
  onGo: (dir: number) => void
  onSelect: (index: number) => void
}

export function GroupClassesCarousel({ index, direction, onGo, onSelect }: GroupClassesCarouselProps) {
  const current = GROUP_CLASS_SLIDES[index]

  return (
    <div id="aulas-coletivas-carousel" className="mt-6 md:mt-12 scroll-mt-28">
      <div className="relative overflow-hidden rounded-sm">
        <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={current.image}
              src={current.image}
              alt={current.label}
              custom={direction}
              initial={{ opacity: 0, x: 40 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 * direction }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                {String(index + 1).padStart(2, '0')} / {String(GROUP_CLASS_SLIDES.length).padStart(2, '0')}
              </p>
              <h3
                className="mt-1 text-2xl text-white md:text-3xl"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
              >
                {current.label}
              </h3>
              <p className="mt-1 max-w-sm text-sm text-white/80">{current.description}</p>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => onGo(-1)}
                aria-label="Slide anterior"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[var(--color-bg-main)] transition-colors hover:bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => onGo(1)}
                aria-label="Próximo slide"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[var(--color-bg-main)] transition-colors hover:bg-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {GROUP_CLASS_SLIDES.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Ver slide ${slide.label}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-[var(--color-ink)]' : 'w-1.5 bg-[var(--color-ink)]/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
