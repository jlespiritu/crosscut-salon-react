import { useState } from 'react';

function BookingForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    service: '',
    bookingDate: '',
    bookingTime: '',
    bookingNotes: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <section id="booking" className="section booking-section">
      <div className="container">
        <p className="section-label">BOOKING</p>
        <h2>Book an Appointment</h2>
        <p className="section-intro">
          Fill out the form below to request an appointment.
        </p>

        <form className="booking-form">
          <div className="form-group">
            <label htmlFor="customer-name">Full Name</label>
            <input
              type="text"
              id="customer-name"
              name="customerName"
              placeholder="Enter your full name"
              value={formData.customerName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="customer-phone">Mobile Number</label>
            <input
              type="tel"
              id="customer-phone"
              name="customerPhone"
              placeholder="09XXXXXXXXX"
              value={formData.customerPhone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="service-select">Select Service</label>
            <select
              id="service-select"
              name="service"
              value={formData.service}
              onChange={handleChange}
            >
              <option value="">Select a service</option>
              <option value="Haircut">Haircut</option>
              <option value="Hair Color">Hair Color</option>
              <option value="Blow Dry">Blow Dry</option>
              <option value="Manicure">Manicure</option>
              <option value="Pedicure">Pedicure</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="booking-date">Appointment Date</label>
            <input
              type="date"
              id="booking-date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="booking-time">Appointment Time</label>
            <select
              id="booking-time"
              name="bookingTime"
              value={formData.bookingTime}
              onChange={handleChange}
            >
              <option value="">Select a time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="17:00">5:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="booking-notes">Additional Notes</label>
            <textarea
              id="booking-notes"
              name="bookingNotes"
              rows="5"
              placeholder="Tell us anything we should know..."
              value={formData.bookingNotes}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="button">
            Submit Booking
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookingForm;