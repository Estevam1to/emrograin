import Eyebrow from '../components/ui/Eyebrow';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { HERO, MARKET_PANEL } from '../lib/content';

function PriceCard({ usd }) {
  return (
    <div className="price-card">
      <div className="pc-top">
        <span className="pc-tk">USD-BRL</span>
        <span className="pc-dot" />
      </div>
      <div className={`pc-val ${usd.live ? '' : 'muted'}`}>{usd.val}</div>
      <div className="pc-meta">
        <span className={`pc-chg ${usd.dir === 'up' ? 'pc-up' : usd.dir === 'dn' ? 'pc-dn' : 'muted'}`}>
          {usd.chg}
        </span>
        <span className="muted">{usd.note}</span>
      </div>
    </div>
  );
}

function MarketRow({ label, val, chg, dir }) {
  return (
    <div className="ti">
      <span className="ti-name">{label}</span>
      <span className="ti-val">{val}</span>
      <span className={`ti-chg ${dir}`}>{chg}</span>
    </div>
  );
}

export default function Hero({ heroUSD, prices }) {
  return (
    <section className="hero" id="hero" aria-label="Apresentação">
      <div className="wrap hero-grid">
        {/* Copy */}
        <div className="hero-copy">
          <Reveal>
            <Eyebrow idx={HERO.eyebrow.idx}>{HERO.eyebrow.text}</Eyebrow>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="display">
              {HERO.headline}
              <br />
              {HERO.headlineEmPrefix}
              <em className="em">{HERO.headlineEm}</em>
              {HERO.headlineSuffix}
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="lead">{HERO.lead}</p>
          </Reveal>
          <Reveal delay={3}>
            <div className="hero-actions">
              <Button href={HERO.cta.href} size="lg">
                {HERO.cta.label} <span className="arr">→</span>
              </Button>
              <Button href={HERO.ctaSecondary.href} variant="ghost" size="lg">
                {HERO.ctaSecondary.label}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={4}>
            <div className="hero-strip">
              {HERO.stats.map((s) => (
                <div key={s.label} className="hs">
                  <span className="hs-num">
                    {s.num}<span className="u">{s.unit}</span>
                  </span>
                  <span className="hs-lab">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Market panel */}
        <Reveal delay={2} className="hero-visual">
          <div className="mkt-panel ticks">
            <div className="mkt-head">
              <span className="mh-l">{MARKET_PANEL.heading}</span>
              <span className="mkt-live">
                <span className="dot" aria-hidden="true" />
                Ao vivo
              </span>
            </div>

            <PriceCard usd={heroUSD} />

            <div className="mkt-rows">
              {MARKET_PANEL.rows.map(({ sym, label }) => (
                <MarketRow
                  key={sym}
                  label={label}
                  val={prices?.[sym]?.val ?? '—'}
                  chg={prices?.[sym]?.chg ?? '—'}
                  dir={prices?.[sym]?.dir ?? 'ind'}
                />
              ))}
            </div>

            <div className="mkt-foot">{MARKET_PANEL.footer}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
