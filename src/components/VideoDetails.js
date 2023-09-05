import React, { useContext } from "react";
import SuggestionVideoCard from "./SuggestionVideoCard";
import VideoCard from "./VideoCard";
import VideoDescription from "./VideoDescription";
import { Context } from "../context/contextApi";

const VideoDetails = () => {
  const {videos} = useContext(Context);
  return (
    <div>
    
    <div className="flex justify-center mt-11 flex-row h-screen bg-white">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 space-y-4 h-auto ">
          <div className="flex-shrink-0">
            <VideoCard videoData={videos} />
          </div>
          <VideoDescription />
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          <SuggestionVideoCard />
        </div>
      </div>

    </div>
    </div>
  );
};

export default VideoDetails;
