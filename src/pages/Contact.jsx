import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-12 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary/40 mb-6 block">Get in Touch</span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12 uppercase">
            Let's <br />Connect.
          </h1>
          
          <div className="space-y-12 mt-16">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary/5 flex items-center justify-center text-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary/40 mb-1">Email</p>
                <p className="text-xl font-bold">hello@kaphee.coffee</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary/5 flex items-center justify-center text-primary">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary/40 mb-1">Phone</p>
                <p className="text-xl font-bold">+1 (555) 000-KAPH</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary/5 flex items-center justify-center text-primary">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary/40 mb-1">Location</p>
                <p className="text-xl font-bold">124 Artisan Alley, Vintage District</p>
              </div>
            </div>
          </div>

          <div className="flex gap-8 mt-24">
            <a href="#" className="text-primary/40 hover:text-primary transition-colors"><Instagram size={24} /></a>
            <a href="#" className="text-primary/40 hover:text-primary transition-colors"><Twitter size={24} /></a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-surface-container p-12 border border-outline-variant"
        >
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-primary/40" htmlFor="name">Name</label>
              <input 
                className="w-full bg-transparent border-b border-outline py-4 focus:border-primary outline-none transition-all font-body" 
                id="name" 
                placeholder="Your Name"
                type="text" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-primary/40" htmlFor="email">Email</label>
              <input 
                className="w-full bg-transparent border-b border-outline py-4 focus:border-primary outline-none transition-all font-body" 
                id="email" 
                placeholder="hello@example.com"
                type="email" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-primary/40" htmlFor="message">Message</label>
              <textarea 
                className="w-full bg-transparent border-b border-outline py-4 focus:border-primary outline-none transition-all font-body min-h-[150px] resize-none" 
                id="message" 
                placeholder="Tell us about your ritual..."
              />
            </div>
            <button className="w-full py-6 bg-primary text-white text-xs uppercase tracking-[0.3em] font-bold hover:bg-primary/90 transition-all">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
