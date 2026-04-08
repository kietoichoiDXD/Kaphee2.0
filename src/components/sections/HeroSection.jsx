export default function HeroSection({ title, description, actions, imageUrl }) {
  return (
    <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-primary/40">Boilerplate Section</p>
        <h1 className="text-5xl font-bold tracking-tighter uppercase leading-tight">{title}</h1>
        <p className="max-w-xl text-primary/60 leading-relaxed">{description}</p>
        {actions ? <div className="flex flex-wrap gap-4">{actions}</div> : null}
      </div>
      {imageUrl ? (
        <div className="overflow-hidden rounded-[2rem] bg-surface-container">
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        </div>
      ) : null}
    </section>
  );
}
