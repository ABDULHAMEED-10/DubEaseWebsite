import { NavLink } from 'react-router-dom';
import { logout } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import '../CSS/Home.css'



const Navbar = () => {

  const picStyle = {
    borderRadius: "100%",
    height: "40px",
    width: "40px",
    transition: "transform 0.2s ease-in-out",
    ":hover": {
      transform: "scale(1.1)",
    },
  };
  const dropdown = {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
  }

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
              <NavLink className="nav-link fs-5 me-3 text-white"  to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fs-5 me-3 text-white" to="/about">
                About Us
              </NavLink>
            </li>
            
          </ul>
          <ul className="navbar-nav">
              <li className="nav-item">
                {isAuthenticated ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-link dropdown-toggle "
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={dropdown}
                    >
                      <img style={picStyle} src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt={user.name} />
                    </button>
                    <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton" style={{right:"0", left:"auto"}}>
                      <li>
                        <NavLink to="/me" className="dropdown-item">
                          <i className="fa fa-user me-1"></i> Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/settings" className="dropdown-item">
                          <i className="fa fa-cog me-1"></i> Settings
                        </NavLink>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={Logout}>
                          <i className="fa fa-sign-out me-1"></i> Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <NavLink to="/login" className="btn btn-warning btn-lg me-3">
                    <span className="fa fa-sign-in me-1"></span> Login/SignUp
                  </NavLink>
                )}
              </li>
            </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
