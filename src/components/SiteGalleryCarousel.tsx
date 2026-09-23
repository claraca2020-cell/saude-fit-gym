import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import areaMusculacao from '../assets/photos/optimized/area-musculacao.webp'
import cardioEliptico from '../assets/photos/optimized/cardio-eliptico.webp'
import cardioEsteiras from '../assets/photos/optimized/cardio-esteiras.webp'
import musculacao from '../assets/photos/optimized/musculacao.webp'
import recepcao from '../assets/photos/optimized/recepcao.webp'
import salaFuncional from '../assets/photos/optimized/sala-funcional.webp'

const SLIDES = [
  { image: recepcao, label: 'Recepção', description: 'Ambiente monitorado 24h, pronto para te receber.', width: 1400, height: 788 },
  { image: areaMusculacao, label: 'Área de Musculação', description: 'Estações completas de peso livre, guiadas por número.', width: 1400, height: 788 },
  { image: salaFuncional, label: 'Sala Funcional', description: 'Espaço amplo para treinos funcionais e alongamento.', width: 1400, height: 788 },
  { image: cardioEsteiras, label: 'Esteiras', description: 'Esteiras com vista para a rua.', width: 1600, height: 900 },
  { image: cardioEliptico, label: 'Cardio', description: 'Elípticos e bikes para o seu cardio.', width: 1600, height: 900 },
  { image: musculacao, label: 'Musculação', description: 'Equipamentos guiados, do aquecimento à força máxima.', width: 1600, height: 900 },
]

export function SiteGalleryCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPhotoOpen, setIsPhotoOpen] = useState(false)

  const go = (dir: number) => {
    setDirection(dir)
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length)
  }

  const current = SLIDES[index]

  return (
    <section id="conheca-o-espaco" className="border-t border-[var(--color-border)] pt-2 pb-6 md:pt-6 md:pb-10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="text-base font-bold uppercase tracking-[0.35em] text-[var(--color-accent)] md:text-sm">
          Conheça o espaço
        </p>
        <h2
          className="mt-4 text-3xl leading-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
        >
          Uma volta pela Saúde Fit Gym.
        </h2>

        <div className="relative mt-4 md:mt-8 overflow-hidden rounded-sm">
          <div className="relative aspect-[4/3] w-full md:aspect-[16/10]">
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
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />

            <button
              type="button"
              onClick={() => setIsPhotoOpen(true)}
              className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors hover:bg-black/75 md:right-6 md:top-6"
            >
              <Maximize2 size={16} />
              Ver foto
            </button>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-10">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                  {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
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
                  onClick={() => go(-1)}
                  aria-label="Slide anterior"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[var(--color-bg-main)] transition-colors hover:bg-white"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Próximo slide"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[var(--color-bg-main)] transition-colors hover:bg-white"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-center gap-1">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              aria-label={`Ver slide ${slide.label}`}
              aria-pressed={i === index}
              className="carousel-indicator"
            />
          ))}
        </div>
      </div>

      {isPhotoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ampliada: ${current.label}`}
          onClick={() => setIsPhotoOpen(false)}
        >
          <div className="relative max-h-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <img src={current.image} alt={current.label} width={current.width} height={current.height} className="max-h-[85vh] w-auto max-w-full object-contain" />
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
              aria-label="Próxima foto"
            >
              <ChevronRight size={22} />
            </button>
            <button
              type="button"
              onClick={() => setIsPhotoOpen(false)}
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
              aria-label="Fechar foto ampliada"
            >
              <X size={20} />
            </button>
            <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => {
                    setDirection(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  aria-label={`Ver foto ${slide.label}`}
                  aria-pressed={i === index}
                  data-tone="light"
                  className="carousel-indicator"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
