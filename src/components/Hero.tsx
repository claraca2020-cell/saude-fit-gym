import { ArrowRight, Star } from 'lucide-react'
import heroImage from '../assets/photos/optimized/capa-titulo.webp'

const STATS = [
  { value: 'Aberta', label: 'Nos feriados', highlight: true },
  { value: '6', label: 'Aulas coletivas/mês', highlight: true },
  { value: '7 dias', label: 'Aberto sáb. e dom.', highlight: true },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative flex min-h-[620px] flex-col justify-center md:min-h-[700px]">
        <img
          src={heroImage}
          alt="Fachada da Saúde Fit Gym"
          width={1672}
          height={941}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          style={{ objectPosition: 'center 0%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.4) 50%, var(--color-bg-main) 97%)',
          }}
        />

        <div className="hero-copy relative mx-auto w-full max-w-[1400px] px-6 pt-[16.5rem] pb-4 text-center md:px-12 md:pt-[21rem] md:pb-6">
          <div
            style={{ '--fade-delay': '0s' } as React.CSSProperties}
            className="animate-fade-up mb-5 flex items-center justify-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/90"
          >
            <span>Riacho Fundo I</span>
            <span className="text-white/40">·</span>
            <span className="flex items-center gap-1 text-[var(--color-accent)]">
              4,6
              <Star size={12} fill="currentColor" strokeWidth={0} />
              Google Avaliações
            </span>
          </div>

          <h1
            className="animate-fade-up mx-auto max-w-4xl text-4xl uppercase leading-[1.02] text-white sm:text-5xl md:text-7xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, '--fade-delay': '0.08s' } as React.CSSProperties}
          >
            Em prol de uma vida
            <br />
            mais <span className="text-[var(--color-accent)]">saudável.</span>
          </h1>

          <div
            style={{ '--fade-delay': '0.18s' } as React.CSSProperties}
            className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#planos"
              className="btn-primary group flex items-center gap-2 rounded-sm px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em]"
            >
              Ver planos
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#conheca-o-espaco"
              className="rounded-sm border border-white/30 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-colors duration-200 hover:border-white hover:bg-white/5"
            >
              Conhecer o espaço
            </a>
          </div>
        </div>
      </div>

      <div
        className="hero-stats mx-auto flex max-w-[1400px] flex-row flex-nowrap justify-center gap-2 px-4 pb-8 sm:gap-3 sm:px-6 md:gap-4 md:px-12 md:pb-10"
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-sm border border-[var(--color-border)] px-2 py-3 text-center transition-colors duration-200 hover:border-[var(--color-ink)] active:border-[var(--color-ink)] sm:px-5 sm:py-4 md:max-w-[220px] md:flex-initial md:items-start md:px-7 md:py-5 md:text-left"
          >
            <p
              className={stat.highlight ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink)]'}
              style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.05rem, 4.5vw, 1.75rem)' }}
            >
              {stat.value}
            </p>
            <p className="text-[0.62rem] uppercase leading-tight tracking-[0.05em] text-[var(--color-text-muted)] sm:text-xs sm:tracking-[0.15em]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
