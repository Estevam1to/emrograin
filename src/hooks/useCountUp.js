import { useRef, useState, useEffect } from 'react';

/**
 * Animates a number from 0 to `target` when the returned ref scrolls into view.
 * Returns [ref, formattedValue].
 */
export function useCountUp(target, { duration = 1500, decimals = 0 } = {}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(
    (0).toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }),
  );
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return;
        animated.current = true;
        io.unobserve(el);
        const start = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const val = target * easeOut(p);
          setDisplay(val.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, decimals]);

  return [ref, display];
}
