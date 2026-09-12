# Saúde Fit Gym — Fotos reais, Aulas Coletivas e planos completos

Continuação do relatório `2026-09-11-primeira-versao-redesign.md`.

## O que mudou nesta rodada

### Fotos reais do cliente
Importadas 6 fotos da nota do Obsidian `Projetos pessoais e profissionais/projeto saude fit/fotos do site.md` (vault `central`), otimizadas de PNG (~2.5-3MB cada) para JPEG (~130-220KB cada, 1600px de largura) com `sharp` (dependência usada só para o processamento e removida em seguida). Ficam em `src/assets/photos/`:

- `fachada.jpg` — fachada da academia, com logo real, WhatsApp e Instagram visíveis.
- `musculacao.jpg` — área de musculação.
- `cardio-esteiras.jpg` / `cardio-eliptico.jpg` — área de cardio.
- `pilates-bola.jpg` — aula de pilates (aluna com bola suíça).
- `conveniencia.jpg` — loja de conveniência/bebidas.

### Nova seção "Aulas Coletivas"
`src/components/Modalities.tsx` foi renomeado para `src/components/GroupClasses.tsx` (`GroupClasses`). Section id mudou de `#modalidades` para `#aulas-coletivas`, título para "Todas as aulas em um só lugar", listando as 6 modalidades que a academia oferece. Nav do header atualizado (`Modalidades` → `Aulas coletivas`).

### Novo carrossel de modalidades
`src/components/ModalitiesCarousel.tsx` — carrossel com transição via `framer-motion`, setas de navegação e dots, usando as fotos reais. Ordem das slides (conforme solicitado, pilates é a primeira): Pilates → Musculação → Cardio (esteiras) → Cardio (elípticos/bikes). Inserido em `App.tsx` logo após `GroupClasses`.

### Galeria "Ambiente" com fotos reais
`src/components/Location.tsx` não usa mais blocos de gradiente placeholder — a galeria (grid 3 colunas, foto da fachada em destaque) agora usa as 6 fotos reais.

### Planos completos (dados reais da nota "tabela de preços e regras.md")
`src/components/Pricing.tsx` ganhou as abas Pessoal e Bike Indoor com dados reais (antes eram "sob consulta"):
- **Pessoal**: Active Quadrimestral (R$139,90/mês), Fit Anual (R$139,90/mês, marcado como recomendado), Mensal (R$209,90/mês) — cada um com suas condições e check-ins de bike indoor inclusos.
- **Bike Indoor**: tabela com os 6 pacotes (avulsa a 16 aulas), valor total e valor por aula.
- Todos os botões "Quero me matricular" / "Contratar" agora linkam para o WhatsApp real da academia: `https://wa.me/5541992220020` (número extraído da foto da fachada).

## Pendências que ainda restam
- Horários de funcionamento, idade mínima e política de crianças continuam sem confirmação oficial — FAQ mantém respostas genéricas apontando para a recepção.
- A tabela de preços tem duas inconsistências no material de origem que valem confirmar com o cliente antes de publicar: a aula avulsa de bike aparece com dois preços (R$ 34,90 anunciado vs. R$ 39,90 "por aula"), e o texto do plano quadrimestral menciona "3x no crédito à vista" (redação ambígua).
- Confirmar se o Instagram `@saudefit.gym` (visível na foto da fachada) deve ser incluído como link no footer/header.
