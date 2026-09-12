# Saúde Fit Gym — Nova direção visual: Neon Noturno

## Contexto
A pedido do usuário, usei a skill de design (Claude Design canvas) para explorar 3 direções visuais alternativas para a home, além da já codada ("clean/premium"): **A — Editorial Atual+**, **B — Neon Noturno** e **C — Editorial Colorido**. O canvas com as 3 opções foi publicado como Artifact para comparação. O usuário escolheu a **Direção B — Neon Noturno**.

## O que mudou no código
Troca de identidade visual completa do site, de "boutique clean/premium" (marfim + dourado + serifada Fraunces) para "Neon Noturno" (fundo escuro + acento neon lima + tipografia bold condensada Archivo), inspirada na iluminação neon real do ambiente da academia (visível nas fotos reais já importadas).

### `src/index.css` — tema
- `--color-ink`: `#121212` → `#f4f4f2` (agora é a cor de TEXTO clara, não mais "tinta escura")
- `--color-bg-main`: `#faf9f6` → `#0b0c0e` (fundo principal agora escuro)
- `--color-bg-card`: `#ffffff` → `#16171a`
- `--color-accent`: `#a9814a` (dourado) → `#c9ff4f` (neon lima)
- `--color-accent-soft`: `#d9c6a3` → `#e3ffa0`
- `--color-text-muted`: `#6e6b64` → `#9a9a92`
- `--font-display`: Fraunces (serifada) → Archivo (sans bold condensada, pesos 600–900)
- As classes `.btn-primary`/`.btn-ghost` e a fórmula de `--color-border` não mudaram — como são todas baseadas nas variáveis, o tema inverteu automaticamente sem precisar reescrever a lógica de botões.

### `index.html`
Import do Google Fonts trocado de Fraunces+Inter para Archivo (600/700/800/900)+Inter.

### Componentes ajustados
- **Hero.tsx**: título reescrito para caixa alta, peso 800, sem itálico ("TREINO SÉRIO. SEM DESCULPA." com "SÉRIO" em neon) — igual ao conceito aprovado. Glow decorativo do canto agora usa a cor de acento neon em vez do dourado suave.
- **Header.tsx**: logo em caixa alta, peso 800.
- **CtaStrip.tsx**: a faixa final de CTA usava `bg-[var(--color-ink)]` como truque para ter uma seção escura de contraste — como `ink` virou claro, isso quebraria o contraste. Troquei o fundo para `var(--color-accent)` (neon cheio), que é o tratamento de maior impacto e combina com o conceito.
- **Pricing.tsx**: badge "Recomendado" tinha texto branco fixo sobre fundo de acento — trocado para texto escuro (`--color-bg-main`) para manter contraste legível sobre o neon lima.
- **ModalitiesCarousel.tsx**: ícone das setas de navegação (dentro de botões brancos fixos) usava `var(--color-ink)`, que virou claro — ficaria texto claro sobre fundo branco. Corrigido para `var(--color-bg-main)` (escuro), que continua correto independente do tema.
- **Location.tsx**: o iframe do Google Maps ganhou um filtro CSS (`invert + hue-rotate + contrast`) para simular um mapa em modo escuro, coerente com o resto da página (antes só tinha um `grayscale-40%` que ficava claro demais sobre fundo escuro).
- Pesos de fonte de exibição (`fontWeight`) bumped de 500 para 700/800 em todos os headings/preços, já que a família trocou de uma serifada elegante para uma sans bold condensada — peso 500 ficaria fino demais no Archivo.

## Validado
- `tsc -b` e `oxlint` limpos.
- Conferido visualmente no navegador: Hero, Benefícios, Aulas Coletivas, Carrossel, Ambiente (galeria + mapa escuro), Planos (incluindo o card "destaque" que agora inverte para um card claro sobre o fundo escuro — funciona bem como spotlight), FAQ, CTA final, Footer.

## Pendências (herdadas dos relatórios anteriores, ainda válidas)
- Confirmar com o cliente: horários de funcionamento, idade mínima, política de crianças (FAQ ainda genérico nesses pontos).
- Duas inconsistências na tabela de preços de origem (preço duplo da aula avulsa de bike; descrição ambígua do plano quadrimestral) — vale confirmar antes de publicar.
- Confirmar se o Instagram `@saudefit.gym` (visto na foto da fachada) deve entrar como link no header/footer.
