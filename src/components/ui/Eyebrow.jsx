/** Section eyebrow label with optional index and center alignment. */
export default function Eyebrow({ idx, children, center = false, className = '' }) {
  return (
    <p className={`eyebrow${center ? ' center' : ''} ${className}`}>
      {idx && <span className="idx">{idx}</span>}
      {children}
    </p>
  );
}
