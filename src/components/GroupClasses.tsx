import { useState } from 'react'
import { Bike, Dumbbell, Flame, PartyPopper, Zap, Sun, Moon } from 'lucide-react'
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
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[var(--color-accent)]" />
            <p className="text-base font-medium uppercase tracking-[0.35em] text-[var(--color-accent)] md:text-[0.7rem]">
              Planeje seu treino
            </p>
          </div>
          <h3
            className="mt-4 text-3xl md:text-4xl text-white font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Grade de <span className="text-[var(--color-accent)]">horários</span>
          </h3>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
            {Object.entries(SCHEDULE).map(([turno, days]) => {
              const Icon = turno === 'Matutino' ? Sun : Moon
              const tagline = turno === 'Matutino' ? 'MAIS ENERGIA\nPARA O SEU DIA' : 'MOVIMENTO\nSEM LIMITES'

              return (
                <div
                  key={turno}
                  className="rounded-3xl border border-[var(--color-accent)] border-opacity-20 bg-black/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-opacity-30 hover:bg-black/10"
                  style={{
                    boxShadow: '0 4px 20px rgba(255, 187, 51, 0.05)',
                  }}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)] bg-opacity-10 border border-[var(--color-accent)] border-opacity-20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-[var(--color-accent)]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-[0.15em] text-white">
                          Turno {turno}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs leading-tight text-[var(--color-text-muted)] font-medium whitespace-pre-line">
                        {tagline}
                      </p>
                      <div className="w-12 h-0.5 bg-[var(--color-accent)] mt-3 ml-auto" />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white border-opacity-5 mb-6" />

                  {/* Schedule Grid */}
                  <div className="space-y-4">
                    {days.map((day, dayIndex) => (
                      <div key={day.day}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-center">
                          {/* Day Name */}
                          <div className="col-span-1">
                            <p className="text-sm sm:text-base font-semibold text-white tracking-wide">
                              {day.day}
                            </p>
                          </div>

                          {/* Classes */}
                          <div className="col-span-1 sm:col-span-2">
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 items-start sm:items-center">
                              {parseClasses(day.classes).map((c, classIndex) => (
                                <div key={classIndex} className="flex items-center gap-3 w-full sm:w-auto">
                                  {/* Time Badge */}
                                  <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-transparent border border-[var(--color-accent)] border-opacity-30 min-w-[76px] h-10">
                                    <span className="text-sm font-bold text-[var(--color-accent)]">
                                      {c.time}
                                    </span>
                                  </div>
                                  {/* Class Name */}
                                  <span className="text-sm text-white font-medium flex-1">
                                    {c.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Divider between days */}
                        {dayIndex < days.length - 1 && (
                          <div className="border-b border-white border-opacity-7 mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
