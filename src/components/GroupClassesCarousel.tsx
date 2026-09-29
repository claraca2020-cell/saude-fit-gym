import type { Ref } from 'react'
import { GROUP_CLASS_SLIDES } from './groupClassSlides'
import { SnapCarousel, type SnapCarouselHandle } from './SnapCarousel'

export function GroupClassesCarousel({ handleRef }: { handleRef: Ref<SnapCarouselHandle> }) {
  return (
    <div id="aulas-coletivas-carousel" className="mt-8 scroll-mt-28 md:mt-12">
      <SnapCarousel slides={GROUP_CLASS_SLIDES} label="Fotos das aulas coletivas" aspect="aspect-[4/3] md:aspect-[21/9]" handleRef={handleRef} />
    </div>
  )
}
