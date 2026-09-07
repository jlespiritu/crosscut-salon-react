import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import logo from '../../assets/logo.png';

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        <Link to="/" className="transition-transform hover:scale-105 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-brand-gold overflow-hidden shadow-sm">
            <img src={logo} alt="CrossCut Salon" className="w-full h-full object-cover" />
          </div>
          <span className="hidden md:block text-xl font-bold tracking-tighter text-slate-800 uppercase">
            CrossCut <span className="text-brand-gold">Salon</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] font-semibold text-gray-500">
          <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <Link to="/services" className="hover:text-brand-gold transition-colors">Services</Link>
          <Link to="/booking" className="hover:text-brand-gold transition-colors">Booking</Link>
          <Link to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link>
        </nav>

        <Link to="/booking">
          <Button variant="primary" className="hidden sm:block py-2 px-6 text-xs uppercase tracking-widest rounded-full">Book Now</Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
