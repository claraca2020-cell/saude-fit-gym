import { useEffect, useRef, useState } from 'react'
import logoSaudeFit from '../assets/brand/logo-saudefit.png'

const NAV_LINKS = [
  { label: 'Aulas coletivas', href: '#aulas-coletivas' },
  { label: 'Localização', href: '#ambiente' },
  { label: 'Planos', href: '#planos' },
  { label: 'Perguntas', href: '#faq' },
]

const NAV_LINK_CLASS =
  'text-[14px] uppercase tracking-[1px] text-white transition-colors duration-300 hover:text-[var(--color-text-muted)]'

function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center ${className}`}>
      <img src={logoSaudeFit} alt="Saúde Fit Gym" width={700} height={233} className="h-12 w-auto md:h-16" />
    </a>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[1000] border-b border-white/5 bg-[rgba(12,12,12,0.92)] py-[15px] md:bg-[rgba(12,12,12,0.55)] md:backdrop-blur-[10px]">
        <Logo className="!hidden absolute left-3 top-1/2 -translate-y-[57%] md:!flex md:left-6" />

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
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="relative z-[1001] flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-y-[6px] rotate-45' : ''} block h-px w-6 bg-[var(--color-ink)]`}
            />
            <span
              className={`transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : ''} block h-px w-6 bg-[var(--color-ink)]`}
            />
            <span
              className={`transition-transform duration-300 ease-out ${isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''} block h-px w-6 bg-[var(--color-ink)]`}
            />
          </button>
        </div>
      </header>

      {isMenuOpen && (
          <div
            className="animate-fade-in fixed inset-0 z-40 flex flex-col justify-center bg-[var(--color-bg-main)] px-8 md:hidden"
          >
            <nav id="mobile-menu" aria-label="Navegação principal" className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="animate-fade-up border-b border-[var(--color-border)] py-4 text-4xl text-[var(--color-ink)]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700, '--fade-delay': `${0.04 + i * 0.04}s` } as React.CSSProperties}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
    </>
  )
}
