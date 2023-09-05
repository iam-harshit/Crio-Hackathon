import React from "react";
import SuggestionVideoCard from "./SuggestionVideoCard";
import VideoCard from "./VideoCard";
import VideoDescription from "./VideoDescription";

const VideoDetails = ({ url, chapters }) => {
  return (
    <div className="flex justify-center flex-row h-screen bg-white overflow-hidden">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row  overflow-y-auto">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 space-y-4 h-auto">
          <div className="flex-shrink-0">
            <VideoCard url={url} chapters={chapters} />
          </div>
          <VideoDescription />
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          <SuggestionVideoCard />
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
