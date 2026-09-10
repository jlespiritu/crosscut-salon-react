import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Link } from 'react-router-dom';
import Staff from '../components/sections/Staff';

function Home() {
  return (
    <div className="flex flex-col bg-[#FDFBFB] text-slate-800">
      {/* HERO SECTION - Airy & Elegant */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1600"
            alt="Luxury Salon"
            loading="eager"
            fetchPriority="high"
            width="1600"
            height="900"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#FDFBFB]"></div>
        </div>

        <div className="relative z-10 px-6 max-w-4xl">
          <span className="uppercase tracking-[0.3em] text-gray-500 font-medium text-xs mb-6 block animate-fade-in">The Art of Feminine Beauty</span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-tight text-slate-900">
            Radiance & <span className="italic text-[#C5A059]">Elegance</span>
          </h1>
          <p className="text-lg md:text-2xl mb-12 text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            A sanctuary dedicated to the modern woman. Step into a world of comfort, 
            where luxury meets a personalized touch to bring out your natural glow.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/booking">
              <Button variant="primary" className="w-full sm:w-auto text-lg px-12 py-4 rounded-full shadow-xl">Book Your Experience</Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary" className="w-full sm:w-auto text-lg px-12 py-4 rounded-full">Our Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SIGNATURE SERVICES - Soft Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Signature Treatments</h2>
          <div className="h-px w-40 bg-[#C5A059] mx-auto opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Card
            title="Collagen"
            description="Intensive conditioning treatment for damaged, dry hair."
            price="₱1,199 - ₱1,499"
          />
          <Card
            title="Cystein"
            description="Restorative treatment that rebuilds hair structure from within."
            price="₱2,500 - ₱5,000"
          />
          <Card
            title="Protein Straight"
            description="Protein-infused straightening for smooth, healthy-looking hair."
            price="₱3,500 - ₱7,000"
          />
        </div>
      </section>

      {/* STAFF SECTION - Meet the Team */}
      <Staff />

      {/* EXPERIENCE SECTION - Soft & Airy */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://media.istockphoto.com/id/1444907346/photo/beautiful-girl-with-smooth-silky-dark-brown-flying-hair.jpg?s=1024x1024&w=is&k=20&c=vTQeAFgUwxWT2r7h5lirc2XoS_mh41dx3fIAmltF0zw="
              alt="Hair care and styling"
              loading="lazy"
              width="800"
              height="800"
              className="rounded-full w-full aspect-square object-cover shadow-2xl border-8 border-[#FDF2F2]"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#C5A059]/20 rounded-full blur-3xl"></div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-slate-900">A Sanctuary <br/><span className="italic text-[#C5A059]">For the Soul</span></h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              We believe that beauty is more than skin deep. Our salon is a retreat 
              where every woman is treated with the utmost prestige. From the moment 
              you enter, your comfort is our only priority.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Private Lounges', 'Organic Aromatherapy', 'Master Stylists', 'Champagne Service'].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-600 font-medium">
                  <span className="text-[#C5A059]">✦</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;