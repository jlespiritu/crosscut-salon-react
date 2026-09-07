import Button from '../components/ui/Button';

function ContactPage() {
  return (
    <div className="px-6 py-24 max-w-5xl mx-auto w-full bg-[#FDFBFB] min-h-screen">
      <div className="text-center mb-16">
        <span className="uppercase tracking-[0.3em] text-gray-500 font-medium text-xs mb-4 block">We're Here For You</span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-4">
          Get In <span className="italic text-[#C5A059]">Touch</span>
        </h1>
        <div className="h-px w-40 bg-[#C5A059] mx-auto opacity-50 mt-6"></div>
        <p className="text-gray-500 mt-6">We'd love to hear from you. Visit us or send a message.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-8">
          <h2 className="text-2xl font-serif font-bold text-slate-900">Send a Message</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full bg-white border border-gray-200 p-3 rounded-xl text-slate-800 focus:border-[#C5A059] outline-none transition-all" />
            <input type="email" placeholder="Your Email" className="w-full bg-white border border-gray-200 p-3 rounded-xl text-slate-800 focus:border-[#C5A059] outline-none transition-all" />
            <textarea placeholder="Your Message" rows="4" className="w-full bg-white border border-gray-200 p-3 rounded-xl text-slate-800 focus:border-[#C5A059] outline-none transition-all"></textarea>
            <Button variant="primary" className="w-full py-4">Send Message</Button>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div className="flex items-start gap-6">
            <div className="bg-[#C5A059] p-3 rounded-full text-white font-bold">📍</div>
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900">Our Studio</h3>
              <p className="text-gray-500">123 Luxury Lane, Metro City, Philippines</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="bg-[#C5A059] p-3 rounded-full text-white font-bold">📞</div>
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900">Phone</h3>
              <p className="text-gray-500">+63 912 345 6789</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="bg-[#C5A059] p-3 rounded-full text-white font-bold">✉️</div>
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900">Email</h3>
              <p className="text-gray-500">hello@crosscutsalon.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;