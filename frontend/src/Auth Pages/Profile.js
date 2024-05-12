import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Profile.css";

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Tooltip } from "@material-ui/core";
import Navbar from "../Home/components/Navbar/Navbar";
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
        
            <MetaData title={`${user.name}'s Profile`} />
          <Navbar />
            <section className="vh-100" style={{ backgroundColor: '#e3dbf2' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' , marginTop:"15%"}}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src={user.avatar.url ? user.avatar.url : "https://mdbootstrap.com/img/new/avatars/2.jpg"}
                    alt="Avatar" className="my-5 " style={{ width: '8.5vw',height:'8.5vw', borderRadius:"50%" }} fluid />
                          <MDBTypography tag="h5" className="text-dark font-monospace">{user.name} </MDBTypography>
                          <Tooltip title="Edit Profile">
                  <Link to="/me/update" className="text-muted"><MDBIcon far icon="edit mb-5" /></Link>
                            
                          </Tooltip>
                          <Tooltip title="change password">
                  <Link to="/password/update" className="text-muted"><MDBIcon  icon="key ms-3 " /></Link>
                            
                          </Tooltip>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                            <MDBTypography tag="h6" className="fs-4 fw-bold">User Information</MDBTypography>
                  
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6" className="fw-bold">User Name</MDBTypography>
                        <MDBCardText className="text-muted">{user.name}</MDBCardText>
                              </MDBCol>
                              <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6" className="fw-bold">Joined on</MDBTypography>
                        <MDBCardText className="text-muted">{user.createdAt.slice(0,10)}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6" className="fw-bold">Email</MDBTypography>
                        <MDBCardText className="text-muted">{ user.email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
        </Fragment>
      )}
    </Fragment>
    
  );
};

export default Profile;