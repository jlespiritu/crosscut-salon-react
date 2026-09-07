import staff from '../../data/staff';

function Staff() {
  return (
    <section id="staff" className="section about-section">
      <div className="container">
        <p className="section-label">OUR TEAM</p>
        <h2>Meet Our Staff</h2>
        <p className="section-intro">
          Get to know the professionals behind CrossCut Salon.
        </p>

        <div className="about-grid">
          {staff.map((member) => (
            <div key={member.id} className="about-card">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              {member.available ? (
                <p style={{ color: 'green', fontWeight: 'bold' }}>
                  ✓ Available Today
                </p>
              ) : (
                <p style={{ color: '#999' }}>Not Available Today</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Staff;