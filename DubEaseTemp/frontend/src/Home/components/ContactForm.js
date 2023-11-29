import React from 'react';

const ContactForm = () => {
  return (
    <div className="container-fluid py-5">
      
        <h2 className="fw-bold fs-1 text-danger mb-4">Contact Us</h2>
        <form>
          <div className="col-md-7 mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Your Name" />
          </div>
          <div className="col-md-7 mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter Your Email" required="true" />
          </div>
          <div className="col-md-7 mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="3" style={{ resize: 'none' }} placeholder="Enter Your Message..."></textarea>
          </div>
          <button type="submit" className="btn btn-warning btn-lg">Submit</button>
        </form>
      
    </div>
  );
};

export default ContactForm;
