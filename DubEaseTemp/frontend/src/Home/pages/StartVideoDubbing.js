import React, { useState, useCallback, useRef, useEffect } from "react";
import "../CSS/StartDubbing.css";
import Webcam from "react-webcam";
import { useAlert } from "react-alert";
import ReactPlayer from "react-player";
import { AudioRecorder } from "react-audio-voice-recorder";
import ReactAudioPlayer from "react-audio-player";
import { Tooltip } from "@mui/material";

const StartVideoRecordUpload = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const alert = useAlert();
  const [videoFileName, setVideoFileName] = useState(null);
 
  const onFileChangeVideo = (e) => {
    setVideoFileName(e.target.files[0]);
  };

  const VideoTab = useRef(null);
  const switcherTab = useRef(null);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validVideoTypes = ['video/mp4']; 
      if (validVideoTypes.includes(file.type)) {
        setSelectedVideo(URL.createObjectURL(file));
        onFileChangeVideo(event);
      } else {
        setSelectedVideo(null);
        alert.error('Please select a valid video file');
      }
    } else {
      setSelectedVideo(null);
      alert.error('Please select a video file');
    }
  };
  

  const StartDubbing = () => {};

  /////////////////////////
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [camera, setCamera] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (camera) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowButtons(false);
    }
  }, [camera]);

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

  const [selectedFile, setSelectedFile] = useState(null);
  const [audioFileName, setAudioFileName] = useState(null);

  const onFileChangeAudio = (e) => {
    setAudioFileName(e.target.files[0]);
  };
  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3']; 
      if (validAudioTypes.includes(file.type)) {
        setSelectedFile(URL.createObjectURL(file));
        onFileChangeAudio(event);
      } else {
        setSelectedFile(null);
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

  return (
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
                autoPlay
                controls
                
              />
              
            </div>

            <div className="dubbedAudioBox"></div>
          </div>

          <div className="mainUploadRecordVideoAudio">
            <div className="uploadVideo">
              <div className="browseVideo">
                <label htmlFor="inp">Browse Video</label>
                {videoFileName?.name && (
                  <p className="videoFileName">
                    {videoFileName.name.split(" ").slice(0, 2).join(" ")}
                    {videoFileName.name.split(" ").length > 2 && "..."}
                  </p>
                )}
                <input
                  type="file"
                  id="inp"
                  accept="video/mp4"
                  style={{ display: "none" }}
                  onChange={handleVideoChange}
                />
              </div>

              <div className="browseAudio">
                <label htmlFor="input-file">Browse Audio</label>
                {audioFileName?.name && (
                  <p className="audioFileName">
                    {audioFileName.name.split(" ").slice(0, 2).join(" ")}
                    {audioFileName.name.split(" ").length > 2 && "..."}
                  </p>
                )}
                <input
                  type="file"
                  id="input-file"
                  accept="audio/mp3"
                  style={{ display: "none" }}
                  onChange={handleAudioChange}
                />
              </div>

              
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
          <button type="submit" onClick={StartDubbing}>
            <span>Generate</span>
          </button>
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
  );
};
export default StartVideoRecordUpload;
