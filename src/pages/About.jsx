import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-32 pb-24 px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary/40 mb-6 block">Our Story</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12 uppercase">
              Be the <br />Coffee.
            </h1>
            <p className="text-xl text-primary/60 leading-relaxed max-w-md">
              Kaphee was born from a simple obsession: the pursuit of the perfect extraction. We don't just serve coffee; we curate an experience that honors the bean, the farmer, and the ritual.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000" 
              alt="Coffee beans close up" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold uppercase tracking-tight">01. Origin</h3>
            <p className="text-primary/60 text-sm leading-relaxed">
              We source exclusively from single-origin estates that practice regenerative agriculture. Every bean is traceable to the exact plot where it was grown.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold uppercase tracking-tight">02. Roast</h3>
            <p className="text-primary/60 text-sm leading-relaxed">
              Our roasting process is a blend of science and intuition. We roast in small batches to highlight the unique flavor profile of each harvest.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold uppercase tracking-tight">03. Ritual</h3>
            <p className="text-primary/60 text-sm leading-relaxed">
              The final pour is a performance. Whether it's a precise V60 or a bold espresso, we treat every cup as a work of art.
            </p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative h-[600px] w-full overflow-hidden mb-32"
        >
          <img 
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=2000" 
            alt="Cafe interior" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center p-12">
            <h2 className="text-white text-4xl md:text-6xl font-headline italic text-center max-w-4xl">
              "Coffee is a language in itself."
            </h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
