import React from 'react';

const FeedbackForm = () => {
  return (
    <div className="text-white shadow-lg mb-4 rounded">
      <div className="container bg-white p-4 rounded" style={{ maxWidth: '650px' }}>
        <h2 className="fw-bold fs-1 text-danger text-center mb-4">Welcome to DubEase Feedback Zone</h2>
        <p className="fs-4 fw-bold text-center text-dark">We value your feedback. Please share your thoughts with us.</p>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Your Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-dark">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter Your Email" required="true" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label text-dark">Message</label>
            <textarea className="form-control" id="message" rows="3" placeholder="Enter Your Message..."></textarea>
          </div>
          <button type="submit" className="btn btn-warning btn-lg">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
