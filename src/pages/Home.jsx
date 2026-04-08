import { motion } from 'motion/react';
import { Calendar, Star, Droplets, Leaf, Quote, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-surface px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 z-10"
          >
            <span className="font-body text-xs uppercase tracking-[0.4em] text-primary/40 mb-8 block">Artisan Roastery — Est. 1924</span>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-12 uppercase">
              Be the <br /><span className="text-primary/20">Coffee.</span>
            </h1>
            <p className="text-primary/60 text-xl md:text-2xl max-w-lg mb-12 leading-relaxed font-light">
              A sensory exploration of the perfect extraction. We celebrate the slow art of the pour, served in a sanctuary of minimalist design.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/booking" className="px-10 py-5 bg-primary text-white text-xs uppercase tracking-[0.3em] font-bold hover:bg-primary/90 transition-all">
                Book Ritual
              </Link>
              <Link to="/menu" className="px-10 py-5 border border-outline text-primary text-xs uppercase tracking-[0.3em] font-bold hover:bg-primary/5 transition-all">
                Explore Menu
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-5 relative aspect-[3/4] overflow-hidden"
          >
            <img 
              alt="Artisan coffee pour" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-12 right-12 text-white mix-blend-difference">
              <span className="text-6xl font-headline italic">01</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section - High Contrast */}
      <section className="py-32 bg-primary text-white px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none mb-12">
              The Art <br />of Slow.
            </h2>
            <p className="text-xl text-white/60 leading-relaxed max-w-md">
              We believe that coffee is a bridge between moments. Our beans are sourced from heritage estates that prioritize soil health and artisanal harvesting.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white/5 p-8 flex flex-col justify-between border border-white/10">
              <span className="text-xs tracking-widest uppercase opacity-40">Origin</span>
              <p className="text-sm uppercase tracking-tight font-bold">Single Estate</p>
            </div>
            <div className="aspect-square bg-white/5 p-8 flex flex-col justify-between border border-white/10">
              <span className="text-xs tracking-widest uppercase opacity-40">Roast</span>
              <p className="text-sm uppercase tracking-tight font-bold">Small Batch</p>
            </div>
            <div className="aspect-square bg-white/5 p-8 flex flex-col justify-between border border-white/10">
              <span className="text-xs tracking-widest uppercase opacity-40">Brew</span>
              <p className="text-sm uppercase tracking-tight font-bold">Manual Pour</p>
            </div>
            <div className="aspect-square bg-white/5 p-8 flex flex-col justify-between border border-white/10">
              <span className="text-xs tracking-widest uppercase opacity-40">Vibe</span>
              <p className="text-sm uppercase tracking-tight font-bold">Minimalist</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu - Minimalist Cards */}
      <section className="py-32 bg-surface px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-24">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Signature</h2>
            <Link to="/menu" className="text-xs uppercase tracking-widest font-bold border-b border-primary pb-2">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Heirloom Latte', price: '$6.50', img: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=800' },
              { name: 'Midnight Cold', price: '$7.00', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800' },
              { name: 'Artisan Shot', price: '$4.25', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800' }
            ].map((item, i) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden mb-8 bg-surface-container">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-bold uppercase tracking-tight">{item.name}</h3>
                  <span className="text-primary/40 text-sm">{item.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
