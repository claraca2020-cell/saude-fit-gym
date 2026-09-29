import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { SnapCarousel } from './SnapCarousel'
import areaMusculacao from '../assets/photos/optimized/area-musculacao.webp'
import cardioEliptico from '../assets/photos/optimized/cardio-eliptico.webp'
import cardioEsteiras from '../assets/photos/optimized/cardio-esteiras.webp'
import musculacao from '../assets/photos/optimized/musculacao.webp'
import recepcao from '../assets/photos/optimized/recepcao.webp'
import salaFuncional from '../assets/photos/optimized/sala-funcional.webp'

const SLIDES = [
  { image: recepcao, label: 'Recepção', description: 'Ambiente monitorado 24h, pronto para te receber.', width: 1400, height: 788 },
  { image: areaMusculacao, label: 'Área de Musculação', description: 'Estações completas de peso livre, guiadas por número.', width: 1400, height: 788 },
  { image: salaFuncional, label: 'Sala Funcional', description: 'Espaço amplo para treinos funcionais e alongamento.', width: 1400, height: 788 },
  { image: cardioEsteiras, label: 'Esteiras', description: 'Esteiras com vista para a rua.', width: 1600, height: 900 },
  { image: cardioEliptico, label: 'Cardio', description: 'Elípticos e bikes para o seu cardio.', width: 1600, height: 900 },
  { image: musculacao, label: 'Musculação', description: 'Equipamentos guiados, do aquecimento à força máxima.', width: 1600, height: 900 },
]

export function SiteGalleryCarousel() {
  const [open, setOpen] = useState<number | null>(null)
  const current = open != null ? SLIDES[open] : null
  const step = (dir: number) => setOpen((i) => (i == null ? i : (i + dir + SLIDES.length) % SLIDES.length))

  useEffect(() => {
    if (open == null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <section id="conheca-o-espaco" className="border-t border-[var(--color-border)] py-10 md:py-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[var(--color-accent)]">Conheça o espaço</p>
        <h2 className="mt-3 mb-6 text-3xl leading-tight text-[var(--color-ink)] sm:text-4xl md:mb-10 md:text-5xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Uma volta pela Saúde Fit Gym.
        </h2>
        <SnapCarousel slides={SLIDES} label="Fotos do espaço" onOpen={setOpen} />
      </div>

      {current && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 p-4 md:p-10" role="dialog" aria-modal="true" aria-label={`Foto ampliada: ${current.label}`} onClick={() => setOpen(null)}>
          <div className="relative max-h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <img src={current.image} alt={current.label} width={current.width} height={current.height} className="max-h-[85vh] w-auto max-w-full rounded-sm object-contain" />
            <button type="button" onClick={() => step(-1)} className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/70 text-white hover:bg-black" aria-label="Foto anterior">
              <ChevronLeft size={22} />
            </button>
            <button type="button" onClick={() => step(1)} className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/70 text-white hover:bg-black" aria-label="Próxima foto">
              <ChevronRight size={22} />
            </button>
            <button type="button" onClick={() => setOpen(null)} className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-black/70 text-white hover:bg-black" aria-label="Fechar foto ampliada">
              <X size={20} />
            </button>
            <p className="absolute inset-x-0 bottom-3 text-center text-sm text-white/90">{current.label}</p>
          </div>
        </div>
      )}
    </section>
  )
}
