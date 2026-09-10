import staff from '../../data/staff';

function Staff() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full bg-[#FDFBFB]">
      <div className="text-center mb-16">
        <span className="uppercase tracking-[0.3em] text-gray-500 font-medium text-xs mb-4 block">Meet the Experts</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
          Our <span className="italic text-[#C5A059]">Stylists</span>
        </h2>
        <div className="h-px w-40 bg-[#C5A059] mx-auto opacity-50"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {staff.map((member) => (
          <div key={member.id} className="text-center group">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white mb-6">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                width="400"
                height="400"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">{member.name}</h3>
            <p className="text-[#C5A059] text-sm font-medium uppercase tracking-wide mb-2">{member.role}</p>
            <p className="text-gray-500 text-sm">{member.specialty}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Staff;