import React from 'react';
import { BsActivity, BsCloudUploadFill, BsCloudDownloadFill } from "react-icons/bs";
import FeedbackForm from '../components/FeedbackForm';
import { useNavigate } from 'react-router-dom';
// import { useAlert } from "react-alert";

const Home = () => {
  // const alert = useAlert();
  const navigate = useNavigate();

  const handleStartDubbing = () => {
      navigate("/StartVideoDubbing")
  };

  
  return (
    <div>
      <div className="container-fluid bg-dark text-white">
        <div className="row justify-content-center vh-100">
          <div className="col-md-8 text-center">
            <h1 className="display-1 fw-bold mt-5">Dub your videos with ease!</h1>
            
            
            <p className="display-5 fw-bold mt-5">
            To bring relevance to people, you have to understand their language
            </p>
            
            
            
            <button className="btn btn-warning btn-lg mt-5 me-2" onClick={handleStartDubbing}>
              Start Free Dubbing
            </button>


            <p className="mt-2">No credit card required. Cancel anytime.</p>
            <p className="lead fw-bold mt-5 fs-4">
            Dub videos into other languages while keeping their original feel and style.
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-white text-dark">
        <div className="row justify-content-center mt-5">
          <div className="col-md-8 text-center mt-md-5">
            <p className="fw-bold display-5 text-danger mb-0">Trusted by hundreds of <br />
              content creator teams</p>

            <div className="row mt-3">
              <div className="col-md-6 text-center mt-5" >
                <img src={process.env.PUBLIC_URL + '/assets/dub.jpg'} alt="DubEase" className="img-fluid mt-5" style={{ height:"500px"}} />
              </div>
              <div className="col-md-6 text-start mt-4" style={{ paddingLeft: '5em' }}>
                <h2 className="fw-bolder fs-1 mt-5">Why DubEase?</h2>
                <div className="d-flex align-items-center">
                  <BsActivity className="fs-2 me-3 text-primary" />
                  <p className='fw-bold fs-3 mt-4'>Rapid, 90% accurate translating</p>
                </div>
                <p className='fs-5'>Captioning normally takes forever, often with multiple errors. Our product processes your videos quickly with few errors.</p>
                <div className="d-flex align-items-center">
                  <BsActivity className="fs-2 me-3 text-primary" />
                  <p className='fw-bold fs-3 mt-4'>Realistic AI voice-over</p>
                </div>
                <p className='fs-5'>Are you searching for voice dubbing that doesn't sound robotic and awkward? We have over voice of the original character in the resulting video.</p>
              </div>
            </div>
            <div className="border-bottom fw-bolder border-dark mb-4 mt-4"></div>
            <div className="col-md-12 text-center mt-5">
              <p className="fw-bold display-5 text-danger mt-5">How it Works</p>
              <p className="fw-bold fs-1 mt-4">
                Create efficient content in minutes,<br />
                not hours
              </p>
              <p className="fs-5 mt-5">Get your videos automatically translated and dubbed with one click.</p>

              <div className="row justify-content-center mt-5">
                <div className="col-md-5 col-sm-12 bg-dark text-white rounded p-4 mt-4 responsive-div" style={{ margin: '0 0.5em' }}>
                  <BsCloudUploadFill className="fs-1 text-danger" />
                  <p className="fs-3">
                    1. Upload/Select & Process
                  </p>
                  <p className="fs-5">
                    Upload your video from your computer and Choose the original language used in the video.
                  </p>
                  <p className="fs-5">
                    Choose the target language you want it translated to and then wait for the preocessing time.
                  </p>
                </div>
                <div className="col-md-5 col-sm-12 bg-dark text-white rounded p-4 mt-4 responsive-div" style={{ margin: '0 0.5em' }}>
                  <BsCloudDownloadFill className="fs-1 text-danger" />
                  <p className="fs-3">
                    2. Download / Edit & Export
                  </p>
                  <p className="fs-5">
                    Once it's done, either click Download Video to finish or Edit Video to make changes.
                  </p>
                  <p className="fs-5">
                    Pick from a wide array of customizable tools. When done, choose Export.
                  </p>
                </div>
              </div>
              <div className="border-bottom fw-bolder border-dark mb-4 mt-5"></div>
              <div className="container-fluid mt-5 px-0 " >
                <div className="row justify-content-center py-5" >
                  <div className="col-md-6 rounded text-center"  >
                    <img src={process.env.PUBLIC_URL + '/assets/translate.png'} alt="translate" className="img-fluid"  />
                  </div>
                  <div className="col-md-6 text-start my-auto" style={{paddingLeft:"50px"}} >
                  <p className="fs-4 text-danger">
                  AUTO CAPTION & SUBTITLES
                    </p>
                    <p className="fs-3 fw-bold">
                      No more wasting time manually transcribing
                    </p>
                    <p className='fs-5'>
                      Don't like manually transcribing? You're not alone. Our auto captioning saves you time and headaches by automatically generating captions and subtitles. Plus, it handles synchronization. No more manual timing either!
                    </p>
                    <button className="btn btn-warning btn-lg">Get Started</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FeedbackForm/>
        </div>
      </div>

    </div>

  );
};

export default Home;