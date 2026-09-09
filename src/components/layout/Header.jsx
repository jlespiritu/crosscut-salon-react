import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Header() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/booking', label: 'Booking' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg">Skip to main content</a>

      <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="transition-transform hover:scale-105 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-brand-gold overflow-hidden shadow-sm">
              <img src={logo} alt="CrossCut Salon logo" className="w-full h-full object-cover" />
            </div>
            <span className="hidden md:block text-xl font-bold tracking-tighter text-slate-800 uppercase">
              CrossCut <span className="text-brand-gold">Salon</span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] font-semibold">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={
                    isActive
                      ? 'transition-colors text-brand-gold'
                      : 'transition-colors text-gray-500 hover:text-brand-gold'
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/booking"
            className="hidden sm:inline-flex items-center justify-center bg-[#C5A059] text-white hover:bg-[#B38F4D] shadow-lg shadow-[#C5A059]/30 px-6 py-2 rounded-full font-medium text-xs uppercase tracking-widest transition-all duration-500 hover:scale-105 active:scale-95"
          >
            Book Now
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;