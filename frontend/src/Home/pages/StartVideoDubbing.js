import React, { Fragment, useState, useCallback, useRef, useEffect } from "react";
import "../CSS/StartDubbing.css";
import Webcam from "react-webcam";
import MetaData from "../../layout/MetaData";
import { useAlert } from "react-alert";
import ReactPlayer from "react-player";
import { AudioRecorder } from "react-audio-voice-recorder";
import ReactAudioPlayer from "react-audio-player";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/Loader/Loader";
import { generate_Dub } from "../../actions/dubbingAction";



const StartVideoRecordUpload = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoFileName, setVideoFileName] = useState(null);

  const [source, setSource] = useState(null);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [audioUploaded, setAudioUploaded] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [audioFileName, setAudioFileName] = useState(null);
  const VideoTab = useRef(null);
  const switcherTab = useRef(null);
  const dispatch = useDispatch();
  const alert = useAlert();


  const onFileChangeVideo = (e) => {
    setVideoFileName(e.target.files[0]);
  };


  const handleVideoChange = (event) => {
    const file = event.target.files[0];


    if (file) {
      const validVideoTypes = ['video/mp4', 'video/webm'];
      if (validVideoTypes.includes(file.type)) {

        setVideoFileName(null);
        setSource(file)
        setVideoUploaded(true);
        setSelectedVideo(URL.createObjectURL(file));
        onFileChangeVideo(event);
      } else {
        setSelectedVideo(null);
        setVideoUploaded(false);
        alert.error('Please select a valid video file');
      }
    } else {
      setSelectedVideo(null);
      alert.error('Please select a video file');
    }
  };


  /////////////////////////
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [camera, setCamera] = useState(false);
  const [showButtons, setShowButtons] = useState(false);


  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    if (camera) {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  }, [webcamRef, setCapturing, camera, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCamera(false);
    setCapturing(false);
    if (recordedChunks.length > 0 || recordedChunks.length === 0) {
      alert.info("Video Recorded successfully, Click On Download");
    }
  }, [mediaRecorderRef, alert, recordedChunks, setCamera, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const handleCameraClick = () => {
    setCamera((prevCameraState) => !prevCameraState);
  };
  const videoConstraints = {
    width: 400,
    height: 500,
    facingMode: "user",
  };
  /////////////////////////////////////////////

  const onFileChangeAudio = (e) => {
    setAudioFileName(e.target.files[0]);
  };
  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3'];
      if (validAudioTypes.includes(file.type)) {
        setSource(file);
        setAudioUploaded(true);
        setSelectedFile(URL.createObjectURL(file));
        onFileChangeAudio(event);
      } else {
        setSelectedFile(null);
        setAudioUploaded(false);
        alert.error('Please select a valid audio file');
      }
    } else {
      setSelectedFile(null);
      alert.error('Please select an audio file');
    }
  };

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  const StartDubbing = (e) => {
    e.preventDefault();
    if (audioUploaded && videoUploaded) {
      alert.error('Please upload either audio or video, not both.');
      return;
    }
    const myForm = new FormData();
    if (videoUploaded) {
      myForm.append("source", source);
      dispatch(generate_Dub(myForm));
    } else if (audioUploaded) {
      myForm.append("source", source);
      dispatch(generate_Dub(myForm));
    } else {
      alert.error('Please upload either audio or video.');
    }
  };
  let { err, loading } = useSelector(
    (state) => state
  );

  useEffect(() => {

    if (camera) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowButtons(false);
    }
  }, [camera, err]);

  const remove = () => {
    if (videoUploaded) {
      setSelectedVideo(null);
      setVideoFileName(null);
      setSource(null); 
      setVideoUploaded(false);
    
    }
    if(audioUploaded){
      setSelectedFile(null);
      setAudioFileName(null);
      setSource(null); 
      setAudioUploaded(false);
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Dub Video" />

          <div className="container-fluid bg-dark text-white container">
            <div className="vh-100 toogleContainer col-md-8">
              <div className="Header">
                <div className="Audio_Video_toggle">
                  <p>Orignal Content</p>
                  <p>Dubbed Content</p>
                </div>
                <button ref={switcherTab} className="shifter"></button>
              </div>

              {/* -------------------------------------------------------- */}
              {/* video part */}

              <div className="mainVideoBox" ref={VideoTab}>
                {/* video box start  */}
                <div className="videoBox ">
                  <div className="orignalVideoBox">
                    <ReactPlayer
                      controls
                      playIcon
                      url={selectedVideo}
                      width="100%"
                      height="100%"
                    />
                  </div>

                  <div className="dubbedVideoBox"></div>
                </div>

                {/* video box end */}
                {/* audio box start */}
                <div className="AudioBox ">
                  <div className="orignalAudioBox">
                      <ReactAudioPlayer
                        src={selectedFile}
                        controls
                      />
                    

                  </div>

                  <div className="dubbedAudioBox"></div>
                </div>

                <div className="mainUploadRecordVideoAudio" >
                  <div className="uploadVideo">
                    {!audioUploaded && <form className="browseVideo" id="myForm" method="POST" encType="multipart/form-data" onSubmit={StartDubbing}>
                      <label htmlFor="inp">Browse Video</label>
                      <label style={{ visibility: "hidden" }} htmlFor="inputButton"></label>

                      {videoFileName?.name && (
                        <p className="videoFileName">
                          {videoFileName.name.split(" ").slice(0, 2).join(" ")}
                          {videoFileName.name.split(" ").length > 2 && "..."}
                        </p>

                      )}
                      <input
                        type="file"
                        id="inp"
                        name="source"
                        accept="video/mp4"
                        style={{ display: "none" }}
                        onChange={handleVideoChange}
                      />

                    </form>}
                    


                    {!videoUploaded && <form className="browseAudio" id="myForm" method="POST" encType="multipart/form-data" onSubmit={StartDubbing}>
                      <label htmlFor="input-file">Browse Audio</label>
                      <label style={{ visibility: "hidden" }} htmlFor="inputButton"></label>

                      {audioFileName?.name && (
                        <p className="audioFileName">
                          {audioFileName.name.split(" ").slice(0, 2).join(" ")}
                          {audioFileName.name.split(" ").length > 2 && "..."}
                        </p>
                      )}
                      <input
                        type="file"
                        id="input-file"
                        name="source"
                        accept="audio/mp3"
                        style={{ display: "none" }}
                        onChange={handleAudioChange}
                      />
                      </form>}
                    <Tooltip title="remove file">
                    <button className="del_icon" onClick={remove}>
                    <i className="fas fa-trash"></i>
                        </button>
                      </Tooltip>
                  </div>

                  <div className="recordAudio">

                    <div className="recordVideo ">
                      <Tooltip title="Start Recording">
                        <button onClick={handleCameraClick}>
                          {" "}
                          <i className="fas fa-camera"></i>
                        </button>
                      </Tooltip>
                      {recordedChunks.length > 0 && (
                        <Tooltip title="Download Recording">
                          <button onClick={handleDownload}>
                            <i className="fas fa-download"></i>
                          </button>
                        </Tooltip>
                      )}
                    </div>
                    <div className="recordAudioButton">
                      <AudioRecorder
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                          noiseSuppression: true,
                          echoCancellation: true,
                        }}
                        downloadOnSavePress={true}
                        downloadFileExtension="webm"
                        />
                        
                      </div>
                      
                  </div>
                </div>
              </div>

              <div className="startButton">
                <input value="Generate" id="inputButton" form="myForm" type="submit" />

              </div>
            </div>

            <div className="mainCamera">
              <div className="camera">
                {camera ? (
                  <Webcam
                    height={1080}
                    width={1920}
                    audio={true}
                    mirrored={true}
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                  />
                ) : (
                  <></>
                )}
              </div>

              <div className="onCameraIcons">
                {capturing ? (
                  <Tooltip title="Stop">
                    <button className="stop" onClick={handleStopCaptureClick}>
                      <i className="fas fa-square"></i>
                    </button>
                  </Tooltip>
                ) : (
                  <>
                    {camera && showButtons && (
                      <>
                        <Tooltip title="Start">
                          <button className="start" onClick={handleStartCaptureClick}>
                            <i className="fas fa-circle"></i>
                          </button>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <button className="cancel" onClick={handleCameraClick}>
                            <i className="fas fa-times"></i>
                          </button>
                        </Tooltip>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default StartVideoRecordUpload;