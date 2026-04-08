export function cn(...classes) {
  return classes
    .flatMap((value) => value)
    .filter(Boolean)
    .join(' ');
}
