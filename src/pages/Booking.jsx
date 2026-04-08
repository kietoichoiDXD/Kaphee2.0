import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function Booking() {
  return (
    <main className="pt-32 pb-24 px-12 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-primary/40 mb-8 block">Reservations</span>
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] uppercase mb-12">
            Book <br /><span className="text-primary/20">Ritual.</span>
          </h1>
          <p className="text-primary/60 text-xl leading-relaxed max-w-md mb-12">
            Secure your place in our sanctuary of slow coffee. We hold tables for 15 minutes. For groups larger than 6, please connect with us directly.
          </p>
          
          <div className="aspect-square w-full overflow-hidden bg-surface-container border border-outline-variant">
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000" 
              alt="Cafe table" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 bg-surface-container p-12 border border-outline-variant"
        >
          <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-primary/40" htmlFor="name">Full Name</label>
                <input 
                  className="w-full bg-transparent border-b border-outline py-4 focus:border-primary outline-none transition-all font-body" 
                  id="name" 
                  placeholder="Johnathan Doe"
                  type="text" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-primary/40" htmlFor="phone">Phone</label>
                <input 
                  className="w-full bg-transparent border-b border-outline py-4 focus:border-primary outline-none transition-all font-body" 
                  id="phone" 
                  placeholder="+1 (555) 000-0000"
                  type="tel" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-primary/40" htmlFor="date">Date</label>
                <input 
                  className="w-full bg-transparent border-b border-outline py-4 focus:border-primary outline-none transition-all font-body" 
                  id="date" 
                  type="date" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-primary/40" htmlFor="time">Time</label>
                <input 
                  className="w-full bg-transparent border-b border-outline py-4 focus:border-primary outline-none transition-all font-body" 
                  id="time" 
                  type="time" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-primary/40" htmlFor="guests">Guests</label>
                <select className="w-full bg-transparent border-b border-outline py-4 focus:border-primary outline-none transition-all font-body appearance-none" id="guests">
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="4">4 People</option>
                  <option value="6">6 People</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-primary/40" htmlFor="occasion">Occasion</label>
                <input 
                  className="w-full bg-transparent border-b border-outline py-4 focus:border-primary outline-none transition-all font-body" 
                  id="occasion" 
                  placeholder="Optional"
                  type="text" 
                />
              </div>
            </div>

            <button className="w-full py-6 bg-primary text-white text-xs uppercase tracking-[0.3em] font-bold hover:bg-primary/90 transition-all flex justify-center items-center gap-4">
              Confirm Reservation
              <ChevronRight size={16} />
            </button>
          </form>

          <div className="mt-16 pt-16 border-t border-outline-variant flex justify-between items-center">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary/40 mb-1">Support</p>
              <p className="font-bold">+1 (555) VINTAGE</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-primary/40 mb-1">Hours</p>
              <p className="font-bold">07:00 — 21:00</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
