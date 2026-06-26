import sojaImg from '../assets/soja-campo.jpg';
import Eyebrow from '../components/ui/Eyebrow';
import Reveal from '../components/ui/Reveal';
import { useCountUp } from '../hooks/useCountUp';
import { SOBRE } from '../lib/content';

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s-8-5.5-8-11a8 8 0 0 1 16 0c0 5.5-8 11-8 11z" />
      <circle cx="12" cy="11" r="3" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const ICONS = { pin: <IconPin />, shield: <IconShield />, globe: <IconGlobe /> };

function CountUpStat({ target, unit, sub }) {
  const [ref, val] = useCountUp(target);
  return (
    <div ref={ref} className="t-num">
      {val}<span className="u">{unit}</span>
      {sub && <div className="t-lab" style={{ marginTop: 12 }}>{sub}</div>}
    </div>
  );
}

export default function Sobre() {
  const b = SOBRE;

  return (
    <section className="section-pad" id="sobre" aria-labelledby="sobre-h2">
      <div className="wrap">
        {/* Header row */}
        <div className="about-head">
          <Reveal>
            <div className="sec-head">
              <Eyebrow idx={b.eyebrow.idx}>{b.eyebrow.text}</Eyebrow>
              <h2 id="sobre-h2" className="h2">
                {b.headline}<br />{b.headlineSub}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <p className="lead">{b.lead}</p>
          </Reveal>
        </div>

        {/* Bento grid */}
        <div className="bento">
          <Reveal className="tile">
            <p className="t-k">{b.bentoStat1.label}</p>
            <div className="t-num">{b.bentoStat1.num}<span className="u">{b.bentoStat1.unit}</span></div>
            <p className="t-lab">{b.bentoStat1.sub}</p>
          </Reveal>

          <Reveal delay={1} className="tile img">
            <img
              src={sojaImg}
              alt="Lavoura de soja — vista aérea de campo verde"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
          </Reveal>

          <Reveal delay={2} className="tile feature">
            <div>
              <div className="fq">
                {b.bentoFeature.text[0]}
                <b>{b.bentoFeature.text[1]}</b>
                {b.bentoFeature.text[2]}
              </div>
            </div>
            <div className="t-foot">{b.bentoFeature.foot}</div>
          </Reveal>

          <Reveal delay={1} className="tile">
            <p className="t-k">{b.bentoStat2.label}</p>
            <CountUpStat target={b.bentoStat2.countTo} unit={b.bentoStat2.unit} sub={b.bentoStat2.sub} />
          </Reveal>
        </div>

        {/* Values */}
        <div className="values" role="list">
          {b.values.map((v) => (
            <Reveal key={v.idx} as="article" className="value" role="listitem">
              <div className="v-top">
                <span className="v-ix">{v.idx}</span>
                <div className="v-ic" aria-hidden="true">{ICONS[v.icon]}</div>
              </div>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
