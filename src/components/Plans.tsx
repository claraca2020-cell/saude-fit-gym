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

const FAMILY_FEATURES = [
  'Adesão grátis, sem taxa de matrícula',
  'Não precisa ser família — só entrar em conjunto',
  'Plano recorrente: debita só a mensalidade, sem travar o limite do cartão',
  'Cancelamento sem multa, com 30 dias de antecedência',
]

const FAMILIA: PlanSlide[] = [
  { title: '1 pessoa', price: '139,90', unit: 'por mês', features: FAMILY_FEATURES },
  { title: '2 pessoas', price: '129,90', unit: 'por pessoa/mês', features: FAMILY_FEATURES },
  { title: '3 pessoas', price: '124,90', unit: 'por pessoa/mês', features: FAMILY_FEATURES },
  { title: '4 pessoas ou mais', price: '119,90', unit: 'por pessoa/mês', badge: 'Mais vantajoso', features: FAMILY_FEATURES },
]

const PESSOAL: PlanSlide[] = [
  {
    title: 'Active Quadrimestral',
    price: '139,90',
    unit: 'por mês',
    features: [
      'Adesão grátis, sem taxa de matrícula',
      'Fidelidade de 4 meses',
      '1ª parcela à vista + 3x no crédito',
      'Cancelamento com 30 dias, sem multa',
      '4 check-ins de bike indoor inclusos',
    ],
  },
  {
    title: 'Fit Anual',
    price: '139,90',
    unit: 'por mês',
    badge: 'Recomendado',
    features: [
      'Adesão grátis, sem anuidade nem taxa',
      'Duração de 1 ano',
      '1ª parcela à vista + 11x no crédito recorrente',
      'Cancelamento com 30 dias de antecedência',
      '4 check-ins de bike indoor inclusos',
    ],
  },
  {
    title: 'Mensal',
    price: '209,90',
    unit: 'por mês',
    features: [
      'Adesão grátis, sem taxa de matrícula',
      'Sem fidelidade — pagamento mensal',
      '4 check-ins de bike indoor inclusos',
      '12 check-ins de bike indoor por +R$ 30,00',
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
      className={`flex flex-col rounded-sm p-8 text-left ${
        highlight ? 'bg-[var(--color-accent)] text-[var(--color-bg-main)]' : 'border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-ink)]'
      }`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-[0.25em] ${
          highlight ? 'text-[var(--color-bg-main)]/70' : 'text-[var(--color-accent)]'
        }`}
      >
        {category}
      </p>

      <div className="relative mt-4 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.title}
            custom={direction}
            initial={{ opacity: 0, x: 30 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 * direction }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col text-left"
          >
            {current.badge && (
              <span
                className={`mb-3 w-fit rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.15em] ${
                  highlight
                    ? 'bg-[var(--color-bg-main)] text-[var(--color-accent)]'
                    : 'bg-[var(--color-accent)] text-[var(--color-bg-main)]'
                }`}
              >
                {current.badge}
              </span>
            )}

            <h3 className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              {current.title}
            </h3>
            <p className="mt-2 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
              R$ {current.price}
            </p>
            <p className={`mt-1 text-xs ${highlight ? 'text-[var(--color-bg-main)]/70' : 'text-[var(--color-text-muted)]'}`}>
              {current.unit}
            </p>

            <ul className="mt-5 min-h-[120px] space-y-2.5 text-left">
              {current.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check
                    size={15}
                    className={`mt-0.5 shrink-0 ${highlight ? 'text-[var(--color-bg-main)]' : 'text-[var(--color-accent)]'}`}
                  />
                  <span className={highlight ? 'text-[var(--color-bg-main)]/90' : 'opacity-90'}>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('whatsapp_click', { category, plan: current.title })}
              className={`mt-6 w-full rounded-sm px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.15em] ${
                highlight ? 'bg-[var(--color-bg-main)] text-[var(--color-accent)]' : 'btn-primary'
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
              highlight ? 'text-[var(--color-bg-main)] hover:opacity-70' : 'text-[var(--color-ink)] hover:text-[var(--color-accent)]'
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
                    ? `w-6 ${highlight ? 'bg-[var(--color-bg-main)]' : 'bg-[var(--color-accent)]'}`
                    : `w-1.5 ${highlight ? 'bg-[var(--color-bg-main)]/30' : 'bg-[var(--color-ink)]/20'}`
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label={`${category}: próximo item`}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              highlight ? 'text-[var(--color-bg-main)] hover:opacity-70' : 'text-[var(--color-ink)] hover:text-[var(--color-accent)]'
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
    <section id="planos" className="border-t border-[var(--color-border)] pt-10 pb-14 md:pt-12 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <h2
          className="text-left text-3xl uppercase text-[var(--color-ink)] md:text-5xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}
        >
          Conheça nossos planos e comece hoje!
        </h2>
        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Por aqui, temos:</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <PlanColumn category="Família" slides={FAMILIA} />
          <PlanColumn category="Pessoal" slides={PESSOAL} startIndex={1} highlight />
          <PlanColumn category="Bike Indoor" slides={BIKE_INDOOR} />
        </div>
      </div>
    </section>
  )
}
