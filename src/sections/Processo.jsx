import Eyebrow from '../components/ui/Eyebrow';
import Chip from '../components/ui/Chip';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { PROCESSO } from '../lib/content';

function IconArrows() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 16l-4-4 4-4" /><path d="M3 12h18" /><path d="M17 8l4 4-4 4" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  );
}
function IconWarehouse() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M3 10l9-7 9 7M4 21V10M20 21V10M9 21v-5h6v5" />
    </svg>
  );
}
const ICONS = { arrows: <IconArrows />, clock: <IconClock />, warehouse: <IconWarehouse /> };

export default function Processo() {
  const p = PROCESSO;
  return (
    <section className="process section-pad" id="processo" aria-labelledby="proc-h2">
      <div className="wrap">
        <div className="proc-grid">
          {/* Left sticky column */}
          <div className="proc-sticky">
            <Reveal>
              <Eyebrow idx={p.eyebrow.idx}>{p.eyebrow.text}</Eyebrow>
              <h2 id="proc-h2" className="h2" style={{ marginTop: 20 }}>{p.headline}</h2>
              <p className="lead" style={{ marginTop: 20 }}>{p.lead}</p>
              <Button href="#contato" style={{ marginTop: 36 }}>
                {p.ctaLabel} <span className="arr">→</span>
              </Button>
            </Reveal>
          </div>

          {/* Right steps */}
          <div className="proc-list">
            {p.steps.map((step, i) => (
              <Reveal key={step.idx} delay={i % 3} as="article" className="proc-item">
                <div className="p-body">
                  <div className="p-ic">{ICONS[step.icon]}</div>
                  <h3 className="h3">{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Banner */}
        <Reveal>
          <div className="flex-banner">
            <div className="fb-txt">
              <h3>{p.banner.title}</h3>
              <p>{p.banner.body}</p>
              <div className="chips" style={{ marginTop: 20 }}>
                {p.banner.chips.map((c) => <Chip key={c}>{c}</Chip>)}
              </div>
            </div>
            <Button href="#contato">
              {p.banner.cta} <span className="arr">→</span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
