import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Booking', path: '/booking' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-12 py-6 bg-surface/90 backdrop-blur-sm border-b border-outline-variant transition-all duration-300">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-2xl font-bold tracking-[0.2em] text-primary uppercase font-body">
          Kaphee
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              data-cursor-label={link.name}
              className={`font-body text-xs uppercase tracking-widest transition-all duration-300 hover:opacity-100 ${
                location.pathname === link.path
                  ? 'text-primary opacity-100 font-bold'
                  : 'text-primary opacity-40'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <button
          data-magnetic
          data-cursor-label="Login"
          className="text-xs uppercase tracking-widest text-primary opacity-60 hover:opacity-100 transition-opacity"
        >
          Login
        </button>
        <button
          data-magnetic
          data-cursor-label="Join"
          className="px-6 py-2 bg-primary text-white text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-all"
        >
          Join
        </button>
      </div>
    </header>
  );
}
