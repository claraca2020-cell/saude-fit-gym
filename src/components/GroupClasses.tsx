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
    <section id="aulas-coletivas" className="border-t border-[var(--color-border)] bg-[var(--color-bg-card)] py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-16 max-w-xl">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Aulas coletivas
          </p>
          <h2
            className="mt-4 text-4xl leading-tight text-[var(--color-ink)] md:text-5xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Todas as aulas em um só lugar.
          </h2>
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            Todas as aulas coletivas já estão inclusas no seu plano.
          </p>
        </div>

        <div ref={ref} className="reveal-group grid gap-px overflow-hidden rounded-sm bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
          {CLASSES.map(({ icon: Icon, name, description, slideLabel }) => (
            <button
              key={name}
              type="button"
              onClick={() => jumpToSlide(slideLabel)}
              className={`group bg-[var(--color-bg-card)] p-8 text-left transition-colors duration-300 hover:bg-[var(--color-bg-main)] ${
                slideLabel ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <Icon className="text-[var(--color-accent)]" size={28} strokeWidth={1.5} />
              <h3
                className="mt-6 text-xl text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
              >
                {name}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{description}</p>
            </button>
          ))}
        </div>

        <GroupClassesCarousel index={index} direction={direction} onGo={go} onSelect={select} />

        <div className="mt-16">
          <h3
            className="text-2xl text-[var(--color-ink)]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Grade de horários
          </h3>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {Object.entries(SCHEDULE).map(([turno, days]) => (
              <div key={turno} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">
                  Turno {turno}
                </p>
                <ul className="mt-4 divide-y divide-[var(--color-border)]">
                  {days.map((day) => (
                    <li key={day.day} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm font-medium text-[var(--color-ink)]">{day.day}</span>
                      <span className="text-sm text-[var(--color-text-muted)]">{day.classes}</span>
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
