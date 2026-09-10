function Card({ title, description, price, image }) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group">
      <div className="overflow-hidden h-64">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            width="600"
            height="256"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image coming soon</span>
          </div>
        )}
      </div>

      <div className="p-8 text-center">
        <h3 className="text-2xl font-serif font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed italic">{description}</p>
        <div className="flex justify-center items-center">
          <span className="text-xl font-semibold text-brand-gold">{price}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;