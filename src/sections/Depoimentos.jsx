import Eyebrow from '../components/ui/Eyebrow';
import Reveal from '../components/ui/Reveal';
import { DEPOIMENTOS } from '../lib/content';

function TestimonialCard({ item }) {
  return (
    <Reveal as="article" className={`tst${item.featured ? ' feat' : ''}`}>
      <div className="stars" aria-label="5 estrelas">★★★★★</div>
      <blockquote className="quote">"{item.quote}"</blockquote>
      <div className="who">
        <div className="av" aria-hidden="true">{item.initials}</div>
        <div>
          <p className="nm">{item.name}</p>
          <p className="rl">{item.role}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function Depoimentos() {
  const d = DEPOIMENTOS;
  return (
    <section className="section-pad" id="depoimentos" aria-labelledby="dep-h2">
      <div className="wrap">
        <Reveal className="sec-head center">
          <Eyebrow idx={d.eyebrow.idx} center>{d.eyebrow.text}</Eyebrow>
          <h2 id="dep-h2" className="h2" style={{ marginTop: 20, textAlign: 'center' }}>{d.headline}</h2>
        </Reveal>
        <div className="tst-grid">
          {d.items.map((item) => <TestimonialCard key={item.name} item={item} />)}
        </div>
      </div>
    </section>
  );
}
