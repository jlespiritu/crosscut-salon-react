import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import services from '../data/services';

function ServicesPage() {
  // Group services by category
  const groupedServices = services.reduce((groups, service) => {
    const category = service.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(service);
    return groups;
  }, {});

  // Get category names in the order they first appear
  const categoryNames = Object.keys(groupedServices);

  return (
    <div className="px-6 py-24 max-w-7xl mx-auto w-full bg-[#FDFBFB] min-h-screen">
      <div className="text-center mb-16">
        <span className="uppercase tracking-[0.3em] text-gray-500 font-medium text-xs mb-4 block">Curated For You</span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-4">
          Our <span className="italic text-[#C5A059]">Services</span>
        </h1>
        <div className="h-px w-40 bg-[#C5A059] mx-auto opacity-50 mt-6"></div>
      </div>

      {categoryNames.map((categoryName) => (
        <div key={categoryName} className="mb-20">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-8 pb-3 border-b border-gray-200">
            {categoryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {groupedServices[categoryName].map((service) => (
              <div key={service.id} className="flex flex-col gap-6">
                <Card 
                  title={service.title} 
                  description={service.description} 
                  price={service.price} 
                  image={service.image} 
                />
                <Link to="/booking">
                  <Button variant="primary" className="w-full">Book This Service</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 text-center border border-gray-100 shadow-xl">
        <h2 className="text-3xl font-serif font-bold mb-4 text-slate-900">Not sure what to choose?</h2>
        <p className="mb-8 text-gray-500 text-lg max-w-xl mx-auto">
          Our expert stylists can provide a free consultation to help you find 
          the perfect style for your face shape and hair type.
        </p>
        <Link to="/contact">
          <Button variant="secondary" className="px-8 py-3">Contact for Consultation</Button>
        </Link>
      </div>
    </div>
  );
}

export default ServicesPage;