import { useState } from 'react';
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import { BsActivity } from "react-icons/bs";
import FAQ from '../components/FAQs';
import "../CSS/About.css";
const About = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "How many languages do you support?",
      answer:
        "Currently, we support English and Urdu. We're working on adding more languages! stay updated with us. suggestions are welcome!",
      open: true
    },
    {
      question: "What's the best thing about DubEase?",
      answer: "We provide a realistic AI voice-over that doesn't sound robotic. We also offer rapid, 90% accurate translating.",
      open: false
    },
    {
      question:
        "Does its suports multiple speakers in a video?",
      answer: "No, we currently support single speakers in a video. Our product processes your videos quickly and cloning orignal character voice with few errors.",
      open: false
    },
    {
      question:
        "In How many seconds does it process a video?",
      answer: "It depends on the length of the video. Our product processes your videos quickly and cloning orignal character voice with few errors.",
      open: false
    },
    {
      question: "Can I use DubEase for commercial purposes?",
      answer: "Yes, we offer subscription options for businesses and individuals who want to use DubEase for commercial purposes.",
      open: false
    },
    {
      question: "How can I provide feedback or suggest new features?",
      answer: "We welcome your feedback and suggestions! You can reach out to us through our contact form or email us at info@dubease.com.",
      open: false
    }
  ]);

  const toggleFAQ = index => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };
  return (
    <div style={{backgroundColor:"#e3dbf2"}}>
      <Navbar/>
    <div className="container-fluid mt-5 par">
      <div className="container_1">
        <div className="text_container">
          <div className="about-section p-4 text-white responsive-div">
            <h2 className="section-heading text-body fs-1  fw-bolder">Our Mission</h2>
            <p className='text-body'>
              DubEase helps content creators reach global audiences by breaking down language barriers. We make it simple to share and watch content in different languages.
            </p>
          </div>
          <div className="about-section text-white p-4 mt-4 responsive-div">
            <h2 className="section-heading text-body fs-1  fw-bolder">Our Journey</h2>
            <p className='text-body '>
              DubEase began with 2 COMSATS undergraduates, driven by a common purpose. Starting as a final year project, we've evolved to create a functional MVP that tackles the practical challenges of dubbing.
            </p>
          </div>
          <div className="about-section text-white p-4 mt-4 responsive-div">
            <h2 className="section-heading text-body fs-1  fw-bolder">Our MVP</h2>
            <p className='text-body '>
              Our upcoming website will have subscription options for everyone, from individuals to businesses. We're adding more languages and features based on your feedback.
            </p>
          </div>
        </div>

        <div className="mt-4 mt-md-0 divOfImage">
          <img src={process.env.PUBLIC_URL + '/assets/mic.jpg'} alt="Microphone" className="img-fluid" style={{ height: '450px', borderRadius:"30px" }} />
        </div>
      </div>
      <div className="container_1">
              <div className="text-center divOfImage" >
                <img src={process.env.PUBLIC_URL + '/assets/dub.jpg'} alt="DubEase" className="img-fluid mt-5" style={{ height:"410px",borderRadius:"30px"}} />
              </div>
              <div className="text-start text_container " style={{ borderRadius:"30px" }}>
                <h2 className="fw-bolder fs-1 mt-5">Why DubEase?</h2>
                <div className="d-flex align-items-center">
                  <BsActivity className="fs-2 me-3 text-primary" />
                  <p className='fw-bold fs-3 mt-4'>Rapid, 90% accurate translating</p>
                </div>
                <p className='fs-5 text-body text-start '>Captioning normally takes forever, often with multiple errors. Our product processes your videos quickly and cloning orignal character voice with few errors.</p>
                <div className="d-flex align-items-center">
                  <BsActivity className="fs-2 me-3 text-primary" />
                  <p className='fw-bold fs-3 mt-4'>Realistic AI voice-over</p>
                </div>
                <p className='fs-5 text-body text-start '>Are you searching for voice dubbing that doesn't sound robotic and awkward? We have voice over of the original character in many languages with emotions and tune cloning in the resulting video.</p>
              </div>
            </div>
      <div className="container-fluid text-black rounded p-4 mt-5">
        <h2 className="row justify-content-center text-body fs-1  fw-bolder">Our Team</h2>
        
          <div className='team_div'>
            <div >
            <div className="about-section text-white responsive-div ">
            <h3 className="section-heading text-body fs-2  fw-bolder">Adil Masood</h3>
            <img src={process.env.PUBLIC_URL + '/assets/me.png'} alt="Me" className="img-fluid "  />
            </div>
            </div>
            
            <div >
            <div className="about-section text-white responsive-div">
            <h3 className="section-heading text-body fs-2 fw-bolder">Abdul Hameed</h3>
            <img src={process.env.PUBLIC_URL + '/assets/ham.png'} alt="Ham" className="img-fluid" />
              </div>
              
          </div>
          
        </div>
        </div>
      <div>
      <div className="faqs">
        {faqs.map((faq, index) => (
          <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>
      <div className="row p-3">
        <div className="col-md-8">
          <ContactForm />
        </div>
        <div className="col-md-4 whats_going">
          <div className="container-fluid responsive-div p-3  " style={{height:"150px"}}>
            <h2 className="text-body fs-2  fw-bolder">Track Record</h2>
            <p className='text-body '>
              We've built a strong track record of solving problems and making a difference. We're committed to keeping that up in the future.
            </p>
            </div>
            <div className="container-fluid responsive-div p-3 mt-4 " style={{height:"150px"}}>
            <h2 className="text-body fs-2  fw-bolder">Working Hard</h2>
            <p className='text-body '>
              We're working hard to make DubEase the best it can be. We're always looking for ways to improve and grow. we are working for more language support.
            </p>
          </div>
          <div className="container-fluid responsive-div p-3 mt-4" style={{height:"150px"}}>
            <h2 className="text-body fs-2  fw-bolder">Reach Out to Us</h2>
              <div className='d-flex flex-column'>
                <p className='text-body'>Your suggestions are valuable to us and help us to improve our services. We are committed to continuously enhancing our platform to better. Thank you for your support.  </p>
                
              </div>
              
            </div>
            
        </div>
      </div>
      </div>
      <Footer/>
      </div>
  );
};

export default About;
