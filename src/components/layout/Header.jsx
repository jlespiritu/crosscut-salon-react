import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/booking', label: 'Booking' },
    { path: '/contact', label: 'Contact' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg">Skip to main content</a>

      <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="transition-transform hover:scale-105 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-brand-gold overflow-hidden shadow-sm">
              <img src={logo} alt="CrossCut Salon logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-slate-800 uppercase">
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

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            className="md:hidden text-slate-800 p-2"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#FDFBFB] flex flex-col items-center justify-center gap-10 md:hidden">
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="absolute top-6 right-6 text-slate-800 p-2"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'text-3xl font-serif italic text-brand-gold'
                    : 'text-3xl font-serif italic text-slate-800 hover:text-brand-gold transition-colors'
                }
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/booking"
            onClick={closeMenu}
            className="inline-flex items-center justify-center bg-[#C5A059] text-white hover:bg-[#B38F4D] shadow-lg shadow-[#C5A059]/30 px-10 py-4 rounded-full font-medium text-sm uppercase tracking-widest transition-all duration-500 mt-6"
          >
            Book Now
          </Link>
        </div>
      )}
    </>
  );
}

export default Header;