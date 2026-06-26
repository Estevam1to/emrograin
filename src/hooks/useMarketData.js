import { useState, useEffect, useRef } from 'react';
import { MARKET_CFG } from '../lib/constants';
import { fmtBR, timeoutSignal } from '../lib/utils';

function initialPrices() {
  return {
    USDBRL: { val: 'R$ 5,0000',     chg: '▲ 0,00%',   dir: 'up'  },
    EURBRL: { val: 'R$ 5,4000',     chg: '▲ 0,00%',   dir: 'up'  },
    CNYBRL: { val: 'R$ 0,7000',     chg: '▲ 0,00%',   dir: 'up'  },
    'ZS=F': { val: 'US¢ 1.050,00',  chg: 'indicativo', dir: 'ind' },
    'ZC=F': { val: 'US¢ 445,00',    chg: 'indicativo', dir: 'ind' },
  };
}

function buildVal(sym, price) {
  const { prefix, dec } = MARKET_CFG.symbols[sym];
  return prefix + fmtBR(price, dec);
}

function buildChg(pct) {
  const up = pct >= 0;
  return { chg: (up ? '▲ ' : '▼ ') + fmtBR(Math.abs(pct), 2) + '%', dir: up ? 'up' : 'dn' };
}

async function fetchText(url, ms) {
  const { signal, clear } = timeoutSignal(ms);
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clear();
  }
}

async function fetchCurrencies() {
  const text = await fetchText(MARKET_CFG.currencyUrl, 8_000);
  const json = JSON.parse(text);
  return ['USDBRL', 'EURBRL', 'CNYBRL'].flatMap((sym) => {
    if (!json[sym]) return [];
    const price = parseFloat(json[sym].bid);
    const pct   = parseFloat(json[sym].pctChange);
    return [{ sym, price, pct }];
  });
}

async function fetchYahoo(symbol) {
  const target = MARKET_CFG.yahooBase + encodeURIComponent(symbol);
  for (const proxy of MARKET_CFG.corsProxies) {
    try {
      const text = await fetchText(proxy(target), 6_000);
      const json = JSON.parse(text);
      const meta = json?.chart?.result?.[0]?.meta;
      if (meta?.regularMarketPrice != null) {
        const prev = meta.previousClose ?? meta.chartPreviousClose;
        const pct  = prev ? ((meta.regularMarketPrice - prev) / prev) * 100 : 0;
        return { sym: symbol, price: meta.regularMarketPrice, pct };
      }
    } catch {
      // try next proxy
    }
  }
  throw new Error(`Yahoo fetch failed: ${symbol}`);
}

/**
 * Fetches and auto-refreshes live commodity + currency prices.
 *
 * Returns:
 *   prices   – map of symbol → { val, chg, dir }
 *   heroUSD  – extended USD-BRL data for the hero card
 */
export function useMarketData() {
  const [prices, setPrices] = useState(initialPrices);
  const [heroUSD, setHeroUSD] = useState({
    val: 'R$ 5,0000',
    chg: '+0,00%',
    dir: 'up',
    note: 'USD-BRL · carregando…',
    live: false,
  });
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    async function refresh() {
      // 1. Currencies (reliable, live)
      let usdOk = false;
      try {
        const currencies = await fetchCurrencies();
        if (!mounted.current) return;
        currencies.forEach(({ sym, price, pct }) => {
          const { chg, dir } = buildChg(pct);
          setPrices((prev) => ({ ...prev, [sym]: { val: buildVal(sym, price), chg, dir } }));
          if (sym === 'USDBRL') {
            const up  = pct >= 0;
            const hh  = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            setHeroUSD({
              val: buildVal('USDBRL', price),
              chg: (up ? '+' : '') + fmtBR(pct, 2) + '%',
              dir: up ? 'up' : 'dn',
              note: `USD-BRL · ao vivo ${hh}`,
              live: true,
            });
            usdOk = true;
          }
        });
      } catch {
        // keep indicative defaults
      }

      if (!usdOk && mounted.current) {
        setHeroUSD((prev) => ({ ...prev, note: 'USD-BRL · indicativo', live: false }));
      }

      // 2. CBOT futures (best-effort, via CORS proxies)
      for (const sym of ['ZS=F', 'ZC=F']) {
        try {
          const { price, pct } = await fetchYahoo(sym);
          if (!mounted.current) return;
          const { chg, dir } = buildChg(pct);
          setPrices((prev) => ({ ...prev, [sym]: { val: buildVal(sym, price), chg, dir } }));
        } catch {
          // keep indicative label
        }
      }
    }

    refresh();
    const id = setInterval(refresh, MARKET_CFG.refreshMs);
    return () => { mounted.current = false; clearInterval(id); };
  }, []);

  return { prices, heroUSD };
}
