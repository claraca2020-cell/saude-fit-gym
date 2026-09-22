import logoSaudeFit from '../assets/brand/logo-saudefit.png'
import assinaturaBranca from '../assets/brand/assinatura-branca.png'
import iconInstagram from '../assets/brand/icon-instagram.png'
import iconFacebook from '../assets/brand/icon-facebook.png'
import iconWhatsapp from '../assets/brand/icon-whatsapp.png'

const INSTAGRAM_URL = 'https://www.instagram.com/saudefitgym/'
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61567696081568&locale=pt_BR'
const WHATSAPP_URL = 'https://wa.me/5561984010700'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 items-center justify-items-center gap-4 md:grid-cols-3">
          <img src={logoSaudeFit} alt="Saúde Fit Gym" className="h-16 w-auto md:h-20 md:justify-self-start" />

          <div className="flex items-center justify-center gap-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Saúde Fit Gym"
              className="opacity-80 transition-opacity duration-300 hover:opacity-100"
            >
              <img src={iconInstagram} alt="" className="h-[26px] w-[26px]" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook da Saúde Fit Gym"
              className="opacity-80 transition-opacity duration-300 hover:opacity-100"
            >
              <img src={iconFacebook} alt="" className="h-[26px] w-[26px]" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Falar no WhatsApp"
              className="opacity-80 transition-opacity duration-300 hover:opacity-100"
            >
              <img src={iconWhatsapp} alt="" className="h-[42px] w-[42px]" />
            </a>
          </div>

          <img src={assinaturaBranca} alt="Assinatura" className="h-20 w-auto md:h-28 md:justify-self-end" />
        </div>

        <div className="mt-6 text-center">
          <p className="text-[0.7rem] text-[var(--color-text-muted)]">© {new Date().getFullYear()} Saúde Fit Gym, Riacho Fundo I, Brasília – DF</p>
        </div>
      </div>
    </footer>
  )
}
