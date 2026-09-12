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
    <>
      <Header />
      <main>
        <Hero />
        <Plans />
        <SiteGalleryCarousel />
        <Benefits />
        <GroupClasses />
        <Location />
        <Faq />
        <Testimonials />
      </main>
      <CtaStrip />
      <Footer />
    </>
  )
}

export default App
