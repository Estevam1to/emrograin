import { useRef, useEffect } from 'react';
import { useMarketData } from './hooks/useMarketData';
import ScrollProgress from './components/common/ScrollProgress';
import Navbar from './components/common/Navbar';
import Ticker from './components/common/Ticker';
import MarqueeBig from './components/common/MarqueeBig';
import Footer from './components/common/Footer';
import Hero from './sections/Hero';
import Sobre from './sections/Sobre';
import Commodities from './sections/Commodities';
import Processo from './sections/Processo';
import Depoimentos from './sections/Depoimentos';
import CTABand from './sections/CTABand';
import Contato from './sections/Contato';

function AuroraBackground() {
  const a1 = useRef(null);
  const a2 = useRef(null);

  useEffect(() => {
    let raf;
    const clamp = (v, mn, mx) => Math.min(mx, Math.max(mn, v));

    const onScroll = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      if (a1.current) a1.current.style.transform = `translateY(${clamp(p * 80, 0, 80)}px)`;
      if (a2.current) a2.current.style.transform = `translateY(${clamp(-p * 60, -60, 0)}px)`;
    };

    const tick = () => { onScroll(); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="bg-field" aria-hidden="true">
      <div className="aurora a1" ref={a1} />
      <div className="aurora a2" ref={a2} />
    </div>
  );
}

export default function App() {
  const { prices, heroUSD } = useMarketData();

  return (
    <>
      <AuroraBackground />
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero heroUSD={heroUSD} prices={prices} />
        <Ticker prices={prices} />
        <Sobre />
        <MarqueeBig />
        <Commodities />
        <Processo />
        <MarqueeBig />
        <Depoimentos />
        <CTABand />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
