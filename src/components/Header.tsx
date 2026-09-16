import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logoSaudeFit from '../assets/brand/logo-saudefit.png'

const NAV_LINKS = [
  { label: 'Aulas coletivas', href: '#aulas-coletivas' },
  { label: 'Localização', href: '#ambiente' },
  { label: 'Planos', href: '#planos' },
  { label: 'Perguntas', href: '#faq' },
]

const NAV_LINK_CLASS =
  'text-[14px] uppercase tracking-[1px] text-white transition-colors duration-300 hover:text-[var(--color-accent)]'

function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center ${className}`}>
      <img src={logoSaudeFit} alt="Saúde Fit Gym" className="h-12 w-auto md:h-16" />
    </a>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[1000] border-b border-white/5 bg-[rgba(15,15,15,0.4)] py-[15px] backdrop-blur-[10px]">
        <Logo className="!hidden absolute left-3 top-1/2 -translate-y-1/2 md:!flex md:left-6" />

        <div className="relative mx-auto hidden max-w-[1400px] items-center px-6 md:flex md:px-12">
          <nav className="mx-auto flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={NAV_LINK_CLASS}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:hidden">
          <Logo />

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            className="relative z-[1001] flex h-6 w-8 flex-col justify-between"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="block h-px w-full bg-[var(--color-ink)]"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-full bg-[var(--color-ink)]"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="block h-px w-full bg-[var(--color-ink)]"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[var(--color-bg-main)] px-8 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: 'easeOut' }}
                  className="border-b border-[var(--color-border)] py-4 text-4xl text-[var(--color-ink)]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
