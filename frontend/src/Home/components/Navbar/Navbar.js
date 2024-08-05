import { Link } from 'react-router-dom';
import ArrowDown from '../../../assets/arrowdown.png';
import ArrowRight from '../../../assets/arrowright.png';
import Logo from '../../../assets/logo.png';
import NavHamburger from './NavHamburger';
import './Navbar.css';
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
const Navbar = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let { isAuthenticated , user } = useSelector(
    (state) => state.user
  );
  
    const Logout = (e) => {
      e.preventDefault();
  dispatch(logout());
  alert.success("Logout sucessFully")
  }
  return (
    <div className="navbar">
      <div className="nav__wrapper">
        {/* Nav Left */}
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <span>DubEase</span>
        </div>

        {/* Nav Center */}
        <div className="nav__center">
          <div className="nav__center-item">
            <Link to='/'><span>Home</span></Link>
          </div>
          <div className="nav__center-item">
          <Link to='/about'><span>About</span></Link>
          </div>
          <div className="nav__center-item dropdown-main">
            <span>Tools</span>
            <img src={ArrowDown} alt="" />
            <div className="dropdown">
              <div className="dropdown__wrapper">
                <div className="dropdown-item">
                  <span>Text to Speech</span>
                </div>
                <div className="dropdown-item">
                  <span>Voice Cloning </span>
                </div>
                <div className="dropdown-item">
                 <Link to='/StartVideoDubbing'><span>Dubbing</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nav Right */}
        <div className="nav__right">
          {isAuthenticated ? (
            <div className="profile">
              <div className="profile__img">
                <img src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt={user.name}  />
              </div>
              <div className="dropdown-p">
                <div className="dropdown__wrapper-p">
                  <div className="dropdown-item-p">
                    <Link to='/me'><span>Profile</span></Link> 
                  </div>
                  <div className="dropdown-item-p">
                    <Link to='/settings'><span>Settings </span></Link>
                  </div>
                  <div className="dropdown-item-p" onClick={Logout}>
                    <Link><span>Logout</span></Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="nav-try">
              <Link className="try__btn" to="/login">
                <span>Login / Signup</span>
                <img src={ArrowRight} alt="Arrow Right" />
              </Link>
            </div>
          )}
          {/* Media query pr nav center gaib or nav ham show hoga */}
          <NavHamburger />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
