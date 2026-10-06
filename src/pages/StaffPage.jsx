import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import * as staffModule from '../data/staff';

// Kahit default export o named export ang staff.js, hindi magbabagsak ng page
const staff = staffModule.default || staffModule.staff || [];

function StaffPage() {
  return (
    <div className="px-6 py-24 max-w-7xl mx-auto w-full bg-[#FDFBFB] min-h-screen">
      <div className="text-center mb-16">
        <span className="uppercase tracking-[0.3em] text-gray-500 font-medium text-xs mb-4 block">Meet The Experts</span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-4">
          Our <span className="italic text-[#C5A059]">Team</span>
        </h1>
        <div className="h-px w-40 bg-[#C5A059] mx-auto opacity-50 mt-6"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {staff.map((member) => (
          <div key={member.id} className="flex flex-col gap-4 text-center">
            <div className="rounded-2xl overflow-hidden aspect-[3/4]">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900">{member.name}</h3>
              <p className="text-[#C5A059] text-sm font-medium mt-1">{member.role}</p>
              <p className="text-gray-500 text-sm mt-2">{member.specialty}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 text-center border border-gray-100 shadow-xl">
        <h2 className="text-3xl font-serif font-bold mb-4 text-slate-900">Ready to book with our team?</h2>
        <p className="mb-8 text-gray-500 text-lg max-w-xl mx-auto">
          Choose your preferred stylist when you book your next appointment.
        </p>
        <Link to="/booking">
          <Button variant="primary" className="px-8 py-3">Book Now</Button>
        </Link>
      </div>
    </div>
  );
}

export default StaffPage;
