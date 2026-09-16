import { ShieldCheck } from 'lucide-react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const BENEFITS = [
  'Banheiros com toda assistência, com secadores e ar-condicionado',
  'Academia toda climatizada',
  'Aulas coletivas inclusas',
  'Aulas de bike indoor',
  'Armários',
  'Free pass para 1 convidado no fim de semana',
  'Treinos sempre sendo renovados',
  'Abertas aos sábados e domingos',
  'Treinos personalizados',
  'Conveniência com produtos fit',
]

export function Benefits() {
  const ref = useRevealOnScroll<HTMLDivElement>()

  const midpoint = Math.ceil(BENEFITS.length / 2)
  const columns = [BENEFITS.slice(0, midpoint), BENEFITS.slice(midpoint)]

  return (
    <section className="border-t border-[var(--color-border)] pt-10 pb-8 md:pt-12 md:pb-10">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-12">
        <div>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Treine com a gente
          </p>
          <h2
            className="mt-4 text-4xl leading-tight text-[var(--color-ink)] md:text-5xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Estrutura completa para te atender.
          </h2>
          <p className="mt-4 max-w-md text-sm text-[var(--color-text-muted)]">
            Tudo pensado para deixar seu treino mais confortável, completo e consistente.
          </p>

          <div className="mt-8 flex items-start gap-3 rounded-sm bg-[var(--color-bg-card)] p-5 shadow-[0_1px_0_var(--color-border)]">
            <ShieldCheck className="mt-0.5 shrink-0 text-[var(--color-accent)]" size={22} />
            <p className="text-sm text-[var(--color-text-muted)]">
              Não gostou da experiência nos primeiros 30 dias? Devolvemos o seu dinheiro.
            </p>
          </div>
        </div>

        <div>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-[var(--color-text-muted)]">
            O que você encontra aqui
          </p>

          <div ref={ref} className="reveal-group mt-6 grid grid-cols-2 gap-2 sm:gap-3">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-2 sm:gap-3">
                {column.map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[76px] items-center justify-center border border-[var(--color-border)] border-l-2 border-l-[var(--color-accent)] bg-[var(--color-bg-card)] px-2.5 py-3 text-center sm:min-h-0 sm:justify-start sm:px-4 sm:py-3.5 sm:text-left"
                  >
                    <p className="text-xs leading-snug text-[var(--color-ink)]/85 sm:text-sm">{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
