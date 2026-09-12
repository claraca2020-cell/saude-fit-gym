import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import heroImage from '../assets/photos/capa-titulo.jpg'

const STATS = [
  { value: '2 mil m²', label: 'De estrutura completa', highlight: true },
  { value: '6', label: 'Modalidades inclusas', highlight: false },
  { value: '7 dias', label: 'Aberto sáb. e dom.', highlight: false },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative flex min-h-[820px] flex-col justify-center md:min-h-[920px]">
        <img
          src={heroImage}
          alt="Fachada da Saúde Fit Gym"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'contrast(1.1) saturate(0.9)', objectPosition: 'center 0%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,12,14,0.25) 0%, rgba(11,12,14,0.4) 50%, var(--color-bg-main) 97%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-[19rem] pb-16 text-center md:px-12 md:pt-[21rem] md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex items-center justify-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/90"
          >
            <span>Riacho Fundo I</span>
            <span className="text-white/40">·</span>
            <span className="flex items-center gap-1 text-[var(--color-accent)]">
              4,6
              <Star size={12} fill="currentColor" strokeWidth={0} />
              Google Avaliações
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto max-w-4xl text-5xl uppercase leading-[0.98] text-white md:text-7xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}
          >
            Em prol de uma vida
            <br />
            mais <span className="text-[var(--color-accent)]">saudável.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
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
              href="#ambiente"
              className="rounded-sm border border-white/30 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-colors duration-200 hover:border-white hover:bg-white/5"
            >
              Conhecer o espaço
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex max-w-[1400px] flex-wrap justify-center gap-4 px-6 py-10 md:px-12"
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 rounded-sm border border-[var(--color-border)] px-7 py-5 transition-colors duration-200 hover:border-[var(--color-accent)] active:border-[var(--color-accent)]"
          >
            <p
              className={stat.highlight ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink)]'}
              style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem' }}
            >
              {stat.value}
            </p>
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
