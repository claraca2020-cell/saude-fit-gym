import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const REVIEWS = [
  {
    name: 'Ester Viana',
    time: '3 semanas atrás',
    text: 'Estou muito satisfeita com a academia! Desde o atendimento na recepção, que é sempre muito atencioso e acolhedor, até a qualidade dos treinos personalizados. Quero destacar também minha professora (Gil), que é muito dedicada, atenciosa e sempre disposta a ajudar.',
  },
  {
    name: 'Letícia Xavier',
    time: 'um ano atrás',
    text: 'A Academia tem superado as minhas expectativas. Equipamentos são novos e modernos. O ambiente é limpo e organizado. Os professores Bruno e Leo sempre a disposição para ajudar, e ensinam o passo a passo da execução dos exercícios.',
  },
  {
    name: 'Izabela Goncalves',
    time: '11 meses atrás',
    text: 'A academia tem um ambiente agradável, percebe-se o cuidado e atenção com os detalhes. O banheiro está sempre impecável e cheiroso, os espaços são amplos e os aparelhos novos e bem cuidados, tem luz natural e colaboradores prestativos.',
  },
  {
    name: 'Raphael Brasileiro De Oliveira',
    time: '5 meses atrás',
    text: 'Gostaria de deixar registrado não só as 5 estrelas, mas o espaço aliado à equipe de trabalho extraordinária que compõe o corpo da academia Saúde Fit. Confesso que nunca gostei de "puxar ferro" mas na Saúde Fit minha opinião sobre academia mudou.',
  },
  {
    name: 'Ilainy Alves',
    time: '4 meses atrás',
    text: 'Melhor academia do riacho fundo 1! Academia simplesmente incrível! Ambiente super organizado, equipamentos novos e sempre bem cuidados. Os professores são atenciosos, ajudam de verdade e motivam a gente a evoluir cada dia mais.',
  },
  {
    name: 'Michele Monique Ribeiro De Oliveira',
    time: '5 meses atrás',
    text: 'Gostaria de deixar aqui meu elogio à academia e a toda a equipe, que sempre demonstra muito profissionalismo e cuidado com os alunos. Em especial, quero destacar a atendente Paloma, que é extremamente prestativa e atenciosa.',
  },
  {
    name: 'Matheus Canedo',
    time: '5 meses atrás',
    text: 'Academia com ótima estrutura! Grande número de equipamentos, assim é raro precisar revezar, e os equipamentos são bem cuidados e de fácil utilização. Os professores são bem atenciosos e gentis, em especial a professora Monik.',
  },
  {
    name: 'Amanda',
    time: '8 meses atrás',
    text: 'Ambiente limpo e agradável, professores atenciosos, a melhor do Riacho Fundo 1. Evoluindo em equipamentos e profissionais qualificados cada vez mais.',
  },
  {
    name: 'Gaby Ferreira',
    time: '4 meses atrás',
    text: 'Frequento a academia Saúde Fit e estou simplesmente encantada! O espaço é muito amplo, conta com dois andares super bem organizados, e os equipamentos são excelentes, todos modernos e bem cuidados.',
  },
  {
    name: 'Google Avaliações',
    time: '4,6 de 5 estrelas',
    text: 'Mais de 380 avaliações verificadas de clientes satisfeitos. A Saúde Fit Gym é a academia melhor avaliada do Riacho Fundo I.',
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (dir: number) => {
    setDirection(dir)
    setIndex((i) => (i + dir + REVIEWS.length) % REVIEWS.length)
  }

  const current = REVIEWS[index]

  return (
    <section className="border-t border-[var(--color-border)] py-6 md:pt-12 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-[var(--color-text-muted)]">
              Avaliações
            </p>
            <h2
              className="mt-4 max-w-lg text-4xl leading-tight text-[var(--color-ink)] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              A academia mais bem avaliada do Riacho Fundo I.
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-card)] px-6 py-4">
            <p className="text-3xl text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
              4,6
            </p>
            <div>
              <div className="flex gap-0.5 text-[var(--color-accent)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">Google Avaliações</p>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12">
          <div className="flex flex-col rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 sm:p-8">
            <div className="flex gap-0.5 text-[var(--color-accent)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>

            <div className="relative mt-6 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={current.name}
                  custom={direction}
                  initial={{ opacity: 0, x: 30 * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 * direction }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex flex-col"
                >
                  <p className="flex-1 text-sm leading-relaxed text-[var(--color-ink)]/85 sm:text-base">
                    "{current.text}"
                  </p>
                  <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                    <p className="text-sm font-semibold text-[var(--color-ink)] sm:text-base">{current.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)] sm:text-sm">{current.time}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Avaliação anterior"
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:text-[var(--color-accent)] active:text-[var(--color-accent)]"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex gap-1.5">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDirection(i > index ? 1 : -1)
                      setIndex(i)
                    }}
                    aria-label={`Ver avaliação ${i + 1}`}
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
                aria-label="Próxima avaliação"
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:text-[var(--color-accent)] active:text-[var(--color-accent)]"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="mt-4 text-center text-xs text-[var(--color-text-muted)]">
              {String(index + 1).padStart(2, '0')} / {String(REVIEWS.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
