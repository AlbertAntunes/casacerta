# TODO - Landing Page Casa Certa Imóveis (Next.js)

## Step 1 — Inspeção e alinhamento base

- [ ] Validar ids âncoras: #imoveis, #equipe, #como, #diferenciais, #depoimentos, #faq
- [ ] Mapear componentes atuais para cada item do spec (Navbar, Hero, Properties, How, Features, Team, Stats, Testimonials, FAQ, CTA, Footer, Float/WPP, BackToTop, MobileSticky, BrokerModal, CookieBanner, ScrollReveal)

## Step 2 — Design Tokens e CSS base (OBRIGATÓRIO)

- [ ] Atualizar `app/globals.css` com tokens exatamente como no spec (incluindo `--sh`/`--sh2`, `--r*`, `--tr`)
- [ ] Garantir reset/base/scrollbar/reduced motion conforme spec
- [ ] Garantir classes/estilos necessários para Preloader e ScrollProgress

## Step 3 — Fonts & Head

- [ ] Garantir tipografias (Playfair p/ títulos, DM Sans p/ corpo)
- [ ] Incluir `<link rel="preconnect">` e `<link href="...fonts.googleapis.com...">` no `<head>` (layout.tsx)
- [ ] Manter/validar metadata e schema JSON-LD no `<head>`

## Step 4 — Preloader + ScrollProgress

- [ ] Ajustar `components/ui/Preloader.tsx` para animações e class hidden após 1.6s
- [ ] Ajustar `components/ui/ScrollProgress.tsx` para lógica e CSS conforme spec

## Step 5 — Navbar + IntersectionObserver + Mobile Drawer

- [ ] Ajustar `components/layout/Navbar.tsx` (altura, scrolled state, underline, active links por IntersectionObserver)
- [ ] Ajustar toggles theme (emoji 🌙/☀️ e botão 40x40)
- [ ] Ajustar `MobileMenu`/Drawer para bottom-up com transição e estilos do spec

## Step 6 — Seções visuais

- [ ] HeroSection (bg multicamada + textura + esferas flutuantes + badge pulsante + typewriter + visual card)
- [ ] MarqueeBand
- [ ] Properties (filtro com animação/opacity/scale e cards com badges e botão fav)
- [ ] HowItWorks (3 passos + linha conectora)
- [ ] Features (4 cards com hover e ::before)
- [ ] Team (2 brokers + tilt 3D desktop)
- [ ] Stats (4 contadores animados + IO)
- [ ] Testimonials (carousel com autoplay, swipe, dots, setas)
- [ ] FAQ accordion (um aberto por vez)
- [ ] CTA final + Redes sociais + Footer

## Step 7 — Elementos flutuantes e modais

- [ ] Floating WhatsApp (anel pulsante + tooltip)
- [ ] BackToTop (aparece após 300px)
- [ ] Mobile sticky CTA (apenas mobile)
- [ ] BrokerSelector Modal (bottom sheet com overlay e links wa.me)
- [ ] CookieBanner (localStorage accepted/declined)

## Step 8 — Scroll Reveal

- [ ] Implementar/ajustar `useScrollReveal` e aplicar `.reveal` com variações

## Step 9 — Responsividade

- [ ] Garantir breakpoints do spec (1024/768/640) e esconder nav links corretamente

## Step 10 — QA

- [ ] Rodar `npm run lint` e `npm run build`
- [ ] Validar navegação âncoras + active link
- [ ] Validar performance (sem libs externas de animação)
