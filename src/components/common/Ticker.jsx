import { useState } from 'react';
import { TICKER_ITEMS } from '../../lib/content';

function TickerItem({ name, val, chg, dir }) {
  return (
    <div className="ti">
      <span className="ti-name">{name}</span>
      <span className="ti-val">{val}</span>
      <span className={`ti-chg ${dir}`}>{chg}</span>
    </div>
  );
}

export default function Ticker({ prices }) {
  const [paused, setPaused] = useState(false);

  const items = TICKER_ITEMS.map(({ sym, label }) => ({
    name: label,
    ...(prices?.[sym] ?? { val: '—', chg: '—', dir: 'ind' }),
  }));

  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className={`ticker${paused ? ' paused' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Cotações ao vivo"
    >
      <div className="track">
        {doubled.map((it, i) => (
          <TickerItem key={i} {...it} />
        ))}
      </div>
    </div>
  );
}
