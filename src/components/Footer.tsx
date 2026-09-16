import { FacebookIcon } from './FacebookIcon'
import { InstagramIcon } from './InstagramIcon'
import { WhatsAppIcon } from './WhatsAppIcon'
import logoSaudeFit from '../assets/brand/logo-saudefit.png'

const INSTAGRAM_URL = 'https://www.instagram.com/saudefitgym/'
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61567696081568&locale=pt_BR'
const WHATSAPP_URL = 'https://wa.me/5561984010700'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-10">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center justify-items-center gap-4 px-6 text-center text-xs text-[var(--color-text-muted)] md:grid-cols-3 md:px-12">
        <img src={logoSaudeFit} alt="Saúde Fit Gym" className="h-10 w-auto md:h-12 md:justify-self-start" />

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
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Falar no WhatsApp"
            className="text-[var(--color-ink)] transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            <WhatsAppIcon size={26} />
          </a>
        </div>

        <p className="md:justify-self-end">© {new Date().getFullYear()} Saúde Fit Gym — Riacho Fundo I, Brasília – DF</p>
      </div>
    </footer>
  )
}
