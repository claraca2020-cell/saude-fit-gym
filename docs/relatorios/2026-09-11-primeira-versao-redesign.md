# Saúde Fit Gym — Redesign do site (primeira versão)

## Visão geral

Novo site em React para a academia **Saúde Fit Gym** (Riacho Fundo I, Brasília – DF), cliente cujo site atual (`saudefitgym.com`) roda em WordPress. A decisão do cliente foi por um **redesign completo** (não uma migração 1:1), com direção visual **clean/premium** — inspirada em academias boutique (ex: Equinox): base preto/branco/marfim, tipografia serifada de destaque, muito espaço em branco e um único acento de cor (dourado/bronze) usado com moderação.

## Stack técnica

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`, tema custom em `src/index.css`)
- `framer-motion` (animações de entrada e menu mobile)
- `lucide-react` (ícones)
- `oxlint` para lint

Mesma stack usada no projeto da DOTS Arquitetura (`albergaria`), para manter consistência entre os projetos do usuário.

## Paleta e tipografia

- `--color-ink`: `#121212` (texto/preto principal)
- `--color-bg-main`: `#faf9f6` (marfim/fundo)
- `--color-bg-card`: `#ffffff`
- `--color-bg-dark`: `#101010` (seções de contraste)
- `--color-accent`: `#a9814a` (dourado/bronze, uso pontual)
- `--font-display`: Fraunces (serifada, títulos)
- `--font-sans`: Inter (corpo/UI)

## Estrutura de pastas

```
saude-fit-gym/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Benefits.tsx
│   │   ├── Modalities.tsx
│   │   ├── Location.tsx
│   │   ├── Pricing.tsx
│   │   ├── Faq.tsx
│   │   ├── CtaStrip.tsx
│   │   └── Footer.tsx
│   ├── hooks/useRevealOnScroll.ts
│   ├── index.css
│   ├── App.tsx
│   └── main.tsx
└── docs/relatorios/ (este relatório)
```

## Seções implementadas

1. **Header** — logo em texto, navegação âncora, CTA "Matricule-se", menu mobile animado.
2. **Hero** — headline editorial, subtexto, CTAs, mini-stats (preço do plano família, nº de modalidades, dias abertos no fim de semana).
3. **Benefits** ("Treine conosco") — grade de benefícios reais do site atual (aulas coletivas, treino personalizado, horário livre, fim de semana, free pass, wi-fi) + garantia de 30 dias.
4. **Modalities** — 6 modalidades reais (Musculação, Cross Training, Dança, Bike Indoor, Pilates, Flux Training) com ícones.
5. **Location** ("Ambiente") — endereço real, mapa embutido (Google Maps iframe), galeria com blocos placeholder (ver pendências).
6. **Pricing** — abas Família/Pessoal/Bike Indoor; Família com os 3 tiers reais de preço (2/3/4+ pessoas); Pessoal e Bike Indoor como "sob consulta" (dados não disponíveis).
7. **FAQ** — accordion com as perguntas reais extraídas do site atual; respostas reescritas, mas quando a informação factual exata não estava disponível (horários, idade mínima, política de crianças), a resposta direciona para "consulte a recepção" em vez de inventar dados.
8. **CtaStrip** + **Footer**.

Type-check (`tsc -b`) e lint (`oxlint`) rodando limpos. Testado visualmente no navegador (desktop) — todas as seções e interações (abas de planos, accordion de FAQ, menu) funcionando.

## Pendências / próximos passos

- **Fotografia real do ambiente**: a seção "Ambiente" está com blocos de gradiente no lugar de fotos (não foram copiadas as fotos do site atual por serem material do cliente/terceiros). Substituir pelos registros reais da academia.
- **Preços de Pessoal e Bike Indoor**: não estavam visíveis no site atual: confirmar valores com o cliente.
- **Horários de funcionamento, idade mínima, política de crianças**: não confirmados — FAQ está com respostas genéricas apontando para a recepção; atualizar com os dados reais.
- **Contato/WhatsApp**: os CTAs de matrícula hoje levam para a seção de planos/FAQ; falta o número real de WhatsApp do cliente para linkar directo (`wa.me/...`).
- **Logo/identidade**: usado apenas texto "Saúde Fit Gym" no header/footer; se o cliente tiver ou quiser uma logo desenhada, aplicar no lugar do texto.
- Validar responsividade em mobile real (o teste automatizado de viewport não confirmou visualmente nesta sessão).
