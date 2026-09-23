import { MotionConfig } from 'framer-motion'
import { Benefits } from './components/Benefits'
import { CtaStrip } from './components/CtaStrip'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { GroupClasses } from './components/GroupClasses'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Location } from './components/Location'
import { Plans } from './components/Plans'
import { SiteGalleryCarousel } from './components/SiteGalleryCarousel'
import { Testimonials } from './components/Testimonials'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <>
        <a className="skip-link" href="#main-content">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Plans />
          <SiteGalleryCarousel />
          <GroupClasses />
          <Benefits />
          <Location />
          <Faq />
          <Testimonials />
        </main>
        <CtaStrip />
        <Footer />
      </>
    </MotionConfig>
  )
}

export default App
