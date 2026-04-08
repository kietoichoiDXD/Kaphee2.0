import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ArtOfSlowSection from '../components/sections/ArtOfSlowSection';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-surface px-12">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/raincf.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Rain coffee background"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/35 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 z-10"
          >
            <span className="font-body text-xs uppercase tracking-[0.4em] text-white/70 mb-8 block">Artisan Roastery — Est. 1924</span>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-12 uppercase text-white">
              Be the <br /><span className="text-white/70">Coffee.</span>
            </h1>
            <p className="text-white/85 text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed font-light">
              A sensory exploration of the perfect extraction. We celebrate the slow art of the pour, served in a sanctuary of minimalist design.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/booking"
                data-magnetic
                data-cursor-label="Book"
                className="px-10 py-5 bg-white text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-white/90 transition-all"
              >
                Book Ritual
              </Link>
              <Link
                to="/menu"
                data-magnetic
                data-cursor-label="Menu"
                className="px-10 py-5 border border-white/60 text-white text-xs uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-all"
              >
                Explore Menu
              </Link>
            </div>
          </motion.div>
          <div className="hidden lg:block lg:col-span-4" />
        </div>
      </section>

      <ArtOfSlowSection />

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
                <div className="aspect-4/5 overflow-hidden mb-8 bg-surface-container">
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
