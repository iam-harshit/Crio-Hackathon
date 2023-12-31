import React, { useContext } from "react";
import { Link } from "react-router-dom";
import video from "../assets/video-1.mp4";
import { Context } from "../context/contextApi";

const SuggestionVideoCard = () => {
  const {videos} = useContext(Context); 
  return (
    <Link to="video">
    {videos[0]?.chapters?.map((chapter, index) => (
      <div className="flex mb-3" key={index}>
        <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
          <video width="320" height="240" controls>
            <source src={video} type="video/mp4"/>
          </video>
          <p className="text-black">00:10</p>
        </div>
        <div className="flex flex-col ml-3 overflow-hidden">
          <span className="text-sm lg:te0xt-xs xl:text-sm font-bold line-clamp-2 text-black">
            {chapter?.headline}
          </span>
        </div>
      </div>
      ))}
    </Link>
  );
}

export default SuggestionVideoCard;