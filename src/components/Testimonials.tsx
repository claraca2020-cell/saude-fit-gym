import { Star } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Raphael Brasileiro De Oliveira',
    time: '4 meses atrás',
    text: 'Gostaria de deixar registrado não só as 5 estrelas, mas o espaço aliado à equipe de trabalho extraordinária que compõe o corpo da academia Saúde Fit. Confesso que nunca gostei de "puxar ferro", mas na Saúde Fit minha opinião sobre academia mudou.',
  },
  {
    name: 'Aluna Saúde Fit',
    time: 'Google Avaliações',
    text: 'Melhor academia do Riacho Fundo 1!!! Academia simplesmente incrível! Ambiente super organizado, equipamentos novos e sempre bem cuidados. Os professores são atenciosos, ajudam de verdade e motivam a gente a evoluir cada dia mais. As meninas da recepção são super atenciosas também!',
  },
  {
    name: 'Amanda',
    time: 'Google Avaliações',
    text: 'Ambiente limpo e agradável, professores atenciosos, a melhor do Riacho Fundo 1. Evoluindo em equipamentos e profissionais qualificados cada vez mais.',
  },
]

export function Testimonials() {
  return (
    <section className="border-t border-[var(--color-border)] pt-10 pb-14 md:pt-12 md:pb-20">
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

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 md:grid-cols-3">
          {REVIEWS.map((review, i) => {
            const mobileOrder = i === 2 ? 'order-1' : i === 0 ? 'order-2' : 'order-3'
            const mobileSpan = i === 1 ? 'col-span-2' : ''
            return (
            <div
              key={review.name}
              className={`flex flex-col rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 sm:p-8 ${mobileOrder} ${mobileSpan} md:order-none md:col-span-1`}
            >
              <div className="flex gap-0.5 text-[var(--color-accent)]">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 flex-1 text-xs leading-relaxed text-[var(--color-ink)]/85 sm:mt-5 sm:text-sm">
                "{review.text}"
              </p>
              <div className="mt-3 border-t border-[var(--color-border)] pt-3 sm:mt-6 sm:pt-4">
                <p className="text-xs font-semibold text-[var(--color-ink)] sm:text-sm">{review.name}</p>
                <p className="text-[0.65rem] text-[var(--color-text-muted)] sm:text-xs">{review.time}</p>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
