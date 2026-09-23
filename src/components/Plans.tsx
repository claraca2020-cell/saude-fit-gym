import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { trackEvent } from '../lib/analytics'

const WHATSAPP_URL = 'https://wa.me/5561984010700'

type PlanSlide = {
  title: string
  price: string
  unit: string
  badge?: string
  features: readonly string[]
}

const BIKE_CHECKINS = ['4 check-ins Bike Indoor', '12 check-ins Bike Indoor por + R$ 30']

const FAMILIA_RECORRENTE_FEATURES = [
  'Adesão grátis, sem taxa de matrícula',
  '12 meses',
  '1ª parcela à vista + 11x no crédito recorrente',
  'Cancelamento com 30 dias, sem multa',
  ...BIKE_CHECKINS,
]

const FAMILIA_AVISTA_FEATURES = [
  'Adesão grátis, sem taxa de matrícula',
  '12 meses',
  '1ª parcela à vista + 11x no crédito à vista parcelado',
  'Cancelamento com 30 dias, sem multa',
  ...BIKE_CHECKINS,
]

const FAMILIA_RECORRENTE: PlanSlide[] = [
  { title: '2 pessoas', price: '134,90', unit: 'por pessoa/mês', features: FAMILIA_RECORRENTE_FEATURES },
  { title: '3 pessoas', price: '129,90', unit: 'por pessoa/mês', features: FAMILIA_RECORRENTE_FEATURES },
  { title: '4 pessoas ou mais', price: '124,90', unit: 'por pessoa/mês', features: FAMILIA_RECORRENTE_FEATURES },
]

const FAMILIA_AVISTA: PlanSlide[] = [
  { title: '2 pessoas', price: '119,90', unit: 'por pessoa/mês', badge: 'Economize R$ 360', features: FAMILIA_AVISTA_FEATURES },
  { title: '3 pessoas', price: '114,90', unit: 'por pessoa/mês', badge: 'Economize R$ 540', features: FAMILIA_AVISTA_FEATURES },
  { title: '4 pessoas ou mais', price: '109,90', unit: 'por pessoa/mês', badge: 'Economize R$ 720', features: FAMILIA_AVISTA_FEATURES },
]

const INDIVIDUAL: PlanSlide[] = [
  {
    title: 'Fit Anual Recorrente',
    price: '139,90',
    unit: 'por mês',
    badge: 'Recomendado',
    features: FAMILIA_RECORRENTE_FEATURES,
  },
  {
    title: 'Fit Anual Crédito à vista',
    price: '124,90',
    unit: 'por mês',
    badge: 'Economize R$ 180',
    features: FAMILIA_AVISTA_FEATURES,
  },
  {
    title: 'Quadrimestral',
    price: '139,90',
    unit: 'por mês',
    features: [
      'Adesão grátis, sem taxa de matrícula',
      '4 meses',
      '1ª parcela à vista + 3x no crédito à vista',
      'Cancelamento com 30 dias, sem multa',
      ...BIKE_CHECKINS,
    ],
  },
  {
    title: 'Mensal',
    price: '209,90',
    unit: 'por mês',
    features: [
      'Adesão grátis, sem taxa de matrícula',
      'Sem fidelidade',
      'Pagamento mensal',
      ...BIKE_CHECKINS,
    ],
  },
]

const BIKE_INDOOR: PlanSlide[] = [
  {
    title: '1 aula avulsa',
    price: '34,90',
    unit: 'Validade de 30 dias',
    features: ['R$ 39,90 por aula', 'Aceitamos Gympass e TotalPass'],
  },
  { title: '2 aulas experimentais', price: '44,90', unit: 'Validade de 30 dias', features: ['R$ 22,45 por aula'] },
  { title: '4 aulas', price: '99,90', unit: 'Validade de 30 dias', features: ['R$ 24,97 por aula'] },
  { title: '8 aulas', price: '149,90', unit: 'Validade de 30 dias', badge: 'Mais popular', features: ['R$ 18,74 por aula'] },
  { title: '12 aulas', price: '199,90', unit: 'Validade de 30 dias', features: ['R$ 16,65 por aula'] },
  {
    title: '16 aulas',
    price: '249,90',
    unit: 'Validade de 30 dias',
    badge: 'Melhor custo-benefício',
    features: ['R$ 15,61 por aula'],
  },
]

