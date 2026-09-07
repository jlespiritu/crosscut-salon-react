import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#FDFBFB] text-slate-600 py-16 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-12">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-gold rounded-md flex items-center justify-center text-white font-black text-sm">C</div>
              <span className="text-xl font-bold tracking-tighter text-slate-800 uppercase">
                CrossCut <span className="text-brand-gold">Salon</span>
              </span>
            </div>
            <p className="leading-relaxed max-w-xs text-sm italic text-gray-500">
              Dedicated to the modern woman. We provide a sanctuary of beauty, 
              comfort, and prestige for those who deserve the very best.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-slate-800">Our Studio</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <Link to="/services" className="hover:text-brand-gold transition-colors flex items-center gap-2">
                  <span className="text-brand-gold">✦</span> Our Services
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-brand-gold transition-colors flex items-center gap-2">
                  <span className="text-brand-gold">✦</span> Online Booking
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-gold transition-colors flex items-center gap-2">
                  <span className="text-brand-gold">✦</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Opening Hours */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-slate-800">Appointment Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-400">Mon - Fri</span>
                <span className="text-slate-800 font-medium">9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-400">Saturday</span>
                <span className="text-slate-800 font-medium">10:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-400">Sunday</span>
                <span className="text-brand-gold font-bold">Private Booking Only</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} CrossCut Salon. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-400 hover:text-brand-gold cursor-pointer transition-colors text-xs uppercase tracking-widest">Instagram</span>
            <span className="text-gray-400 hover:text-brand-gold cursor-pointer transition-colors text-xs uppercase tracking-widest">Facebook</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
