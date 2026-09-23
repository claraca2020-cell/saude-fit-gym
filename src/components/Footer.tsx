import logoSaudeFit from '../assets/brand/logo-saudefit.png'
import assinaturaBranca from '../assets/brand/assinatura-branca.png'
import iconInstagram from '../assets/brand/icon-instagram.png'
import iconFacebook from '../assets/brand/icon-facebook.png'
import iconWhatsapp from '../assets/brand/icon-whatsapp.png'
import { trackEvent } from '../lib/analytics'

const INSTAGRAM_URL = 'https://www.instagram.com/saudefitgym/'
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61567696081568&locale=pt_BR'
const WHATSAPP_URL = 'https://wa.me/5561984010700'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="footer-content">
          <div className="footer-brand-row">
            <img src={logoSaudeFit} alt="Saúde Fit Gym" width={700} height={233} loading="lazy" decoding="async" className="footer-main-logo" />
            <img src={assinaturaBranca} alt="Assinatura" width={1672} height={941} loading="lazy" decoding="async" className="footer-signature" />
          </div>
          <div className="footer-socials">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram da Saúde Fit Gym"
                  className="social-icon-link social-instagram"
                >
                  <img src={iconInstagram} alt="" width={512} height={512} loading="lazy" decoding="async" className="social-icon" />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook da Saúde Fit Gym"
                  className="social-icon-link social-facebook"
                >
                  <img src={iconFacebook} alt="" width={512} height={512} loading="lazy" decoding="async" className="social-icon" />
                </a>
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent('Olá! Gostaria de conhecer a Saúde Fit Gym.')}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Falar no WhatsApp"
                  onClick={() => trackEvent('whatsapp_click', { source: 'footer' })}
                  className="social-icon-link social-whatsapp"
                >
                  <img src={iconWhatsapp} alt="" width={512} height={512} loading="lazy" decoding="async" className="social-icon" />
                </a>
          </div>
          <p className="footer-copyright">© {new Date().getFullYear()} Saúde Fit Gym, Riacho Fundo I, Brasília – DF</p>
        </div>
      </div>
    </footer>
  )
}
