import React from 'react';

const ContactForm = () => {
  return (
    <div className="container-fluid" style={{backgroundColor:"white", borderRadius:"30px", padding:"40px"}}>
      
        <h2 className="text-body fs-1 fw-bolder mb-4">Contact us</h2>
        <form>
          <div className="col-md-7 mb-3">
            <label htmlFor="name" className="form-label text-dark">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Your Name" required="true"/>
          </div>
          <div className="col-md-7 mb-3">
            <label htmlFor="email" className="form-label text-dark">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter Your Email" required="true" />
          </div>
          <div className="col-md-7 mb-3">
            <label htmlFor="message" className="form-label text-dark">Message</label>
            <textarea className="form-control" id="message" rows="3" style={{ resize: 'none' }} placeholder="Enter Your Message..."></textarea>
          </div>
          <button type="submit" class="btn btn-dark btn-lg">Submit</button>
        </form>
      
    </div>
  );
};

export default ContactForm;
