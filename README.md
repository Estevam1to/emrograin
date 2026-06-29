# EmroGrain Commodities — Landing Page

Landing page institucional da **EmroGrain Commodities**, empresa de intermediação de compra e venda de soja e milho. Apresenta cotações de mercado em tempo real, seções de produto, processo comercial, depoimentos e formulário de contato.

🔗 **Produção:** https://emrograincommodities.com.br/

## Stack

React 19 + Vite 8. Saída 100% estática (sem SSR, sem backend).

## Comandos

```bash
npm install
npm run dev      # dev server (HMR)
npm run build    # produção → dist/
npm run preview  # servir o dist/ localmente
```

## Estrutura

```
src/
  sections/    # blocos visuais da página
  components/  # common/ (Navbar, Footer, Ticker…) e ui/ (Button, Chip…)
  hooks/       # useMarketData, useReveal, useCountUp…
  lib/         # content.js (todo o copy), constants.js, utils.js
  styles/      # variables.css (design tokens), globals.css
```

- **Editar textos:** `src/lib/content.js`
- **Config de API/mercado:** `src/lib/constants.js`
- **Tokens visuais:** `src/styles/variables.css`

Detalhes de arquitetura, cotações de mercado e deploy em [`CLAUDE.md`](./CLAUDE.md).

## Deploy

`dist/` é auto-contido — servível por qualquer CDN estática. Atualmente no Cloudflare Pages (config em `wrangler.jsonc`).
