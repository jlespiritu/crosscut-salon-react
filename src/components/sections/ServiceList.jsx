import { useState, useEffect } from 'react';

function ServiceList(props) {
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <p className="section-label">OUR SERVICES</p>
        <h2>Professional Salon Services</h2>
        <p className="section-intro">
          Explore our available services and choose the treatment that best
          fits your needs.
        </p>

        <div className="services-grid">
          {isLoading ? (
            <p className="loading-message">Loading services...</p>
          ) : (
            props.services.map((service, index) => (
              <div key={service.id} className="service-card">
                <p className="service-number">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3>{service.name}</h3>
                <p>Professional {service.name.toLowerCase()} service.</p>
                <p className="price">₱{service.price}</p>
                <button
                  className="button"
                  onClick={() => setSelectedId(service.id)}
                >
                  {selectedId === service.id ? 'Selected' : 'Select'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default ServiceList;