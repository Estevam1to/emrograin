import { HEADER_OFFSET } from './constants';

/** Format a number with pt-BR locale. */
export function fmtBR(n, dec) {
  return Number(n).toLocaleString('pt-BR', {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}

/** Smooth-scroll to a hash target, accounting for the fixed header height. */
export function scrollToHash(href) {
  if (!href || href.length < 2) return;
  const el = document.querySelector(href);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

/** Abort-signal helper: returns a signal that auto-aborts after `ms`. */
export function timeoutSignal(ms) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  return { signal: ctrl.signal, clear: () => clearTimeout(id) };
}

/** Clamp a number between min and max. */
export function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}
