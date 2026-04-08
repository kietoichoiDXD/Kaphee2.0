import { useState } from 'react';
import { motion } from 'motion/react';

export default function CategoryFlipCard({ category, onCategoryClick, isActive = false }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="category-flip-perspective h-full" style={{ perspective: '1000px' }}>
      <motion.button
        type="button"
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
        onFocus={() => setIsFlipped(true)}
        onBlur={() => setIsFlipped(false)}
        onClick={() => onCategoryClick(category.id)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`category-flip-card group relative h-full min-h-80 w-full rounded-[28px] border bg-transparent text-left outline-none ${
          isActive ? 'border-[#8b5a2b]/60 shadow-[0_24px_60px_rgba(139,90,43,0.16)]' : 'border-[#d2b48c]/30 shadow-[0_18px_45px_rgba(0,0,0,0.08)]'
        }`}
      >
        <motion.div className="absolute inset-0 rounded-[28px] bg-[#F4F1EA] p-6" style={{ backfaceVisibility: 'hidden' }}>
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-[#8b7355]">Category {category.id}</p>
                <h3 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-tight text-[#3E2723] md:text-3xl">{category.title}</h3>
              </div>
              <span className="rounded-full border border-[#d2b48c]/40 bg-white/60 px-3 py-1 text-xs uppercase tracking-[0.25em] text-[#8b7355]">
                {category.icon}
              </span>
            </div>

            <div className="mt-8 flex flex-1 items-center justify-center rounded-[22px] border border-dashed border-[#d2b48c]/35 bg-white/55 px-6 py-8">
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#d2b48c]/35 bg-[#fffaf3] text-5xl shadow-[0_18px_35px_rgba(0,0,0,0.08)]">
                  {category.icon}
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.3em] text-[#8b7355]">Hover to flip</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#d2b48c]/25 pt-4 text-[10px] uppercase tracking-[0.16em] text-[#8b7355]">
              <span className="leading-relaxed">Vintage selection</span>
              <span className="leading-relaxed">Tap to open</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-[28px] bg-[#EAE0D5] p-6"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-[#8b7355]">Story {category.id}</p>
              <p className="mt-4 text-xl font-semibold leading-snug text-[#3E2723] md:text-2xl">{category.description}</p>
            </div>

            <div className="grid gap-3 rounded-[20px] border border-[#d2b48c]/25 bg-white/55 p-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-[#8b7355]">
                <span>{category.title}</span>
                <span>{category.items.length} items</span>
              </div>
              <div className="w-full rounded-full bg-[#3E2723] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#F4F1EA]">
                Explore
              </div>
            </div>
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}