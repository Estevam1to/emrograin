import emblem from '../../assets/emblem.png';
import { SITE, FOOTER_COLS } from '../../lib/content';
import { scrollToHash } from '../../lib/utils';

function handleAnchor(e, href) {
  if (href.startsWith('#')) {
    e.preventDefault();
    scrollToHash(href);
  }
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap">
        <div className="footer-top">
          <div className="f-col brand">
            <a href="/" className="logo" aria-label={`${SITE.name} — início`}>
              <div className="mark">
                <img src={emblem} alt="" width="48" height="48" loading="lazy" />
              </div>
              <div className="wm">
                <span className="wordmark">
                  <span className="a">Emro</span><span className="b">Grain</span>
                </span>
                <span className="sub">Commodities</span>
              </div>
            </a>
            <p className="f-tag">{SITE.tagline}</p>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title} className="f-col">
              <h4>{col.title}</h4>
              {col.links.map(({ href, label }) => (
                <a key={label} href={href} onClick={(e) => handleAnchor(e, href)}>
                  {label}
                </a>
              ))}
            </div>
          ))}

          <div className="f-col">
            <h4>Contato</h4>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href="#contato" onClick={(e) => handleAnchor(e, '#contato')}>
              {SITE.hours}
            </a>
          </div>
        </div>

        <div className="footer-bot">
          <p className="cp">
            &copy; {year} EmroGrain Commodities. Todos os direitos reservados.
            {' '}Fotos: <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Unsplash</a>
          </p>
          <div className="soc">
            <a href={SITE.social.instagram} aria-label="Instagram" rel="noopener noreferrer" target="_blank">
              <IconInstagram />
            </a>
            <a href={SITE.social.linkedin} aria-label="LinkedIn" rel="noopener noreferrer" target="_blank">
              <IconLinkedIn />
            </a>
            <a href={SITE.social.whatsapp} aria-label="WhatsApp" rel="noopener noreferrer" target="_blank">
              <IconWhatsApp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
