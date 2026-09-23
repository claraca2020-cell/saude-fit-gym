import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GROUP_CLASS_SLIDES } from './groupClassSlides'

interface GroupClassesCarouselProps {
  index: number
  direction: number
  onGo: (dir: number) => void
  onSelect: (index: number) => void
}

export function GroupClassesCarousel({ index, direction, onGo, onSelect }: GroupClassesCarouselProps) {
  const current = GROUP_CLASS_SLIDES[index]
  const previous = GROUP_CLASS_SLIDES[(index - 1 + GROUP_CLASS_SLIDES.length) % GROUP_CLASS_SLIDES.length]
  const next = GROUP_CLASS_SLIDES[(index + 1) % GROUP_CLASS_SLIDES.length]

  return (
    <div id="aulas-coletivas-carousel" className="mt-6 md:mt-12 scroll-mt-28">
      <div className="relative overflow-hidden rounded-sm">
        <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
          <div className="absolute inset-0 flex gap-1 md:hidden">
            <img src={previous.image} alt="" aria-hidden="true" width={previous.width} height={previous.height} loading="lazy" decoding="async" className="h-full w-[13%] object-cover opacity-75" />
            <div className="w-[74%]" />
            <img src={next.image} alt="" aria-hidden="true" width={next.width} height={next.height} loading="lazy" decoding="async" className="h-full w-[13%] object-cover opacity-75" />
          </div>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={current.image}
              src={current.image}
              alt={current.label}
              width={current.width}
              height={current.height}
              loading="lazy"
              decoding="async"
              custom={direction}
              initial={{ opacity: 0, x: 40 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 * direction }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-y-0 left-[13%] h-full w-[74%] object-cover md:inset-0 md:w-full"
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
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[var(--color-bg-main)] transition-colors hover:bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => onGo(1)}
                aria-label="Próximo slide"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[var(--color-bg-main)] transition-colors hover:bg-white"
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
            aria-pressed={i === index}
            className="carousel-indicator"
          />
        ))}
      </div>
    </div>
  )
}
