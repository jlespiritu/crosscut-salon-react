import { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import services from '../data/services';

function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    phone: '',
    date: '',
    time: '',
  });

  const stepLabels = ['Select a Service', 'Your Information', 'Preferred Schedule', 'Review Your Booking'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const goNext = () => setStep(step + 1);
  const goBack = () => setStep(step - 1);

  const handleConfirm = () => {
    setIsSubmitted(true);
  };

  const selectedService = services.find((s) => s.title === formData.service);

  // SUCCESS SCREEN
  if (isSubmitted) {
    return (
      <div className="px-6 py-24 max-w-2xl mx-auto w-full bg-[#FDFBFB] min-h-screen flex items-center justify-center text-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
          <div className="w-16 h-16 bg-[#C5A059] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl" aria-hidden="true">✓</div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">Booking Confirmed!</h1>
          <p className="text-gray-500 mb-2">Thank you, {formData.name}. We've received your request for:</p>
          <p className="text-[#C5A059] font-semibold text-lg mb-6">{formData.service}</p>
          <p className="text-gray-500 text-sm">
            {formData.date} at {formData.time}<br />
            We'll contact you at {formData.phone} to confirm.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-24 max-w-3xl mx-auto w-full bg-[#FDFBFB] min-h-screen">
      <div className="text-center mb-12">
        <span className="uppercase tracking-[0.3em] text-gray-500 font-medium text-xs mb-4 block">Reserve Your Spot</span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-slate-900">
          Book Your <span className="italic text-[#C5A059]">Experience</span>
        </h1>
        <div className="h-px w-40 bg-[#C5A059] mx-auto opacity-50 mt-6"></div>
      </div>

      {/* LIVE ANNOUNCEMENT FOR SCREEN READERS - invisible, announces step changes */}
      <div aria-live="polite" className="sr-only">
        Step {step} of 4: {stepLabels[step - 1]}
      </div>

      {/* PROGRESS INDICATOR */}
      <div
        role="group"
        aria-label={`Step ${step} of 4: ${stepLabels[step - 1]}`}
        className="flex items-center justify-center gap-2 mb-12"
      >
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center">
            <div
              aria-hidden="true"
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step >= num ? 'bg-[#C5A059] text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {num}
            </div>
            {num < 4 && (
              <div aria-hidden="true" className={`w-12 h-px ${step > num ? 'bg-[#C5A059]' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl">
        {/* STEP 1: SELECT SERVICE */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Select a Service</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="service-select" className="text-sm font-semibold text-gray-500 ml-1">
                Service
              </label>
              <select
                id="service-select"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 p-3 rounded-xl text-slate-800 focus:border-[#C5A059] outline-none transition-all"
              >
                <option value="">-- Choose a service --</option>
                {services.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title} — {service.price}
                  </option>
                ))}
              </select>
            </div>
            <Button
              variant="primary"
              className="w-full py-4"
              onClick={goNext}
              disabled={!formData.service}
            >
              Next
            </Button>
          </div>
        )}

        {/* STEP 2: PERSONAL INFO */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Your Information</h2>
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan Dela Cruz"
            />
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0912 345 6789"
            />
            <div className="flex gap-4">
              <Button variant="secondary" className="w-full py-4" onClick={goBack}>
                Back
              </Button>
              <Button
                variant="primary"
                className="w-full py-4"
                onClick={goNext}
                disabled={!formData.name || !formData.phone}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: DATE & TIME */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Preferred Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Preferred Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
              <Input
                label="Preferred Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" className="w-full py-4" onClick={goBack}>
                Back
              </Button>
              <Button
                variant="primary"
                className="w-full py-4"
                onClick={goNext}
                disabled={!formData.date || !formData.time}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & CONFIRM */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Review Your Booking</h2>
            <div className="bg-[#FDFBFB] rounded-2xl p-6 space-y-3 text-slate-700">
              <p><span className="font-semibold">Service:</span> {formData.service} {selectedService && `(${selectedService.price})`}</p>
              <p><span className="font-semibold">Name:</span> {formData.name}</p>
              <p><span className="font-semibold">Phone:</span> {formData.phone}</p>
              <p><span className="font-semibold">Date:</span> {formData.date}</p>
              <p><span className="font-semibold">Time:</span> {formData.time}</p>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" className="w-full py-4" onClick={goBack}>
                Back
              </Button>
              <Button variant="primary" className="w-full py-4" onClick={handleConfirm}>
                Confirm Appointment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingPage;