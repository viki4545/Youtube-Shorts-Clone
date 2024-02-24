import React, { useEffect, useRef, useState } from "react";
import "./Shorts.css";

const Shorts = () => {
  const [playPause, setPlaypause] = useState(true);
  const [volume, setVolume] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const vidRef = useRef(null);

  const handlePlayPause = (state) => {
    if (state === true) {
      vidRef.current.play();
    } else {
      vidRef.current.pause();
    }
  };

  useEffect(() => {
    const videoElement = document.getElementById("playMuteVideo");
    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };
    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
    };
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const calculateProgress = () => {
    return (currentTime / duration) * 100;
  };

  return (
    <>
      <div className="container">
        <div className="content-container">
          <div className="videoBox">
            <video
              ref={vidRef}
              src="../../../assets/Videos/cartoonDog.mp4"
              id="playMuteVideo"
              muted
              autoPlay
              loop
            ></video>
            <div className="controls">
              <div
                className={
                  playPause === true
                    ? "videoIcon play active"
                    : "videoIcon play"
                }
              >
                <i className="fa-solid fa-pause"></i>
                <i className="fa-solid fa-play"></i>
              </div>
              <div
                onClick={() => setVolume(!volume)}
                className={
                  volume === true ? "videoIcon mute active" : "videoIcon mute"
                }
              >
                <i className="fa-solid fa-volume-high"></i>
                <i className="fa-solid fa-volume-xmark"></i>
              </div>
            </div>
            <div className="content">
              <div className="detail">
                <div className="imgBox">
                  <div className="img">
                    <img src="../../../assets/Images/avatar.png" alt="" />
                  </div>
                  <h4>
                    Viki's Code{" "}
                    <span>
                      <small>Viki's Code</small>
                    </span>
                  </h4>
                </div>
                <div className="btn">
                  <button>Subscribe</button>
                </div>
              </div>
              <div className="text">
                <h5>
                  moco dog cartoon | funny cartoon status for whatsapp #shorts
                  #xanimeshorts #cartoonstatus
                </h5>
              </div>
            </div>
            <ul
              className="centerPlayPause"
              onClick={() => {
                setPlaypause(!playPause);
                handlePlayPause(playPause);
              }}
            >
              <li className={playPause === false ? "first active" : "first"}>
                <i className="fa-solid fa-play"></i>
              </li>
              <li className={playPause === true ? "second active" : "second"}>
                <i className="fa-solid fa-pause"></i>
              </li>
            </ul>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
          <div className="sideButtons-container"></div>
        </div>
      </div>
    </>
  );
};

export default Shorts;
