import { scrollToHash } from '../../lib/utils';

/**
 * Polymorphic button — renders <button> or <a> depending on `href`.
 * variant: 'primary' | 'ghost'
 * size: 'sm' | 'md' | 'lg'
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) {
  const cls = [
    'btn',
    `btn-${variant}`,
    size !== 'md' && `btn-${size}`,
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      scrollToHash(href);
    }
    onClick?.(e);
  };

  if (href) {
    return (
      <a href={href} className={cls} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
