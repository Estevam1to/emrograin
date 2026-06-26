import { useState, useRef } from 'react';
import Eyebrow from '../components/ui/Eyebrow';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { CONTATO, SITE } from '../lib/content';

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 7L2 7" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.07 3.4 2 2 0 0 1 3.04 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
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
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="32" height="32">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Informe seu nome.';
  if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'E-mail inválido.';
  if (!fields.commodity) errors.commodity = 'Selecione uma commodity.';
  return errors;
}

export default function Contato() {
  const c = CONTATO;
  const formRef = useRef(null);
  const [fields, setFields] = useState({ name: '', email: '', commodity: '', volume: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setFields((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    // TODO: replace with backend endpoint or form service (e.g. Formspree, EmailJS)
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  };

  return (
    <section className="contact section-pad" id="contato" aria-labelledby="cont-h2">
      <div className="wrap">
        <div className="contact-grid">
          {/* Info */}
          <Reveal>
            <div className="sec-head">
              <Eyebrow idx={c.eyebrow.idx}>{c.eyebrow.text}</Eyebrow>
              <h2 id="cont-h2" className="h2" style={{ marginTop: 20 }}>{c.headline}</h2>
              <p className="lead" style={{ marginTop: 20 }}>{c.lead}</p>
            </div>
            <div className="contact-info" style={{ marginTop: 40 }}>
              <div className="c-row">
                <div className="c-ic"><IconMail /></div>
                <div>
                  <p className="c-k">E-mail</p>
                  <a href={`mailto:${SITE.email}`} className="c-v">{SITE.email}</a>
                </div>
              </div>
              <div className="c-row">
                <div className="c-ic"><IconPhone /></div>
                <div>
                  <p className="c-k">Telefone / WhatsApp</p>
                  <a href={SITE.phoneHref} className="c-v">{SITE.phone}</a>
                </div>
              </div>
              <div className="c-row">
                <div className="c-ic"><IconClock /></div>
                <div>
                  <p className="c-k">Horário de atendimento</p>
                  <p className="c-v">{SITE.hours}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={1}>
            <div className="form" role="region" aria-label="Formulário de contato">
              {sent ? (
                <div className="form-success show" role="status">
                  <div className="ok"><IconCheck /></div>
                  <h3 className="h3">{c.success.title}</h3>
                  <p className="lead" style={{ fontSize: 15 }}>{c.success.body}</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  <div className="field row2">
                    <div className={errors.name ? 'field err' : 'field'}>
                      <label htmlFor="f-name">Nome</label>
                      <input
                        id="f-name" type="text" name="name" autoComplete="name"
                        placeholder="Seu nome" value={fields.name} onChange={set('name')}
                        aria-describedby={errors.name ? 'f-name-err' : undefined}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p id="f-name-err" className="msg" role="alert">{errors.name}</p>}
                    </div>
                    <div className={errors.email ? 'field err' : 'field'}>
                      <label htmlFor="f-email">E-mail</label>
                      <input
                        id="f-email" type="email" name="email" autoComplete="email"
                        placeholder="seu@email.com" value={fields.email} onChange={set('email')}
                        aria-describedby={errors.email ? 'f-email-err' : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p id="f-email-err" className="msg" role="alert">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="field row2">
                    <div className={errors.commodity ? 'field err' : 'field'}>
                      <label htmlFor="f-commodity">Commodity</label>
                      <select
                        id="f-commodity" name="commodity" value={fields.commodity} onChange={set('commodity')}
                        aria-invalid={!!errors.commodity}
                      >
                        <option value="">Selecione…</option>
                        <option value="soja">Soja</option>
                        <option value="milho">Milho</option>
                        <option value="ambos">Soja e Milho</option>
                      </select>
                      {errors.commodity && <p className="msg" role="alert">{errors.commodity}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor="f-volume">Volume estimado</label>
                      <select id="f-volume" name="volume" value={fields.volume} onChange={set('volume')}>
                        <option value="">Selecione…</option>
                        {c.volumeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="f-msg">Mensagem <span className="muted">(opcional)</span></label>
                    <textarea
                      id="f-msg" name="message" placeholder="Conte sobre a sua safra…"
                      value={fields.message} onChange={set('message')} rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={loading} aria-busy={loading}>
                    {loading ? 'Enviando…' : c.submitLabel} {!loading && <span className="arr">→</span>}
                  </Button>
                  <p className="legal">{c.legal}</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
