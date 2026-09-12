import { FacebookIcon } from './FacebookIcon'
import { InstagramIcon } from './InstagramIcon'

const INSTAGRAM_URL = 'https://www.instagram.com/saudefitgym/'
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61567696081568&locale=pt_BR'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 text-center text-xs text-[var(--color-text-muted)] md:flex-row md:px-12 md:text-left">
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }} className="text-sm text-[var(--color-ink)]">
          Saúde Fit Gym
        </p>

        <div className="flex items-center justify-center gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram da Saúde Fit Gym"
            className="text-[var(--color-ink)] transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            <InstagramIcon size={26} />
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook da Saúde Fit Gym"
            className="text-[var(--color-ink)] transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            <FacebookIcon size={26} />
          </a>
        </div>

        <p>© {new Date().getFullYear()} Saúde Fit Gym — Riacho Fundo I, Brasília – DF</p>
      </div>
    </footer>
  )
}
