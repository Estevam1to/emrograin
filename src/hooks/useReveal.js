import { useRef, useState, useEffect } from 'react';

/**
 * Triggers a one-shot in-view detection via IntersectionObserver.
 * Returns [ref, inView] — attach ref to the target element.
 */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px', ...options },
    );
    io.observe(el);

    // Safety: reveal elements already visible on mount (e.g. background tab)
    const t = setTimeout(() => {
      if (el && el.getBoundingClientRect().top < window.innerHeight) setInView(true);
    }, 200);

    return () => { io.disconnect(); clearTimeout(t); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, inView];
}
