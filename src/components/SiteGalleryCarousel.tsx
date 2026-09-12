import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import areaMusculacao from '../assets/photos/area-musculacao.jpg'
import cardioEliptico from '../assets/photos/cardio-eliptico.jpg'
import cardioEsteiras from '../assets/photos/cardio-esteiras.jpg'
import musculacao from '../assets/photos/musculacao.jpg'
import recepcao from '../assets/photos/recepcao.jpg'
import salaFuncional from '../assets/photos/sala-funcional.jpg'

const SLIDES = [
  { image: recepcao, label: 'Recepção', description: 'Ambiente monitorado 24h, pronto para te receber.' },
  { image: areaMusculacao, label: 'Área de Musculação', description: 'Estações completas de peso livre, guiadas por número.' },
  { image: salaFuncional, label: 'Sala Funcional', description: 'Espaço amplo para treinos funcionais e alongamento.' },
  { image: cardioEsteiras, label: 'Esteiras', description: 'Esteiras com vista para a rua.' },
  { image: cardioEliptico, label: 'Cardio', description: 'Elípticos e bikes para o seu cardio.' },
  { image: musculacao, label: 'Musculação', description: 'Equipamentos guiados, do aquecimento à força máxima.' },
]

export function SiteGalleryCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (dir: number) => {
    setDirection(dir)
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length)
  }

  const current = SLIDES[index]

  return (
    <section className="border-t border-[var(--color-border)] py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[var(--color-accent)]">
          Conheça o espaço
        </p>
        <h2
          className="mt-4 max-w-lg text-4xl leading-tight text-[var(--color-ink)] md:text-5xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
        >
          Uma volta pela Saúde Fit Gym.
        </h2>

        <div className="relative mt-12 overflow-hidden rounded-sm">
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
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-accent-soft)]">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[var(--color-bg-main)] transition-colors hover:bg-white"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
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
          {SLIDES.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              aria-label={`Ver slide ${slide.label}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-[var(--color-ink)]' : 'w-1.5 bg-[var(--color-ink)]/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
