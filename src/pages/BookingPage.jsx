import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import services from '../data/services';

function BookingPage() {
  return (
    <div className="px-6 py-24 max-w-3xl mx-auto w-full bg-[#FDFBFB] min-h-screen text-slate-800">
      <div className="text-center mb-12">
        <span className="uppercase tracking-[0.3em] text-gray-500 font-medium text-xs mb-4 block">Reserve Your Spot</span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-slate-900">
          Book Your <span className="italic text-[#C5A059]">Experience</span>
        </h1>
        <div className="h-px w-40 bg-[#C5A059] mx-auto opacity-50 mt-6"></div>
        <p className="text-gray-500 mt-6">Secure your spot with our master stylists.</p>
      </div>

      <form className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Phone Number" type="tel" placeholder="0912 345 6789" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500 ml-1">Select Service</label>
          <select className="bg-white border border-gray-200 p-3 rounded-xl text-slate-800 focus:border-[#C5A059] outline-none transition-all">
            {services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title} — {service.price}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Preferred Date" type="date" />
          <Input label="Preferred Time" type="time" />
        </div>

        <Button variant="primary" className="w-full py-4 text-lg mt-4">Confirm Appointment</Button>
      </form>
    </div>
  );
}

export default BookingPage;