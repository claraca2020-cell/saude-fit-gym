import { useState } from 'react'
import { Bike, Dumbbell, Flame, PartyPopper, Zap } from 'lucide-react'
import { PilatesMatIcon } from './PilatesMatIcon'
import { GROUP_CLASS_SLIDES, GroupClassesCarousel } from './GroupClassesCarousel'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const SCHEDULE = {
  Matutino: [
    { day: 'Segunda-feira', classes: '07:30 Fit Dance' },
    { day: 'Terça-feira', classes: '07:30 Pilates · 08:20 Cross Training' },
    { day: 'Quarta-feira', classes: '07:30 Fit Dance' },
    { day: 'Quinta-feira', classes: '07:30 Pilates · 08:20 Cross Training' },
    { day: 'Sexta-feira', classes: '07:30 Fit Dance' },
  ],
  Noturno: [
    { day: 'Segunda-feira', classes: '19:30 Pilates · 20:20 Fit Dance' },
    { day: 'Terça-feira', classes: '19:30 Cross Training · 20:20 Flux Training' },
    { day: 'Quarta-feira', classes: '19:30 Pilates · 20:20 Fit Dance' },
    { day: 'Quinta-feira', classes: '19:30 Cross Training · 20:20 Flux Training' },
    { day: 'Sexta-feira', classes: '19:30 Forró e Sertanejo · 20:40 Fit Dance' },
  ],
} as const

function parseClasses(classes: string) {
  return classes.split(' · ').map((segment) => {
    const match = segment.match(/^(\d{1,2}:\d{2})\s+(.+)$/)
    return match ? { time: match[1], name: match[2] } : { time: '', name: segment }
  })
}

const CLASSES = [
  { icon: Dumbbell, name: 'Musculação', description: 'Equipamentos completos para hipertrofia e força.' },
  { icon: Zap, name: 'Cross Training', description: 'Treinos funcionais de alta intensidade em grupo.', slideLabel: 'Cross & Flux Training' },
  { icon: PartyPopper, name: 'Forró', description: 'Aula coletiva que une ritmo, tradição e diversão.', slideLabel: 'Forró' },
  { icon: Bike, name: 'Bike Indoor', description: 'Aulas de ciclismo indoor com música e energia.', slideLabel: 'Bike Indoor' },
  { icon: PilatesMatIcon, name: 'Pilates', description: 'Fortalecimento, postura e consciência corporal.', slideLabel: 'Pilates' },
  { icon: Flame, name: 'Flux Training', description: 'Treino funcional fluido, do aquecimento ao ápice.', slideLabel: 'Cross & Flux Training' },
]

export function GroupClasses() {
  const ref = useRevealOnScroll<HTMLDivElement>()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (dir: number) => {
    setDirection(dir)
    setIndex((i) => (i + dir + GROUP_CLASS_SLIDES.length) % GROUP_CLASS_SLIDES.length)
  }

  const select = (i: number) => {
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }

  const jumpToSlide = (slideLabel?: string) => {
    if (!slideLabel) return
    const targetIndex = GROUP_CLASS_SLIDES.findIndex((slide) => slide.label === slideLabel)
    if (targetIndex === -1) return
    select(targetIndex)
    document.getElementById('aulas-coletivas-carousel')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section id="aulas-coletivas" className="border-t border-[var(--color-border)] bg-[var(--color-bg-card)] py-6 md:pt-12 md:pb-10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-8 max-w-xl">
          <p className="text-base font-medium uppercase tracking-[0.35em] text-[var(--color-accent)] md:text-[0.7rem]">
            Aulas coletivas
          </p>
          <h2
            className="mt-4 text-5xl leading-tight text-[var(--color-ink)] md:text-5xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Todas as aulas em um só lugar.
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-muted)] md:text-sm">
            Todas as aulas coletivas já estão inclusas no seu plano.
          </p>
        </div>

        <div ref={ref} className="reveal-group mx-auto max-w-4xl grid grid-cols-2 gap-2 overflow-hidden rounded-sm sm:gap-3 lg:gap-4 lg:grid-cols-3">
          {CLASSES.map(({ icon: Icon, name, description, slideLabel }) => (
            <button
              key={name}
              type="button"
              onClick={() => jumpToSlide(slideLabel)}
              className={`group h-full flex flex-col bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-sm p-4 text-left transition-colors duration-300 hover:bg-[var(--color-bg-main)] sm:p-6 ${
                slideLabel ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <Icon className="h-6 w-6 text-[var(--color-accent)] sm:h-7 sm:w-7" strokeWidth={1.5} />
              <h3
                className="mt-3 text-lg text-[var(--color-accent)] sm:mt-6 sm:text-xl"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
              >
                {name}
              </h3>
              <p className="mt-1 flex-1 text-sm text-[var(--color-text-muted)] sm:mt-2 sm:text-sm">{description}</p>
            </button>
          ))}
        </div>

        <GroupClassesCarousel index={index} direction={direction} onGo={go} onSelect={select} />

        <div className="mt-8 md:mt-16">
          <h3
            className="text-2xl text-white"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Grade de horários
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6">
            {Object.entries(SCHEDULE).map(([turno, days]) => (
              <div
                key={turno}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3 sm:p-6 md:p-7"
              >
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--color-text-muted)] sm:text-xs">
                  Turno {turno}
                </p>
                <ul className="mt-3 divide-y divide-[var(--color-border)] sm:mt-5">
                  {days.map((day) => (
                    <li
                      key={day.day}
                      className="-mx-1.5 flex flex-col gap-1 rounded-sm px-1.5 py-2 transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--color-ink)_8%,transparent)] sm:-mx-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:px-2 sm:py-3.5"
                    >
                      <span
                        className="text-xs font-semibold text-[var(--color-ink)] sm:w-36 sm:shrink-0 sm:text-sm"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {day.day}
                      </span>
                      <span className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-xs sm:justify-end sm:gap-x-3 sm:gap-y-1 sm:text-sm">
                        {parseClasses(day.classes).map((c, i) => (
                          <span key={i} className="whitespace-nowrap">
                            <span className="font-bold text-[var(--color-ink)]">{c.time}</span>{' '}
                            <span className="text-[var(--color-text-muted)]">{c.name}</span>
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
