export default function Button({ as: Component = 'button', className = '', variant = 'primary', ...props }) {
  const baseClassName = 'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all';
  const variantClassName =
    variant === 'secondary'
      ? 'border border-outline bg-transparent text-primary hover:bg-primary/5'
      : 'bg-primary text-white hover:bg-primary/90';

  return <Component className={`${baseClassName} ${variantClassName} ${className}`.trim()} {...props} />;
}
