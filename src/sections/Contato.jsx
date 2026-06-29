import { useState, useRef } from 'react';
import Eyebrow from '../components/ui/Eyebrow';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { CONTATO, SITE } from '../lib/content';

const WPP_NUMBER = '5599984080468';

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
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.558 4.133 1.532 5.87L.057 23.25a.75.75 0 0 0 .918.918l5.38-1.475A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5a10.452 10.452 0 0 1-5.337-1.463l-.383-.228-3.969 1.088 1.088-3.969-.228-.383A10.452 10.452 0 0 1 1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5z" />
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

function buildMessage(f) {
  return [
    'Olá! Tenho interesse em negociar com a EmroGrain.',
    `Nome: ${f.name}`,
    `E-mail: ${f.email}`,
    `Commodity: ${f.commodity}`,
    f.volume && `Volume: ${f.volume}`,
    f.message && `Mensagem: ${f.message}`,
  ].filter(Boolean).join('\n');
}

export default function Contato() {
  const c = CONTATO;
  const formRef = useRef(null);
  const wppUrlRef = useRef('');
  const emailUrlRef = useRef('');
  const [fields, setFields] = useState({ name: '', email: '', commodity: '', volume: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sentVia, setSentVia] = useState(null);

  const set = (k) => (e) => setFields((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = (via) => {
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const text = buildMessage(fields);
    wppUrlRef.current = `https://wa.me/${WPP_NUMBER}?text=${encodeURIComponent(text)}`;
    const subject = `Contato via site — ${fields.commodity}`;
    emailUrlRef.current = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

    window.open(via === 'wpp' ? wppUrlRef.current : emailUrlRef.current, '_blank', 'noopener,noreferrer');
    setSentVia(via);
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
              {sentVia ? (
                <div className="form-success show" role="status">
                  <div className="ok"><IconCheck /></div>
                  <h3 className="h3">{sentVia === 'wpp' ? 'WhatsApp aberto!' : 'E-mail pronto!'}</h3>
                  <p className="lead" style={{ fontSize: 15 }}>Se a janela não abriu, clique abaixo.</p>
                  <div className="form-actions" style={{ marginTop: 16 }}>
                    <Button variant="primary" size="lg"
                      href={sentVia === 'wpp' ? wppUrlRef.current : emailUrlRef.current}
                      target="_blank" rel="noopener noreferrer">
                      {sentVia === 'wpp'
                        ? <><IconWhatsApp /> Reabrir WhatsApp</>
                        : <><IconMail /> Reabrir e-mail</>}
                    </Button>
                  </div>
                  <a href={sentVia === 'wpp' ? emailUrlRef.current : wppUrlRef.current}
                    target="_blank" rel="noopener noreferrer" className="form-alt-link">
                    {sentVia === 'wpp' ? 'Enviar por e-mail também →' : 'Enviar pelo WhatsApp também →'}
                  </a>
                </div>
              ) : (
                <form ref={formRef} noValidate>
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

                  <div className="form-actions">
                    <Button variant="primary" size="lg" onClick={() => submit('wpp')}>
                      <IconWhatsApp /> Enviar pelo WhatsApp
                    </Button>
                    <Button variant="ghost" size="lg" onClick={() => submit('email')}>
                      <IconMail /> Enviar por e-mail
                    </Button>
                  </div>
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
