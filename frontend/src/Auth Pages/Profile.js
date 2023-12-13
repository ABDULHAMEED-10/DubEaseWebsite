import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Profile.css";
import Navbar from "E:/DubEase/frontend/src/Home/components/Navbar.js";

const Profile = () => {
  let { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const redirect = "/login"; 
  useEffect(() => {
  
    if (!isAuthenticated) {
      navigate(redirect);
      
    }
  }, [navigate, isAuthenticated]);

  return (
    
      
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
          <Fragment>
          <Navbar/>
            <MetaData title={`${user.name}'s Profile`} />
          
          <div className="profileContainer" style={{zIndex:"-1"}}>
            <div>
               
                {/* below one line code is actual src for some reason i am not using this */}
                {/* user.avatar.url */}
                {/* for text you can add /profile.png in src */}
                
              <img src={user.avatar.url } alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{(String(user.createdAt)).slice(0, 10)}</p>
              </div>

              <div>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    
  );
};

export default Profile;