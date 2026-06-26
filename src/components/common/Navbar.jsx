import { useState, useEffect } from 'react';
import emblem from '../../assets/emblem.png';
import Button from '../ui/Button';
import { NAV_LINKS, SITE } from '../../lib/content';
import { scrollToHash } from '../../lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToHash(href), open ? 320 : 0);
  };

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} role="banner">
        <div className="wrap">
          <a href="/" className="logo" aria-label={`${SITE.name} — página inicial`}>
            <div className="mark">
              <img src={emblem} alt="" width="68" height="68" loading="eager" fetchpriority="high" />
            </div>
            <div className="wm">
              <span className="wordmark">
                <span className="a">Emro</span><span className="b">Grain</span>
              </span>
              <span className="sub">Commodities</span>
            </div>
          </a>

          <nav className="nav" aria-label="Navegação principal">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={(e) => handleNavClick(e, href)}>
                {label}
              </a>
            ))}
          </nav>

          <div className="header-cta">
            <Button href="#contato" size="sm" onClick={(e) => handleNavClick(e, '#contato')}>
              Falar com o comercial
            </Button>
            <button
              className={`burger${open ? ' open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <nav
        id="mobile-menu"
        className={`mobile-menu${open ? ' open' : ''}`}
        aria-hidden={!open}
        aria-label="Menu mobile"
      >
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} onClick={(e) => handleNavClick(e, href)} tabIndex={open ? 0 : -1}>
            {label}
          </a>
        ))}
        <Button href="#contato" onClick={(e) => handleNavClick(e, '#contato')} tabIndex={open ? 0 : -1}>
          Falar com o comercial
        </Button>
      </nav>
    </>
  );
}
