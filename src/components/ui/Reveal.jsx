import { useReveal } from '../../hooks/useReveal';

/**
 * Polymorphic scroll-reveal wrapper.
 * Adds `reveal` + `in` classes for the CSS transition.
 * `delay`: 0 | 1 | 2 | 3 | 4
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const [ref, inView] = useReveal();

  const cls = [
    'reveal',
    delay > 0 && `d${delay}`,
    inView && 'in',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag ref={ref} className={cls} {...rest}>
      {children}
    </Tag>
  );
}
