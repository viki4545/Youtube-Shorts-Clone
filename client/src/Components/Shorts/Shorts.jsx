import React, { useEffect, useRef, useState } from "react";
import "./Shorts.css";

const Shorts = () => {
  const [playPause, setPlaypause] = useState(true);
  const [volume, setVolume] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLike, setIsLike] = useState();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const vidRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handlePlayPause = (state) => {
    if (state === true) {
      vidRef.current.play();
    } else {
      vidRef.current.pause();
    }
  };

  const videoList = [
    {
      title:
        "moco dog cartoon | funny cartoon status for whatsapp #shorts #xanimeshorts #cartoonstatus",
      url: "../../../assets/Videos/cartoonDog.mp4",
    },
    {
      title: "Full tutorial on making rainbow cake",
      url: "../../../assets/Videos/cakeMaking.mp4",
    },
    {
      title: "Jana Gana Mana - Marble Music",
      url: "../../../assets/Videos/JanaGana.mp4",
    },
    // Add more videos as needed
  ];

  useEffect(() => {
    // const videoElement = document.getElementById("playMuteVideo");
    const videoElement = vidRef.current;
    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };
    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
      setVideoLoaded(true);
    };
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentVideoIndex]);

  useEffect(() => {
    vidRef.current.src = videoList[currentVideoIndex].url;
    vidRef.current.load();
    if (videoLoaded) {
      vidRef.current.play();
    }
  }, [currentVideoIndex, videoLoaded]);

  const calculateProgress = () => {
    return (currentTime / duration) * 100;
  };

  const handleMobileSwipe = (event) => {
    const { deltaY } = event;
    if (deltaY > 0) {
      // Swiped down
      if (currentVideoIndex < videoList.length - 1) {
        setCurrentVideoIndex(currentVideoIndex + 1);
      }
    } else {
      // Swiped up
      if (currentVideoIndex > 0) {
        setCurrentVideoIndex(currentVideoIndex - 1);
      }
    }
  };

  const handleDesktopButtonClick = (direction) => {
    if (direction === "prev" && currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    } else if (
      direction === "next" &&
      currentVideoIndex < videoList.length - 1
    ) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  return (
    <>
      <div className="container">
        <div
          className="content-container"
          onTouchStart={(e) => handleMobileSwipe(e)}
        >
          <div className="videoBox">
            <video
              ref={vidRef}
              // src={videoList[currentVideoIndex].url}
              id="playMuteVideo"
              muted={volume === true ? true : false}
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
                <h5>{videoList[currentVideoIndex].title}</h5>
              </div>
            </div>
            <ul
              className="centerPlayPause"
              onClick={() => {
                setPlaypause(!playPause);
                handlePlayPause(playPause);
              }}
            >
              <li className={playPause === true ? "first active" : "first"}>
                <i className="fa-solid fa-play"></i>
              </li>
              <li className={playPause === false ? "second active" : "second"}>
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
          <div className="sideButtons-container">
            <ul>
              <li>
                <a href="#">
                  <span
                    className={
                      isLike === true
                        ? "icons thumbsUp active"
                        : "icons thumbsUp"
                    }
                    onClick={() => {
                      setIsLike(true);
                    }}
                  >
                    <i className="fa-solid fa-thumbs-up"></i>
                  </span>
                  <span className="title">10k</span>
                  <div className="hover">
                    <p>I like this</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span
                    className={
                      isLike === false
                        ? "icons thumbsDown active"
                        : "icons thumbsDown"
                    }
                    onClick={() => {
                      setIsLike(false);
                    }}
                  >
                    <i className="fa-solid fa-thumbs-down"></i>
                  </span>
                  <span className="title">Dislike</span>
                  <div className="hover">
                    <p>I dislike this</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icons">
                    <i className="fa-solid fa-message"></i>
                  </span>
                  <span className="title">532</span>
                  <div className="hover">
                    <p>Comments</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icons">
                    <i className="fa-solid fa-share"></i>
                  </span>
                  <span className="title">Share</span>
                  <div className="hover">
                    <p>Share</p>
                  </div>
                </a>
              </li>
            </ul>
            <ul className="bottom-icon">
              <li>
                <a href="">
                  <span className="icons">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="../../../assets/Images/avatar.png" alt="userImg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="nav-buttons">
        <button
          onClick={() => handleDesktopButtonClick("prev")}
          disabled={currentVideoIndex === 0}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
        <button
          onClick={() => handleDesktopButtonClick("next")}
          disabled={currentVideoIndex === videoList.length - 1}
        >
          <i className="fa-solid fa-arrow-down"></i>
        </button>
      </div>
    </>
  );
};

export default Shorts;
