import testimonials from '../../data/testimonials';

function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-pink-500 text-sm font-bold tracking-widest mb-2">
          TESTIMONIALS
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mb-10">
          What Our Clients Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-yellow-500 mb-3">
                {'★'.repeat(item.rating)}
                {'☆'.repeat(5 - item.rating)}
              </p>
              <p className="text-gray-600 mb-4 italic">"{item.quote}"</p>
              <p className="font-bold text-gray-900">— {item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;