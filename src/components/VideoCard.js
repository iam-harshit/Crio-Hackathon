import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";
import {
  BsPlayFill,
  BsFullscreen,
  BsFullscreenExit,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { CgPlayPause } from "react-icons/cg";

const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hrs > 0 ? `${String(hrs).padStart(2, "0")}:` : ""}${String(
    mins
  ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const BifurcationPlayer = ({ url, chapters }) => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });
  const [playbackRate, setPlaybackRate] = useState(1); // 1 is the normal speed
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const speedOptions = [0.75, 1, 1.25, 1.5, 1.75];
  const [showControls, setShowControls] = useState(true);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [playTimeout, setPlayTimeout] = useState(null);

  const handleProgress = ({ played }) => {
    setPlayed(played);
  };

  const handleDuration = (dur) => {
    setDuration(dur);
  };

  const seekToChapter = (start) => {
    if (playerRef.current) {
      playerRef.current.seekTo(start);
    }
  };

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      } else if (playerContainerRef.current.mozRequestFullScreen) {
        /* Firefox */
        playerContainerRef.current.mozRequestFullScreen();
      } else if (playerContainerRef.current.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        playerContainerRef.current.webkitRequestFullscreen();
      } else if (playerContainerRef.current.msRequestFullscreen) {
        /* IE/Edge */
        playerContainerRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari & Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  //   const showPlayerControls = () => {
  //     setShowControls(true);
  //     if (hoverTimeout) {
  //       clearTimeout(hoverTimeout);
  //     }
  //     const timeout = setTimeout(() => {
  //       setShowControls(false);
  //     }, 4000);
  //     setHoverTimeout(timeout);
  //   };

  //   const hidePlayerControls = () => {
  //     if (playing) {
  //       if (hoverTimeout) {
  //         clearTimeout(hoverTimeout);
  //       }
  //       const timeout = setTimeout(() => {
  //         setShowControls(false);
  //       }, 4000);
  //       setHoverTimeout(timeout);
  //     }
  //   };

  const showPlayerControls = () => {
    setShowControls(true);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout); // Clear any existing timeout
    }
  };

  const hidePlayerControls = () => {
    setShowControls(false);
  };

  const startPlayTimeout = () => {
    if (playTimeout) {
      clearTimeout(playTimeout);
    }
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 10000);
    setPlayTimeout(timeout);
  };

  return (
    <div>
    <div
      className="chaptered-player-container"
      ref={playerContainerRef}
      onMouseEnter={showPlayerControls}
      onMouseLeave={hidePlayerControls}
      tabIndex={0}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        volume={volume}
        onProgress={handleProgress}
        onDuration={handleDuration}
        playbackRate={playbackRate}
        controls={false}
        // onPlay={startPlayTimeout}
        onPause={() => {
          if (playTimeout) {
            clearTimeout(playTimeout);
          }
          setShowControls(true);
        }}
        width="100%"
        height="100%"
        className="player"
      />
      {showControls && (
        <div className="player-controls">
          <div className="top-controls">
            <button className="play-pause-btn" onClick={togglePlay}>
              {playing ? (
                <CgPlayPause className="play-pause-icon" />
              ) : (
                <BsPlayFill className="play-pause-icon" />
              )}
            </button>
            <div className="timestamp">
              {formatDuration(Math.floor(played * duration))} /{" "}
              {formatDuration(Math.floor(duration))}
            </div>
          </div>
          <div className="progress-bar-container">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                className="progress-segment"
                style={{
                  width: `${(chapter.end - chapter.start) * 100}%`,
                  marginRight: `${
                    index !== chapters.length - 1 ? "3px" : "0px"
                  }`,
                  cursor: "pointer",
                }}
                onClick={() => seekToChapter(chapter.start)}
                onMouseOver={() => setTooltip({ ...tooltip, visible: true })}
                onMouseMove={(e) => {
                  const progressBarWidth =
                    e.currentTarget.parentNode.offsetWidth;
                  const hoveredWidth =
                    e.nativeEvent.offsetX + e.currentTarget.offsetLeft;

                  const hoverTimeInSeconds =
                    (hoveredWidth / progressBarWidth) * duration;

                  setTooltip({
                    visible: true,
                    x: e.clientX,
                    y: e.clientY,
                    content: `${formatDuration(hoverTimeInSeconds)} - ${
                      chapter.title
                    }`,
                  });
                }}
                onMouseOut={() => setTooltip({ ...tooltip, visible: false })}
              >
                <div
                  className="played-progress"
                  style={{
                    width:
                      played >= chapter.end
                        ? "100%"
                        : played > chapter.start
                        ? `${
                            ((played - chapter.start) /
                              (chapter.end - chapter.start)) *
                            100
                          }%`
                        : "0%",
                  }}
                ></div>
                {tooltip.visible && (
                  <div
                    className="tooltip"
                    style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
                  >
                    {tooltip.content}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="volume-control">
            <div>
              <label>
                {volume > 0 ? (
                  <BiSolidVolumeFull className="volume-icon" />
                ) : (
                  <BiSolidVolumeMute className="volume-icon" />
                )}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
              />
            </div>
            <div className="playback-speed-control">
              <button
                className="fullscreen-btn"
                onClick={handleFullscreenToggle}
              >
                {isFullscreen ? <BsFullscreenExit /> : <BsFullscreen />}
              </button>

              <button
                className="three-dots-button"
                onClick={() => setShowSpeedOptions(!showSpeedOptions)}
              >
                <BsThreeDotsVertical className="three-dots-icon" />
              </button>
              {showSpeedOptions && (
                <div className="speed-options-dropdown">
                  {speedOptions.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => {
                        setPlaybackRate(rate);
                        setShowSpeedOptions(false);
                      }}
                      className={playbackRate === rate ? "active" : ""}
                    >
                      {rate === 1 ? "Normal" : rate}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default BifurcationPlayer;
