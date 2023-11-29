import { NavLink } from 'react-router-dom';
import { logout } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
const Navbar = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let { isAuthenticated } = useSelector(
    (state) => state.user
  );
  
    const Logout = (e) => {
      e.preventDefault();
  dispatch(logout());
  alert.success("Logout sucessFully")
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-extended bg-light-red">
      <div className="container-fluid py-2">
        <NavLink className="navbar-brand fw-bolder navbar-brand-black fs-1 me-5" to="/">
          DubEase
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-3 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link fs-5 me-3 text-white" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fs-5 me-3 text-white" to="/about">
                About Us
              </NavLink>
            </li>
          </ul>
          {isAuthenticated ? (
                       
            <div>
            <NavLink to="/me" className="btn btn-warning btn-lg" style={{ marginRight: '5px' }}>
            <span className="fa fa-user me-1"></span> Profile
              </NavLink>

              <button className="btn btn-warning btn-lg" onClick={Logout}>
      <span className="fa fa-sign-out me-1"></span> Logout
    </button>
            </div>
            
                          ) : (
                            <NavLink to="/login" className="btn btn-warning btn-lg me-3">
            <span className="fa fa-sign-in me-1"></span> Login/SignUp
          </NavLink> )}
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
