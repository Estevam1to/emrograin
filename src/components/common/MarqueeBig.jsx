import { MARQUEE_ITEMS } from '../../lib/content';

export default function MarqueeBig() {
  const renderSet = (prefix) =>
    MARQUEE_ITEMS.flatMap((it, i) => [
      <span key={`${prefix}-${i}`} className={it.out ? 'out' : undefined}>{it.text}</span>,
      <span key={`${prefix}-s${i}`} className="sep"> · </span>,
    ]);

  return (
    <div className="marquee-big" aria-hidden="true">
      <div className="marquee-inner">
        <div className="mq">
          {renderSet('a')}
          {renderSet('b')}
        </div>
      </div>
    </div>
  );
}
