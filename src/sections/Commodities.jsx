import sojaImg from '../assets/soja-grao.jpg';
import milhoImg from '../assets/milho-grao.jpg';
import Eyebrow from '../components/ui/Eyebrow';
import Chip from '../components/ui/Chip';
import Reveal from '../components/ui/Reveal';
import { COMMODITIES } from '../lib/content';

const IMGS = { soja: sojaImg, milho: milhoImg };

function CommodityCard({ item }) {
  return (
    <Reveal as="article" className="commodity">
      <div className="commodity-img">
        <img
          src={IMGS[item.slug]}
          alt={item.imgAlt}
          loading="lazy"
        />
      </div>
      <div className="c-body">
        <div className="c-top">
          <span className="c-tag">{item.tag}</span>
          <span className="c-mkt">{item.market}</span>
        </div>
        <h3>{item.name}</h3>
        <p>{item.body}</p>
        <dl className="specs">
          {item.specs.map(({ k, v }) => (
            <div key={k} className="spec">
              <dt className="sk">{k}</dt>
              <dd className="sv">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="chips">
          {item.chips.map((c) => <Chip key={c}>{c}</Chip>)}
        </div>
      </div>
    </Reveal>
  );
}

export default function Commodities() {
  const c = COMMODITIES;
  return (
    <section className="section-pad" id="commodities" aria-labelledby="comm-h2">
      <div className="wrap">
        <Reveal className="sec-head center">
          <Eyebrow idx={c.eyebrow.idx} center>{c.eyebrow.text}</Eyebrow>
          <h2 id="comm-h2" className="h2" style={{ marginTop: 20, textAlign: 'center' }}>{c.headline}</h2>
          <p className="lead" style={{ textAlign: 'center', marginInline: 'auto' }}>{c.lead}</p>
        </Reveal>
        <div className="commodity-grid">
          {c.items.map((item) => <CommodityCard key={item.slug} item={item} />)}
        </div>
      </div>
    </section>
  );
}
