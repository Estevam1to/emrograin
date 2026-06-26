/** Small label/tag badge. */
export default function Chip({ children, className = '' }) {
  return <span className={`chip ${className}`}>{children}</span>;
}
