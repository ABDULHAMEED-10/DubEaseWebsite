import React, { useEffect } from 'react';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import "../src/CSS/App.css"
import Profile from './Auth Pages/Profile';
import LoginSignUp from "./Auth Pages/LoginSignUp"
import Forget from "./Auth Pages/ForgotPassword"
import Reset from "./Auth Pages/ResetPassword"
import UpdatePassword from "./Auth Pages/UpdatePassword"
import UpdateProfile from "./Auth Pages/UpdateProfile"
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from './store';
import { loadUser } from './actions/userAction';
import StartVideoDubbing from './Home/pages/StartVideoDubbing';
import Root from './Home/pages/Root';
import About from './Home/pages/About';
import Home from './Home/pages/Home';
import Settings from './Home/pages/Settings';


const App = () => {

  const {isAuthenticated } = useSelector((state) => state.user);

  
  useEffect(() => {
    
    store.dispatch(loadUser());
  }, []);
  return (
    
    <Router>
      
      <div>
  
        <Routes>
          
        <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
           
          </Route>
          <Route path="/settings/*" element={<Settings/>} />
          <Route path="/about" element={<About />} />        
          
          <Route path="/login" element={<LoginSignUp />} />
          <Route exact path="/password/forgot" element={<Forget />} />
          <Route exact path="/StartVideoDubbing" element={<StartVideoDubbing />} />

          <Route exact path="/password/reset/:token" element={<Reset />} />

          {/* Authenticated user can acess only */}
          <Route exact path="/password/update" element={isAuthenticated ? (<UpdatePassword />) : (<Navigate to="/login" replace state={{ from: "/password/update" }} />)} />
          <Route exact path="/me/update" element={isAuthenticated ? (<UpdateProfile />) : (<Navigate to="/login" replace state={{ from: "/me/update"}} />)}/>
          <Route exact path="/me" element={isAuthenticated ? (<Profile />) : (<Navigate to="/login" replace state={{ from: '/me' }} />)} />
          
          



        </Routes>
              
      </div>
  
    </Router>
  )
}

export default App;
