import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const iconStyle = {
    fontSize: '30px', 
    color: 'black',
  };

  return (
    <footer className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="fw-bolder fs-1 text-danger">Connect with Us</h3>
            <p>Stay updated with all the latest news and features</p>
            <div className="mt-4">
              <a href="/" className="me-4">
                <FontAwesomeIcon icon={faInstagram} style={iconStyle} />
              </a>
              <a href="/" className="me-4">
                <FontAwesomeIcon icon={faLinkedin} style={iconStyle} />
              </a>
              <a href="/">
                <FontAwesomeIcon icon={faFacebook} style={iconStyle} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
