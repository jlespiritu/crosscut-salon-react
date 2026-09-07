function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <p className="section-label">ABOUT US</p>
        <h2>Beauty Meets Confidence</h2>
        <p className="section-intro">
          CrossCut Salon provides professional hair and beauty services in a
          comfortable and welcoming environment.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <h3>Professional Service</h3>
            <p>
              We focus on quality service and personalized attention for
              every client.
            </p>
          </div>

          <div className="about-card">
            <h3>Your Style</h3>
            <p>
              Our services are designed around your preferred style, look,
              and beauty needs.
            </p>
          </div>

          <div className="about-card">
            <h3>Client Care</h3>
            <p>Your comfort and satisfaction are important to us.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;