import { useState } from 'react';
import Arrowdown from '../../../assets/arrowdown.png';
import ArrowRight from '../../../assets/arrowright.png';
import background from '../../../assets/background-1.webp';
import CloseIcon from '../../../assets/close-icon.png';
import hamburger from '../../../assets/ham-icon.png';
import '../Navbar/Navbar.css';

const NavHamburger = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  return (
    <>
      <div className="navham">
        <div className="ham-icon" onClick={() => setNavOpen(true)}>
          <img src={hamburger} alt="" />
        </div>
      </div>

      {navOpen && (
        <div className="ham-container">
          <div className="container__wrapper">
            <div className="ham-background">
              <img src={background} alt="" />
            </div>
            <div className="ham-menu">
              <div className="close-icon" onClick={() => setNavOpen(false)}>
                <img src={CloseIcon} alt="close" />
              </div>
              <div className="ham-list">
                <div className="ham__list-item">Home</div>
                <div className="ham__list-item">About</div>
                <div
                  className="ham__list-item"
                  onClick={() => setToolsOpen(true)}
                >
                  <span className="tools-main">
                    Tools <img src={Arrowdown} alt="" />
                  </span>
                  {toolsOpen && (
                    <div className="tools-items">
                      <span>Text to Speech</span>
                      <span>Voice Cloning</span>
                      <span>Dubbing</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="ham-btn">
                <div className="try__btn--reverse">
                  <span>Try DubEase Free </span>
                  <img src={ArrowRight} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavHamburger;
