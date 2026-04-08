export default function Card({ children, className = '' }) {
  return <div className={`rounded-3xl border border-outline-variant bg-surface shadow-sm ${className}`.trim()}>{children}</div>;
}
