import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

function ServicesPage() {
  const servicesData = [
    {
      id: 's1',
      title: "Precision Haircut",
      description: "A tailored cut that enhances your facial features.",
      price: "₱300",
      image: "https://images.unsplash.com/photo-1503951906201-651f27983977?w=500",
    },
    {
      id: 's2',
      title: "Luxury Hair Color",
      description: "Vibrant and long-lasting colors using organic dyes.",
      price: "₱1,500",
      image: "https://images.unsplash.com/photo-1560869753-7efb26667581?w=500",
    },
    {
      id: 's3',
      title: "Royal Shave & Trim",
      description: "Professional shaping and trimming for facial hair.",
      price: "₱500",
      image: "https://images.unsplash.com/photo-1621605815971-fca675099a63?w=500",
    },
    {
      id: 's4',
      title: "Hot Towel Shave",
      description: "Traditional luxury shave with steaming towels.",
      price: "₱400",
      image: "https://images.unsplash.com/photo-1512690199767-1276ed6df844?w=500",
    },
    {
      id: 's5',
      title: "Hair Spa Treatment",
      description: "Deep conditioning and scalp massage for hair health.",
      price: "₱800",
      image: "https://images.unsplash.com/photo-1562322140-7575b1625aae?w=500",
    },
    {
      id: 's6',
      title: "Full Grooming Package",
      description: "Combination of haircut, shave, and facial treatment.",
      price: "₱1,200",
      image: "https://images.unsplash.com/photo-1599351431202-e567a5758767?w=500",
    },
  ];

  return (
    <div className="px-6 py-24 max-w-7xl mx-auto w-full bg-[#FDFBFB] min-h-screen">
      <div className="text-center mb-16">
        <span className="uppercase tracking-[0.3em] text-gray-500 font-medium text-xs mb-4 block">Curated For You</span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-4">
          Our <span className="italic text-[#C5A059]">Services</span>
        </h1>
        <div className="h-px w-40 bg-[#C5A059] mx-auto opacity-50 mt-6"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {servicesData.map((service) => (
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