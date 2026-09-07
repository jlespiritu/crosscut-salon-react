function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <p className="section-label">CONTACT</p>
        <h2>Get In Touch</h2>
        <p className="section-intro">
          Have questions about our services? Contact CrossCut Salon for more
          information.
        </p>

        <div className="contact-grid">
          <div className="contact-card">
            <h3>Location</h3>
            <p>Bagong Silang, Caloocan City</p>
          </div>

          <div className="contact-card">
            <h3>Business Hours</h3>
            <p>Monday - Sunday</p>
            <p>9:00 AM - 6:00 PM</p>
          </div>

          <div className="contact-card">
            <h3>Contact</h3>
            <p>Message us for appointments and inquiries.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;