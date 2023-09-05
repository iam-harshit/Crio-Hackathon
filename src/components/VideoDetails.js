import React from "react";
import SuggestionVideoCard from "./SuggestionVideoCard";
import VideoCard from "./VideoCard";

const VideoDetails = ({ url, chapters }) => {

  return (
    <div className="flex justify-center flex-row h-full bg-white">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-auto md:h-[400px] lg:h-[400px] xl:h-[420px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <VideoCard url={url} chapters={chapters} />
          </div>
          <div className="text-black font-bold text-sm md:text-xl line-clamp-2 pt-20">
            Hello, this is a sample video
          </div>
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          <SuggestionVideoCard />
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
