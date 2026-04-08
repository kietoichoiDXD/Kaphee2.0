export default function FeatureSection({ title = 'Features', items = [] }) {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-3xl font-bold uppercase tracking-tight">{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-3xl border border-outline-variant bg-surface-container p-6">
            <h3 className="mb-3 text-xl font-semibold uppercase tracking-tight">{item.title}</h3>
            <p className="text-sm leading-relaxed text-primary/60">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
