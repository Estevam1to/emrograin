// Technical configuration: API endpoints, refresh rates, thresholds.
// No business text lives here — see content.js for that.

export const MARKET_CFG = {
  currencyUrl: 'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,CNY-BRL',
  yahooBase: 'https://query1.finance.yahoo.com/v8/finance/chart/',

  // Third-party CORS proxies for Yahoo Finance futures data.
  // These are free public services — for production hardening, replace with a
  // self-hosted proxy (e.g. a Cloudflare Worker or backend route) so you control
  // the trust boundary and avoid depending on third parties.
  corsProxies: [
    (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    (u) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(u)}`,
  ],

  refreshMs: 90_000,

  // Per-symbol display config (decimal places and currency prefix)
  symbols: {
    USDBRL: { dec: 4, prefix: 'R$ ' },
    EURBRL: { dec: 4, prefix: 'R$ ' },
    CNYBRL: { dec: 4, prefix: 'R$ ' },
    'ZS=F': { dec: 2, prefix: 'US¢ ' },
    'ZC=F': { dec: 2, prefix: 'US¢ ' },
  },
};

export const HEADER_OFFSET = 74; // px — compensates for fixed header on anchor scroll
export const FETCH_TIMEOUT_MS = 6_000;
export const CURRENCY_TIMEOUT_MS = 8_000;
