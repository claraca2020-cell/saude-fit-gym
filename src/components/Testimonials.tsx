import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useSwipeNavigation } from '../hooks/useSwipeNavigation'

type Review = { name: string; time: string; text: string }

const REVIEW_GROUPS: Review[][] = [
  [
    { name: 'Ester Viana', time: '3 semanas atrás', text: 'Estou muito satisfeita com a academia! Desde o atendimento na recepção, que é sempre muito atencioso e acolhedor, até a qualidade dos treinos personalizados. Quero destacar também minha professora (Gil), que é muito dedicada, atenciosa e sempre disposta a ajudar.' },
    { name: 'Letícia Xavier', time: 'um ano atrás', text: 'A Academia tem superado as minhas expectativas. Equipamentos são novos e modernos. O ambiente é limpo e organizado. Os professores Bruno e Leo sempre à disposição para ajudar, e ensinam o passo a passo da execução dos exercícios.' },
    { name: 'Izabela Goncalves', time: '11 meses atrás', text: 'A academia tem um ambiente agradável, percebe-se o cuidado e atenção com os detalhes. O banheiro está sempre impecável e cheiroso, os espaços são amplos e os aparelhos novos e bem cuidados, tem luz natural e colaboradores prestativos.' },
    { name: 'Raphael Brasileiro De Oliveira', time: '5 meses atrás', text: 'Gostaria de deixar registrado não só as 5 estrelas, mas o espaço aliado à equipe de trabalho extraordinária que compõe o corpo da academia Saúde Fit. Confesso que nunca gostei de “puxar ferro”, mas na Saúde Fit minha opinião sobre academia mudou.' },
  ],
  [
    { name: 'Ilainy Alves', time: '4 meses atrás', text: 'Melhor academia do Riacho Fundo 1! Academia simplesmente incrível! Ambiente super organizado, equipamentos novos e sempre bem cuidados. Os professores são atenciosos, ajudam de verdade e motivam a gente a evoluir cada dia mais.' },
    { name: 'Michele Monique Ribeiro De Oliveira', time: '5 meses atrás', text: 'Gostaria de deixar aqui meu elogio à academia e a toda a equipe, que sempre demonstra muito profissionalismo e cuidado com os alunos. Em especial, quero destacar a atendente Paloma, que é extremamente prestativa e atenciosa.' },
    { name: 'Matheus Canedo', time: '5 meses atrás', text: 'Academia com ótima estrutura! Grande número de equipamentos, assim é raro precisar revezar, e os equipamentos são bem cuidados e de fácil utilização. Além disso, há área de aulas, dança, musculação livre e um bom número de esteiras.' },
    { name: 'Amanda', time: '8 meses atrás', text: 'Ambiente limpo e agradável, professores atenciosos, a melhor do Riacho Fundo 1. Evoluindo em equipamentos e profissionais qualificados cada vez mais.' },
  ],
  [
    { name: 'Gaby Ferreira', time: '4 meses atrás', text: 'Frequento a academia Saúde Fit e estou simplesmente encantada! O espaço é muito amplo, conta com dois andares super bem organizados, e os equipamentos são excelentes, todos modernos e bem cuidados.' },
    { name: 'Raquel Marnet', time: '3 meses atrás', text: 'Estou adorando treinar na Saúde Fit, sou aluna há pouco mais de 1 ano e vejo que estão sempre se inovando e trazendo melhorias. Bons equipamentos e não é uma academia lotada.' },
    { name: 'simara pereira de souza', time: 'uma semana atrás', text: 'Ambiente muito agradável.' },
    { name: 'iara medeiros', time: 'uma semana atrás', text: 'Ótima academia, recomendo.' },
  ],
]

function Stars() {
  return <div role="img" className="flex gap-0.5 text-[var(--color-accent)]" aria-label="5 estrelas">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} className="md:hidden" fill="currentColor" strokeWidth={0} />)}{Array.from({ length: 5 }).map((_, index) => <Star key={`desktop-${index}`} size={16} className="hidden md:block" fill="currentColor" strokeWidth={0} />)}</div>
}

function ReviewCarousel({ reviews, groupIndex }: { reviews: Review[]; groupIndex: number }) {
  const [index, setIndex] = useState(0)
  const review = reviews[index]
  const go = (direction: number) => setIndex((current) => (current + direction + reviews.length) % reviews.length)
  const swipeHandlers = useSwipeNavigation(go)

  return (
    <article className="flex min-h-[320px] flex-col rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 md:min-h-[430px] md:p-6" {...swipeHandlers}>
      <Stars />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-ink)] md:mt-5 md:text-lg md:leading-[1.5]">“{review.text}”</p>
      <div className="mt-4 border-t border-[var(--color-border)] pt-3 md:mt-5 md:pt-4"><p className="text-sm font-semibold text-[var(--color-ink)] md:text-base">{review.name}</p><p className="mt-1 text-xs text-[var(--color-text-muted)] md:text-sm">{review.time} · Google Avaliações</p></div>
      <div className="mt-4 flex items-center justify-between md:mt-5">
        <button type="button" onClick={() => go(-1)} aria-label={`Avaliações anteriores do grupo ${groupIndex + 1}`} className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"><ChevronLeft size={18} /></button>
        <div role="group" className="flex gap-0" aria-label={`Avaliação ${index + 1} de ${reviews.length}`}>{reviews.map((item, itemIndex) => <button key={item.name} type="button" onClick={() => setIndex(itemIndex)} aria-label={`Ver avaliação ${itemIndex + 1} do grupo ${groupIndex + 1}`} aria-pressed={itemIndex === index} data-tone="accent" className="carousel-indicator" />)}</div>
        <button type="button" onClick={() => go(1)} aria-label={`Próximas avaliações do grupo ${groupIndex + 1}`} className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"><ChevronRight size={18} /></button>
      </div>
    </article>
  )
}

export function Testimonials() {
  return (
    <section className="border-t border-[var(--color-border)] py-10 md:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <div><p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-accent)] sm:text-base sm:tracking-[0.35em]">Avaliações</p><h2 className="mt-3 max-w-lg text-3xl leading-tight text-[var(--color-ink)] md:mt-4 md:text-5xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>A academia mais bem avaliada do Riacho Fundo I.</h2></div>
          <div className="flex shrink-0 items-center gap-3 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 md:px-6 md:py-4"><p className="text-2xl text-[var(--color-ink)] md:text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>4,6</p><div><Stars /><p className="mt-1 text-[11px] text-[var(--color-text-muted)] md:text-xs">Google Avaliações · 380 avaliações</p></div></div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 md:mt-10 md:grid-cols-3 md:gap-5">{REVIEW_GROUPS.map((reviews, groupIndex) => <ReviewCarousel key={groupIndex} reviews={reviews} groupIndex={groupIndex} />)}</div>
      </div>
    </section>
  )
}
