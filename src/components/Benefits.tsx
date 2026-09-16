import { CheckCircle2, ShieldCheck } from 'lucide-react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const BENEFITS = [
  'Banheiros com toda assistência, com secadores',
  'Academia toda climatizada',
  'Aulas coletivas inclusas',
  'Aulas de bike indoor',
  'Armários',
  'Free pass para 1 convidado no fim de semana',
  'Wi-fi grátis em todo o espaço',
  'Abertas aos sábados e domingos',
  'Treinos personalizados',
  'Conveniência com produtos fit',
]

export function Benefits() {
  const ref = useRevealOnScroll<HTMLDivElement>()

  return (
    <section className="border-t border-[var(--color-border)] py-14 md:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-12">
        <div>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Treine conosco
          </p>
          <h2
            className="mt-4 text-4xl leading-tight text-[var(--color-ink)] md:text-5xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Estrutura completa para te atender.
          </h2>

          <div className="mt-8 flex items-start gap-3 rounded-sm bg-[var(--color-bg-card)] p-5 shadow-[0_1px_0_var(--color-border)]">
            <ShieldCheck className="mt-0.5 shrink-0 text-[var(--color-accent)]" size={22} />
            <p className="text-sm text-[var(--color-text-muted)]">
              Não gostou da experiência nos primeiros 30 dias? Devolvemos o seu dinheiro.
            </p>
          </div>
        </div>

        <div ref={ref} className="reveal-group grid gap-4 sm:grid-cols-2">
          {BENEFITS.map((item) => (
            <div
              key={item}
              className="flex min-h-[88px] items-center gap-3 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5"
            >
              <CheckCircle2 className="shrink-0 text-[var(--color-accent)]" size={18} />
              <p className="text-sm text-[var(--color-ink)]/85">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
