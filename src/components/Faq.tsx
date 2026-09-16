import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQ_ITEMS = [
  {
    question: 'Quais são os horários de funcionamento?',
    answer:
      'Segunda a sexta, das 05h às 23h. Sábado, das 08h às 18h. Domingo, das 08h às 13h. A grade completa das aulas coletivas fica disponível na recepção.',
  },
  {
    question: 'Posso experimentar antes de me matricular?',
    answer:
      'Sim — oferecemos aula experimental gratuita na primeira vez, e nos finais de semana você pode trazer um colega para experimentar também.',
  },
  {
    question: 'A academia oferece treinos personalizados?',
    answer:
      'Sim. Um professor monta o seu treino e acompanha sua evolução, com ajustes conforme você progride. O treino fica pronto em até 24 horas.',
  },
  {
    question: 'Como funciona o plano recorrente no cartão de crédito?',
    answer:
      'O plano recorrente debita apenas o valor da mensalidade a cada mês, igual a um serviço de streaming — não bloqueia nem compromete o limite total do seu cartão.',
  },
  {
    question: 'Posso congelar ou pausar minha assinatura?',
    answer:
      'Sim. Você tem direito a trancamento médico sem prazo definido, ou até 30 dias de trancamento livre (7 dias sem precisar de atestado).',
  },
  {
    question: 'Sou iniciante, terei professor para me auxiliar?',
    answer: 'Sim — em todos os horários de funcionamento há professores formados para te auxiliar.',
  },
  {
    question: 'Há armários e qual a idade mínima para treinar?',
    answer:
      'Sim, temos armários nos vestiários (é necessário levar seu próprio cadeado, pois o uso é rotativo). A idade mínima é 14 anos — não aceitamos menores de 14.',
  },
  {
    question: 'É permitido trazer acompanhantes ou visitantes?',
    answer: 'Sim, nos finais de semana os alunos podem trazer convidados para conhecer o espaço.',
  },
  {
    question: 'Vocês têm personal trainer próprio?',
    answer:
      'Não temos personal trainer da própria academia, mas liberamos o espaço para profissionais externos atenderem seus alunos aqui.',
  },
  {
    question: 'Tem estacionamento?',
    answer: 'Sim, temos espaço na frente da academia para carros, bikes, motos e patinetes.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const midpoint = Math.ceil(FAQ_ITEMS.length / 2)
  const columns = [FAQ_ITEMS.slice(0, midpoint), FAQ_ITEMS.slice(midpoint)]

  return (
    <section id="faq" className="border-t border-[var(--color-border)] pt-10 pb-14 md:pt-12 md:pb-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-accent)]">
          Perguntas frequentes
        </p>
        <h2
          className="mt-4 text-4xl leading-tight text-[var(--color-ink)] md:text-5xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
        >
          Tire suas dúvidas.
        </h2>

        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-x-24">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {column.map((item, i) => {
                const globalIndex = colIndex === 0 ? i : midpoint + i
                const isOpen = openIndex === globalIndex
                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-sm text-[var(--color-ink)] md:text-base" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-[var(--color-accent)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className="grid overflow-hidden transition-all duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 text-sm text-[var(--color-text-muted)] md:text-base">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
