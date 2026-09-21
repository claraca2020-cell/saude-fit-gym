import { ArrowRight } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/5561984010700'

export function CtaStrip() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-card)] py-14 md:py-16 text-[var(--color-ink)]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-12">
        <h2
          className="max-w-lg text-3xl uppercase leading-tight md:text-4xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}
        >
          Matricule-se agora e ganhe uma avaliação física gratuita.
        </h2>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 rounded-sm bg-[var(--color-ink)] px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-bg-main)] transition-colors duration-200 hover:bg-[var(--color-accent)]"
        >
          Quero me matricular
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}
