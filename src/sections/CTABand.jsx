import Eyebrow from '../components/ui/Eyebrow';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { CTA_BAND } from '../lib/content';

export default function CTABand() {
  const c = CTA_BAND;
  return (
    <section className="cta-band section-pad" aria-label="Chamada para ação">
      <div className="wrap">
        <Reveal className="cta-inner">
          <Eyebrow center>{c.eyebrow}</Eyebrow>
          <h2 className="h2">{c.headline}</h2>
          <p className="lead">{c.lead}</p>
          <div className="cta-actions">
            <Button href={c.cta.href} size="lg">
              {c.cta.label} <span className="arr">→</span>
            </Button>
            <Button href={c.ctaSecondary.href} variant="ghost" size="lg">
              {c.ctaSecondary.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
