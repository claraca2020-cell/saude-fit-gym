import { useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

export interface Slide {
  image: string
  label: string
  description: string
  width: number
  height: number
}

export interface SnapCarouselHandle {
  goTo: (index: number) => void
}

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Carrossel com rolagem nativa (scroll-snap): o dedo arrasta a foto de verdade,
 * sem animação por JavaScript. Os botões e os pontos só rolam até o slide.
 */
export function SnapCarousel({
  slides,
  aspect = 'aspect-[4/3] md:aspect-[16/9]',
  onOpen,
  onIndexChange,
  handleRef,
  label,
}: {
  slides: readonly Slide[]
  aspect?: string
  onOpen?: (index: number) => void
  onIndexChange?: (index: number) => void
  handleRef?: Ref<SnapCarouselHandle>
  label: string
}) {
  const scroller = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  // Quando o carrossel chega perto da tela, todas as fotos carregam de uma vez:
  // assim nenhuma aparece em branco ao deslizar.
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = scroller.current
    if (!el || near) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '800px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [near])

  const goTo = useCallback((i: number) => {
    const el = scroller.current
    const child = el?.children[(i + slides.length) % slides.length] as HTMLElement | undefined
    if (!el || !child) return
    el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [slides.length])

  useImperativeHandle(handleRef, () => ({ goTo }), [goTo])

  // Poucos slides: calcular direto no scroll é leve e não depende de requestAnimationFrame.
  const onScroll = () => {
    const el = scroller.current
    if (!el) return
    const center = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let dist = Infinity
    Array.from(el.children).forEach((c, i) => {
      const child = c as HTMLElement
      const d = Math.abs(child.offsetLeft + child.clientWidth / 2 - center)
      if (d < dist) {
        dist = d
        best = i
      }
    })
    setIndex((prev) => (prev === best ? prev : best))
  }

  useEffect(() => onIndexChange?.(index), [index, onIndexChange])

  return (
    <div role="region" aria-roledescription="carrossel" aria-label={label}>
      <div
        ref={scroller}
        onScroll={() => {
          if (!near) setNear(true)
          onScroll()
        }}
        onPointerDown={() => !near && setNear(true)}
        className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain rounded-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <figure
            key={slide.image}
            aria-label={`${i + 1} de ${slides.length}: ${slide.label}`}
            className={`relative w-[86%] shrink-0 snap-center overflow-hidden rounded-sm md:w-full ${aspect}`}
          >
            <img
              src={slide.image}
              alt={slide.label}
              width={slide.width}
              height={slide.height}
              loading={near || i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
            {onOpen && (
              <button
                type="button"
                onClick={() => onOpen(i)}
                aria-label={`Ampliar foto: ${slide.label}`}
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 md:right-5 md:top-5"
              >
                <Maximize2 size={16} />
              </button>
            )}
            <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-8">
              <h3 className="text-xl text-white md:text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {slide.label}
              </h3>
              <p className="mt-1 max-w-sm text-sm text-white/80">{slide.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-3 md:mt-3 md:justify-between">
        <p className="hidden w-24 whitespace-nowrap text-xs font-medium tabular-nums md:block tracking-[0.2em] text-[var(--color-text-muted)]" aria-live="polite">
          {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </p>
        <div className="flex justify-center">
          {slides.map((slide, i) => (
            <button key={slide.image} type="button" onClick={() => goTo(i)} aria-label={`Ver ${slide.label}`} aria-pressed={i === index} className="carousel-indicator" />
          ))}
        </div>
        <div className="hidden w-24 justify-end gap-2 md:flex">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Anterior"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Próxima"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
