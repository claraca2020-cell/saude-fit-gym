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
  highlight = false,
}: {
  category: string
  slides: PlanSlide[]
  startIndex?: number
  highlight?: boolean
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
      className="flex flex-col rounded-sm p-8 text-left border-2 border-[var(--color-accent)] bg-[var(--color-bg-card)] text-[var(--color-ink)] xl:h-full"
    >
      <p
        className={`text-xs font-bold uppercase tracking-[0.25em] ${
          'text-[var(--color-text-muted)]'
        }`}
      >
        {category}
      </p>

      <div className="relative mt-4 overflow-hidden xl:flex-1 xl:flex xl:flex-col">
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

            <h3 className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              {current.title}
            </h3>
            <p className="mt-2 whitespace-nowrap text-3xl text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
              R$ {current.price}
            </p>
            <p className={`mt-1 text-xs text-[var(--color-text-muted)]`}>
              {current.unit}
            </p>

            <ul className="mt-5 min-h-[120px] space-y-2.5 text-left">
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
              href={`${WHATSAPP_URL}?text=Olá! Gostaria de contratar o plano: ${current.title} - R$ ${current.price} ${current.unit}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('whatsapp_click', { category, plan: current.title })}
              className={`mt-6 xl:mt-0 w-full rounded-sm px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.15em] ${
                highlight ? 'bg-[var(--color-accent)] text-[var(--color-bg-main)]' : 'btn-primary'
              }`}
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
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              'text-[var(--color-ink)] hover:text-[var(--color-accent)]'
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => {
                  setDirection(i > index ? 1 : -1)
                  setIndex(i)
                }}
                aria-label={`Ver ${slide.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-6 bg-[var(--color-ink)]'
                    : 'w-1.5 bg-[var(--color-ink)]/20'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label={`${category}: próximo item`}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
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

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-fr">
          <PlanColumn category="Individual" slides={INDIVIDUAL} highlight />
          <PlanColumn category="Família Recorrente" slides={FAMILIA_RECORRENTE} />
          <PlanColumn category="Família À vista" slides={FAMILIA_AVISTA} />
          <PlanColumn category="Bike Indoor" slides={BIKE_INDOOR} />
        </div>
      </div>
    </section>
  )
}
