import { Link } from 'react-router-dom';
import { Share2, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 bg-secondary text-surface">
      <div className="col-span-1">
        <span className="font-headline text-3xl italic mb-6 block">Kaphee</span>
        <p className="font-body text-sm tracking-wide text-surface/70 leading-relaxed uppercase">
          Handcrafted for your daily ritual. Preserving the vintage art of the pour since 1924.
        </p>
      </div>
      <div>
        <h4 className="font-body text-sm tracking-widest uppercase font-bold mb-6 text-white">Opening Hours</h4>
        <ul className="space-y-3 font-body text-sm text-surface/70">
          <li>Mon — Fri: 07:00 – 19:00</li>
          <li>Sat: 08:00 – 21:00</li>
          <li>Sun: 09:00 – 17:00</li>
        </ul>
      </div>
      <div>
        <h4 className="font-body text-sm tracking-widest uppercase font-bold mb-6 text-white">Address</h4>
        <address className="not-italic space-y-3 font-body text-sm text-surface/70">
          124 Artisan Alley<br />
          Vintage District<br />
          Old Town, OT 9402
        </address>
      </div>
      <div>
        <h4 className="font-body text-sm tracking-widest uppercase font-bold mb-6 text-white">Quick Links</h4>
        <ul className="space-y-3">
          <li><Link to="/menu" className="text-surface/70 hover:text-white transition-all text-sm uppercase tracking-wide">About Our Roast</Link></li>
          <li><a href="#" className="text-surface/70 hover:text-white transition-all text-sm uppercase tracking-wide">Private Events</a></li>
          <li><a href="#" className="text-surface/70 hover:text-white transition-all text-sm uppercase tracking-wide">Careers</a></li>
          <li><a href="#" className="text-surface/70 hover:text-white transition-all text-sm uppercase tracking-wide">Newsletter</a></li>
        </ul>
      </div>
      <div className="col-span-1 md:col-span-4 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-body text-xs tracking-widest uppercase text-surface/50">© 2024 Kaphee Vintage Cafe. Handcrafted for your daily ritual.</p>
        <div className="flex gap-6">
          <a href="#" className="text-surface/70 hover:text-white transition-all"><Share2 size={18} /></a>
          <a href="#" className="text-surface/70 hover:text-white transition-all"><Mail size={18} /></a>
          <a href="#" className="text-surface/70 hover:text-white transition-all"><MapPin size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
