import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

const BifurcationPlayer = ({ url, chapters }) => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const playerRef = useRef(null);

  const handleProgress = ({ played }) => {
    setPlayed(played);
  };

  const seekToChapter = (start) => {
    if (playerRef.current) {
      playerRef.current.seekTo(start);
    }
  };

  const togglePlay = () => {
    setPlaying(!playing);
  };

  return (
    <div>
      <div className="chaptered-player-container">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={playing}
          onProgress={handleProgress}
          controls={false}
          className="player"
        />
        <div className="player-controls">
          <button className="play-pause-btn" onClick={togglePlay}>
            {playing ? "||" : "|>"}
          </button>
          <div className="progress-bar-container">
            <div
              className="played-progress"
              style={{ width: `${played * 100}%` }}
            ></div>
            {chapters.map((chapter, index) => (
              <div
                key={index}
                className="chapter-marker"
                style={{ left: `${chapter.start * 100}%` }}
                onClick={() => seekToChapter(chapter.start)}
                title={chapter.title}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BifurcationPlayer;
