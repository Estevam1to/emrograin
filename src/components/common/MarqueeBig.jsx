import { MARQUEE_ITEMS } from '../../lib/content';

export default function MarqueeBig() {
  const sep = <span className="sep"> · </span>;
  const items = MARQUEE_ITEMS.flatMap((it, i) => [
    <span key={i} className={it.out ? 'out' : undefined}>{it.text}</span>,
    <span key={`s${i}`}>{sep}</span>,
  ]);

  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="marquee-big" aria-hidden="true">
      <div className="mq">{doubled}</div>
    </div>
  );
}
