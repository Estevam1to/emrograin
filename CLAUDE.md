# CLAUDE.md — EmroGrain Landing Page

## Project overview

Landing page institucional para a **EmroGrain Commodities**, empresa de intermediação de compra e venda de soja e milho. Apresenta cotações de mercado em tempo real, seções de produto, processo comercial, depoimentos e formulário de contato.

Stack: **React 19 + Vite 8**. Saída 100% estática (sem SSR, sem backend). Deploy como arquivos estáticos (Vercel, Netlify, Cloudflare Pages, etc.).

---

## Commands

```bash
npm run dev      # dev server (HMR)
npm run build    # produção → dist/
npm run preview  # servir o dist/ localmente
```

Não há testes automatizados nem linter configurado.

---

## Architecture

### Page structure

`App.jsx` monta a página inteira em ordem:

```
AuroraBackground   — efeito de aurora paralaxe (scroll-driven)
ScrollProgress     — barra de progresso no topo
Navbar
Ticker             — faixa de cotações deslizante
Hero               — headline + painel de mercado + stats
Sobre
MarqueeBig         — faixa animada com termos do agro
Commodities
Processo
MarqueeBig
Depoimentos
CTABand
Contato
Footer
```

Navegação: âncoras (`#sobre`, `#commodities`, `#processo`, `#depoimentos`, `#contato`). Não há router.

### Directory layout

```
src/
  sections/        # uma section = um bloco visual da página
  components/
    common/        # Navbar, Footer, Ticker, MarqueeBig, ScrollProgress
    ui/            # primitivos: Button, Chip, Eyebrow, Reveal
  hooks/           # lógica reutilizável
  lib/
    content.js     # todo o copy da página (único ponto de edição de texto)
    constants.js   # config técnica: URLs de API, refresh, símbolos
    utils.js       # helpers puros (formatação, timeoutSignal, etc.)
  styles/
    variables.css  # design tokens (CSS custom properties)
    globals.css    # reset + utilitários globais
```

---

## Content & copy

**Todo texto visível está em `src/lib/content.js`** — altere aqui sem tocar nos componentes.

Exports relevantes:

| Export | O que controla |
|---|---|
| `SITE` | Nome, e-mail, telefone, endereço, tagline, redes sociais |
| `NAV_LINKS` | Links do menu |
| `HERO` | Headline, lead, CTAs, stats do hero |
| `MARKET_PANEL` | Labels e unidades do painel de mercado |
| `TICKER_ITEMS` | Símbolos e labels do ticker |
| `SOBRE` | Texto, stats e valores da seção Sobre |
| `COMMODITIES` | Cards de soja e milho (specs, chips, imagens) |
| `PROCESSO` | Steps e banner da seção Como atuamos |
| `DEPOIMENTOS` | Citações, nomes e cargos |
| `CTA_BAND` | Texto do bloco de CTA intermediário |
| `CONTATO` | Formulário: opções de volume, textos de sucesso/legal |
| `FOOTER_COLS` | Colunas de links do rodapé |

---

## Market data (`useMarketData`)

Hook central em `src/hooks/useMarketData.js`. Busca e atualiza automaticamente:

- **Câmbio** (USD-BRL, EUR-BRL, CNY-BRL) — via [AwesomeAPI](https://economia.awesomeapi.com.br), confiável e ao vivo.
- **Futuros CBOT** (ZS=F soja, ZC=F milho) — via Yahoo Finance, roteado por CORS proxies públicos.

Configuração em `src/lib/constants.js` (`MARKET_CFG`):

```js
refreshMs: 90_000        // intervalo de atualização (ms)
corsProxies: [...]       // proxies públicos para Yahoo Finance
symbols: { ... }         // dec, prefix, buPerTon por símbolo
```

**Conversão de unidade:** CBOT publica em US¢/bushel. O hook converte para USD/tonelada usando `buPerTon`:
- Soja: `36.7437 bu/t` (60 lbs/bu)
- Milho: `39.3683 bu/t` (56 lbs/bu)

**Para produção**, substitua os `corsProxies` públicos por um proxy próprio (Cloudflare Worker, rota de backend) para controlar a fronteira de confiança e evitar dependências de terceiros.

---

## Design tokens

Definidos em `src/styles/variables.css` como CSS custom properties. Suportam:

- **Tema:** `data-theme="light"` no `<html>` — default é dark
- **Acento:** `data-accent="green"` — default é gold (`--gold`)
- **Fonte de heading:** `data-heading-font="sans"` — default é Newsreader (serif)

Paleta principal:

| Token | Uso |
|---|---|
| `--bg`, `--bg-2` | Fundo da página |
| `--surface`, `--surface-2`, `--surface-3` | Cards e painéis |
| `--accent`, `--accent-1` | Cor de destaque (gold ou green) |
| `--text`, `--text-dim`, `--text-faint` | Hierarquia de texto |
| `--line`, `--line-2`, `--line-3` | Bordas |
| `--gold`, `--green`, `--red` | Cores semânticas de mercado |

Fontes: `Newsreader` (heading), `Archivo` (body), `Space Mono` (mono/dados).

---

## Hooks

| Hook | Responsabilidade |
|---|---|
| `useMarketData` | Busca e polling de cotações de câmbio e futuros |
| `useCountUp` | Animação de contador numérico |
| `useReveal` | IntersectionObserver para animações de entrada |
| `useScrollProgress` | Progresso de scroll (0–1) para a barra do topo |
| `useMediaQuery` | Breakpoint reativo via `window.matchMedia` |

---

## Build & deploy

```bash
npm run build   # gera dist/ com assets hasheados
```

O `dist/` é auto-contido — pode ser servido por qualquer CDN estática.

Opções recomendadas (free tier suficiente para landing page):

| Plataforma | Notas |
|---|---|
| **Vercel** | Detecta Vite automaticamente; melhor DX |
| **Netlify** | Drag & drop do `dist/` ou integração GitHub |
| **Cloudflare Pages** | CDN mais rápida; builds ilimitadas no free |
| **GitHub Pages** | Gratuito; exige configurar `gh-pages` branch |

`vite.config.js` não define `base`, então o deploy deve estar na raiz do domínio. Se for num sub-path (ex: `/emogram/`), adicione `base: '/emogram/'` no config.

---

## Boas práticas para mudanças

- **Só texto/copy:** editar `src/lib/content.js`.
- **Só config de API ou mercado:** editar `src/lib/constants.js`.
- **Novo token visual:** adicionar em `variables.css`, nunca hardcodar cores nos componentes.
- **Nova seção:** criar em `src/sections/`, importar e posicionar em `App.jsx`.
- **Componente reutilizável:** `ui/` para primitivos, `common/` para blocos estruturais.
