import React from 'react';
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Navbar/>
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="about-section bg-dark p-4 text-white responsive-div">
            <h2 className="section-heading text-danger">Our Mission</h2>
            <p>
              DubEase helps content creators reach global audiences by breaking down language barriers. We make it simple to share and watch content in different languages.
            </p>
          </div>
          <div className="about-section bg-dark text-white p-4 mt-4 responsive-div">
            <h2 className="section-heading text-danger">Our Journey</h2>
            <p>
              DubEase began with 2 COMSATS undergraduates, driven by a common purpose. Starting as a final year project, we've evolved to create a functional MVP that tackles the practical challenges of dubbing.
            </p>
          </div>
          <div className="about-section bg-dark text-white p-4 mt-4 responsive-div">
            <h2 className="section-heading text-danger">Our MVP</h2>
            <p>
              Our upcoming website will have subscription options for everyone, from individuals to businesses. We're adding more languages and features based on your feedback.
            </p>
          </div>
        </div>

        <div className="col-md-6 mt-4 mt-md-0">
          <img src={process.env.PUBLIC_URL + '/assets/mic.jpg'} alt="Microphone" className="img-fluid" style={{ height: '550px' }} />
        </div>
      </div>

      <div className="container-fluid bg-dark text-white p-4 mt-5">
        <h2 className="row justify-content-center fs-1 text-danger">Our Team</h2>
        <p className="row justify-content-center fs-5">
          Our team has been working together for one year on AI and software projects, using our diverse skills to solve real-world problems.
        </p>
        <div className="row justify-content-center mt-4">
          <div className="col-md-2">
            <img src={process.env.PUBLIC_URL + '/assets/me.jpg'} alt="Me" className="img-fluid" />
          </div>
          <div className="col-md-2 mt-4 mt-md-0">
            <img src={process.env.PUBLIC_URL + '/assets/ham.jpg'} alt="Ham" className="img-fluid" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <ContactForm />
        </div>
        <div className="col-md-4 mt-3">
          <div className="container-fluid p-3 mt-5 border border-dark" style={{height:"145px"}}>
            <h2 className="fs-4">Our Track Record</h2>
            <p>
              We've built a strong track record of solving problems and making a difference. We're committed to keeping that up in the future.
            </p>
          </div>
          <div className="container-fluid bg-dark text-white p-3 mt-4" style={{height:"135px"}}>
            <h2 className="fs-3 text-danger">Reach Out to Us</h2>
            <p>Contact us today</p>
            <p>info@dubease.com</p>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
      </>
  );
};

export default About;
