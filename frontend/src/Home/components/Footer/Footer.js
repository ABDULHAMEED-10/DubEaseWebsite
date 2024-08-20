import linkdin from '../../../assets/Linkdin.png';
import background from '../../../assets/background-2.webp';
import instagram from '../../../assets/instagram.png';
import logo from '../../../assets/logo.png';
import youtube from '../../../assets/youtube.webp';
import '../Footer/Footer.css';
const Footer = () => {
  return (
    <>
      <div className="footer">
        {/* Background k peche vali absolute img */}
        <img src={background} className="footer__background" alt='Footer_Bg'/>
        {/* Content div with background blue */}
        <div className="footer__wrapper">
          {/* First Column */}
          <div className="footer__info">
            <div className="info__contact">
              <img src={logo} alt="" />
              <span style={{ fontWeight: '700' }}>DubEase Oy/Ltd</span>
              <span>Business ID:0000-00</span>
              <span>XYZ street 7B, 0079, Espoo, Pakistan</span>
            </div>
            <div className="info__social">
              <div className="social__btns">
                <div className="social__btns-btn">
                  <img src={linkdin} alt="" />
                </div>
                <div className="social__btns-btn">
                  <img src={youtube} alt="" />
                </div>
                <div className="social__btns-btn">
                  <img src={instagram} alt="" />
                </div>
              </div>
              <span className="copyright">Copyright © 2023 DubEase</span>
            </div>
          </div>

          {/* Second Column */}
          <div className="footer__links">
            <h2>Features</h2>
            <span>Subtitle generator</span>
            <span>Voice Over</span>
            <span>Video Dubber</span>
            <span>AI interpretation</span>
          </div>

          {/* Third Column */}
          <div className="footer__links">
            <h2>Resources</h2>
            <span>Blog</span>
            <span>Affiliate </span>
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>

          {/* Fourth Column */}
          <div className="footer__links">
            <h2>About</h2>
            <span>About Us</span>
            <span>Contact </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
