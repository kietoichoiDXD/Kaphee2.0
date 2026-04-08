import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { BookOpen, Layers3, Sparkles } from 'lucide-react';

const artCards = [
  {
    id: 'brew',
    label: 'Brew Notes',
    title: 'Slow extraction',
    note: 'Paper grain, soft shadows, and layered motion make the card feel hand-composed.',
    accent: 'from-[#f3e7d3] via-[#f9f4eb] to-[#ece0cd]',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'roast',
    label: 'Field Study',
    title: 'Heritage roast',
    note: 'Magazine-style framing and floating copy blocks keep the section editorial.',
    accent: 'from-[#e6ded1] via-[#f4eee5] to-[#dad0c2]',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'ritual',
    label: 'Flash Card',
    title: 'Daily ritual',
    note: 'Clicking a card lifts it forward like a collectible flash card with a paper-cut edge.',
    accent: 'from-[#f0e3cf] via-[#faf2e5] to-[#e7d5bb]',
    image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1200',
  },
];

function ArtCard({ card, active, onActivate, index }) {
  return (
    <motion.button
      type="button"
      onClick={() => onActivate(card.id)}
      whileHover={{ y: -8, rotate: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full text-left outline-none transition-transform ${
        active ? 'z-20' : 'z-10'
      }`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className={`magazine-card relative overflow-hidden rounded-4xl border border-black/10 bg-linear-to-br ${card.accent} p-4 shadow-[0_24px_70px_rgba(0,0,0,0.18)] transition-all duration-500 ${
          active ? 'scale-[1.03]' : index === 0 ? '-rotate-2' : index === 2 ? 'rotate-2' : 'rotate-0'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 paper-noise opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.65),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.06),transparent_28%)]" />

        <div className="relative flex items-center justify-between gap-4 border-b border-black/10 pb-3">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-black/45">{card.label}</p>
            <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight text-black">{card.title}</h3>
          </div>
          <span className="font-mono text-sm text-black/45">0{index + 1}</span>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-3xl border border-black/10 bg-white/55">
          <div className="absolute inset-0 art-frame-overlay" />
          <img
            src={card.image}
            alt={card.title}
            className={`art-image h-72 w-full object-cover transition-all duration-700 ${
              active ? 'scale-105 saturate-125 contrast-110' : 'grayscale-[0.2] saturate-90'
            }`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-black/55 via-black/10 to-transparent p-4 text-white">
            <span className="text-xs uppercase tracking-[0.35em] text-white/70">Interactive print</span>
            <span className="text-xs font-mono text-white/80">tap to pin</span>
          </div>
        </div>

        <div className="relative mt-4 flex items-start gap-3 rounded-[1.25rem] border border-black/10 bg-white/55 p-4">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-black/45" />
          <p className="text-sm leading-relaxed text-black/72">{card.note}</p>
        </div>
      </div>
    </motion.button>
  );
}

export default function ArtOfSlowSection() {
  const [activeCardId, setActiveCardId] = useState(artCards[0].id);

  const activeCard = useMemo(
    () => artCards.find((card) => card.id === activeCardId) ?? artCards[0],
    [activeCardId],
  );

  return (
    <section className="relative overflow-hidden bg-[#120f0c] px-6 py-20 text-white sm:px-10 lg:px-12 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -left-32 -top-24 h-96 w-96 rounded-full bg-[#c89a62]/20 blur-3xl" />
        <div className="absolute -right-24 top-32 h-80 w-80 rounded-full bg-[#f4d9b1]/10 blur-3xl" />
        <div className="absolute inset-0 grain-overlay opacity-15" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <BookOpen className="h-4 w-4 text-[#f4d9b1]" />
            <span className="text-[0.68rem] uppercase tracking-[0.45em] text-white/70">The Art of Slow</span>
          </div>

          <div className="space-y-6">
            <p className="max-w-xl text-sm uppercase tracking-[0.4em] text-white/35">Editorial layering, tactile paper, and interactive print motion</p>
            <h2 className="max-w-2xl text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
              The Art <span className="text-[#f4d9b1]">of Slow.</span>
            </h2>
            <p className="max-w-xl text-base leading-8 text-white/68 sm:text-lg">
              Inspired by the feel of hand-drawn motion studies, this section uses paper texture, stacked prints, and magazine framing to make the coffee ritual feel collectible.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: 'Paper grain', value: 'Soft shadow + texture' },
              { title: 'Magazine stack', value: 'Layered editorial cards' },
              { title: 'Flash card mode', value: 'Tap to bring forward' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/12 bg-white/6 p-5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.35em] text-white/35">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute left-4 top-4 hidden rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-white/55 backdrop-blur-sm sm:block">
            Magazine spread
          </div>
          <div className="absolute right-4 top-4 hidden rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-white/55 backdrop-blur-sm sm:block">
            Tap a card
          </div>

          <div className="relative mx-auto max-w-2xl rounded-[36px] border border-white/10 bg-white/5 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] magazine-glow" />
            <div className="relative grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-4">
                <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[0.65rem] uppercase tracking-[0.4em] text-white/45">
                    <span>Editor’s note</span>
                    <span>{activeCard.id.toUpperCase()}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    Each card behaves like a torn magazine insert. Hovering adds a slight lift; clicking pins the selected print in front.
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-4">
                  <div className="flex items-center gap-3 text-[#f4d9b1]">
                    <Layers3 className="h-4 w-4" />
                    <span className="text-[0.65rem] uppercase tracking-[0.4em]">Current print</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-2xl font-semibold uppercase tracking-tight text-white">{activeCard.title}</p>
                    <p className="text-sm leading-7 text-white/68">{activeCard.note}</p>
                  </div>
                </div>
              </div>

              <div className="relative flex min-h-120 flex-col justify-between overflow-hidden rounded-4xl border border-white/10 bg-[#191410] p-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_48%)]" />
                <div className="relative z-10 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.4em] text-white/45">
                  <span>Flash Card</span>
                  <span>01 / 03</span>
                </div>
                <div className="relative z-10 mt-4 flex-1">
                  <div className="flex h-full items-center justify-center">
                    <motion.div
                      key={activeCard.id}
                      initial={{ opacity: 0, rotate: -6, scale: 0.96 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      transition={{ duration: 0.45 }}
                      className="w-full max-w-[18rem]"
                    >
                      <div className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#f5ead9] via-[#efe0c6] to-[#e2cfaf] p-3 text-[#15110d] shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                        <div className="rounded-[1.2rem] border border-black/10 bg-white/75 p-3">
                          <p className="text-[0.65rem] uppercase tracking-[0.45em] text-black/45">Flash card</p>
                          <p className="mt-3 text-2xl font-bold uppercase tracking-tight">{activeCard.title}</p>
                          <p className="mt-2 text-sm leading-6 text-black/65">Tap a card to swap the featured print.</p>
                        </div>
                        <div className="mt-3 overflow-hidden rounded-[1.1rem]">
                          <img
                            src={activeCard.image}
                            alt={activeCard.title}
                            className="art-image h-44 w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                <div className="relative z-10 flex items-end justify-between gap-4 text-white/50">
                  <span className="text-xs uppercase tracking-[0.35em]">Collectible print</span>
                  <span className="font-mono text-xs">{activeCard.label}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {artCards.map((card, index) => (
              <ArtCard key={card.id} card={card} active={card.id === activeCardId} onActivate={setActiveCardId} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
