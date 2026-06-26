import { useState } from 'react';
import { TICKER_ITEMS } from '../../lib/content';

function TickerItem({ name, unit, val, chg, dir }) {
  return (
    <div className="ti">
      <span className="ti-name">{name}</span>
      <span className="ti-val">{val}</span>
      {unit && <span className="ti-unit">{unit}</span>}
      <span className={`ti-chg ${dir}`}>{chg}</span>
    </div>
  );
}

export default function Ticker({ prices }) {
  const [paused, setPaused] = useState(false);

  const items = TICKER_ITEMS.map(({ sym, label, unit }) => ({
    name: label,
    unit,
    ...(prices?.[sym] ?? { val: '—', chg: '—', dir: 'ind' }),
  }));

  return (
    <div
      className={`ticker${paused ? ' paused' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Cotações ao vivo"
    >
      <div className="ticker-inner">
        <div className="track">
          {items.map((it, i) => <TickerItem key={`a-${i}`} {...it} />)}
          {items.map((it, i) => <TickerItem key={`b-${i}`} {...it} />)}
        </div>
      </div>
    </div>
  );
}
