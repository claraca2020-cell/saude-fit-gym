import { ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'

const WHATSAPP_URL = 'https://wa.me/5561984010700'

export function CtaStrip() {
  return (
    <section className="bg-[var(--color-accent)] py-20 text-[var(--color-bg-main)]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-12">
        <h2
          className="max-w-lg text-3xl uppercase leading-tight md:text-4xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}
        >
          Matricule-se agora e ganhe uma avaliação física gratuita.
        </h2>

        <div className="flex items-center gap-3">
          <a
            href="#planos"
            className="group flex items-center gap-2 rounded-sm bg-[var(--color-bg-main)] px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-ink)] transition-colors duration-200 hover:bg-[var(--color-ink)] hover:text-[var(--color-bg-main)]"
          >
            Quero me matricular
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Falar no WhatsApp"
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-sm bg-[var(--color-bg-main)] text-[var(--color-accent)] transition-colors duration-200 hover:bg-[var(--color-ink)]"
          >
            <WhatsAppIcon size={22} />
          </a>
        </div>
      </div>
    </section>
  )
}