function PlanColumn({
  category,
  slides,
  startIndex = 0,
}: {
  category: string
  slides: PlanSlide[]
  startIndex?: number
}) {
  const [index, setIndex] = useState(startIndex)
  const [direction, setDirection] = useState(1)
  const current = slides[index]

  const go = (dir: number) => {
    setDirection(dir)
    setIndex((i) => (i + dir + slides.length) % slides.length)
  }

  return (
    <div
      className="plans-card flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 text-left text-[var(--color-ink)] shadow-[0_18px_50px_rgba(0,0,0,.22)] md:rounded-sm md:border-2 md:border-[var(--color-accent)] md:p-8 md:shadow-none xl:h-full"
    >
      <p
        className={`text-[0.65rem] font-bold uppercase tracking-[0.2em] md:text-xs md:tracking-[0.25em] ${
          'text-[var(--color-text-muted)]'
        }`}
      >
        {category}
      </p>

      <div className="relative mt-3 overflow-hidden md:mt-4 xl:flex-1 xl:flex xl:flex-col">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.title}
            custom={direction}
            initial={{ opacity: 0, x: 30 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 * direction }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col text-left xl:h-full xl:justify-between"
          >
            <div className="h-7 mb-3">
              {current.badge && (
                <span
                  className={`w-fit rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.15em] ${
                    'bg-[var(--color-accent)] text-[var(--color-bg-main)]'
                  }`}
                >
                  {current.badge}
                </span>
              )}
            </div>

            <h3 className="text-center text-xl md:text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              {current.title}
            </h3>
            <p className="mt-1 whitespace-nowrap text-center text-4xl text-[var(--color-accent)] md:mt-2 md:text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
              R$ {current.price}
            </p>
            <p className={`mt-1 text-center text-xs text-[var(--color-text-muted)]`}>
              {current.unit}
            </p>

            <ul className="mt-5 min-h-[120px] space-y-3 border-t border-[var(--color-border)] pt-4 text-left md:space-y-2.5 md:border-0 md:pt-0">
              {current.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check
                    size={15}
                    className={`mt-0.5 shrink-0 text-[var(--color-ink)]`}
                  />
                  <span className={'opacity-90'}>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Olá! Gostaria de contratar o plano ${current.title} — R$ ${current.price} ${current.unit}.`)}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('whatsapp_click', { category, plan: current.title })}
              className="mt-6 w-full cursor-pointer rounded-full px-6 py-3.5 text-center text-[0.68rem] font-bold uppercase tracking-[0.14em] plan-btn md:rounded-sm md:py-3 md:text-xs md:tracking-[0.15em] xl:mt-0"
            >
              Escolher {current.title}
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-current/10 pt-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={`${category}: item anterior`}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
              'text-[var(--color-ink)] hover:text-[var(--color-accent)]'
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          <div className="plan-slide-indicators flex gap-0">
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => {
                  setDirection(i > index ? 1 : -1)
                  setIndex(i)
                }}
                aria-label={`Ver ${slide.title}`}
                aria-pressed={i === index}
                className="carousel-indicator"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label={`${category}: próximo item`}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
              'text-[var(--color-ink)] hover:text-[var(--color-accent)]'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export function Plans() {
  const [categoryIndex, setCategoryIndex] = useState(0)
  const planCategories = [
    { category: 'Individual', slides: INDIVIDUAL },
    { category: 'Família Recorrente', slides: FAMILIA_RECORRENTE },
    { category: 'Família À vista', slides: FAMILIA_AVISTA },
    { category: 'Bike Indoor', slides: BIKE_INDOOR },
  ]
  const changeCategory = (direction: number) => {
    setCategoryIndex((current) => (current + direction + planCategories.length) % planCategories.length)
  }
  const currentCategory = planCategories[categoryIndex]

  return (
    <section id="planos" className="border-t border-[var(--color-border)] py-6 md:pt-12 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <h2
          className="text-left text-3xl uppercase text-[var(--color-ink)] md:text-5xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}
        >
          Conheça nossos planos e comece hoje!
        </h2>
        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">Por aqui, temos:</p>

        <div className="relative mt-8 px-7 md:hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div key={currentCategory.category} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
              <PlanColumn category={currentCategory.category} slides={currentCategory.slides} />
            </motion.div>
          </AnimatePresence>
          <button type="button" onClick={() => changeCategory(-1)} aria-label="Plano anterior" className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-ink)] shadow-lg transition-transform hover:scale-105"><ChevronLeft size={17} /></button>
          <button type="button" onClick={() => changeCategory(1)} aria-label="Próximo plano" className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-ink)] shadow-lg transition-transform hover:scale-105"><ChevronRight size={17} /></button>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="plan-category-indicators flex gap-0">
              {planCategories.map((plan, index) => (
                <button key={plan.category} type="button" onClick={() => setCategoryIndex(index)} aria-label={`Ver ${plan.category}`} aria-pressed={index === categoryIndex} data-tone="accent" className="carousel-indicator" />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-fr">
          {planCategories.map((plan) => (
            <PlanColumn key={plan.category} category={plan.category} slides={plan.slides} />
          ))}
        </div>
      </div>
    </section>
  )
}
