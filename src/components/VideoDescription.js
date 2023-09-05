import { Link } from "react-router-dom";

const VideoDescription = () => {
  return (
    <div className="bg-gray-200 p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 rounded-xl">
      <div className="text-black font-bold text-xs sm:text-sm md:text-base lg:text-xl line-clamp-2">
        Hello, this is a sample video
      </div>
      <div className="mt-2 sm:mt-3 md:mt-4">
        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="mt-2 sm:mt-3 md:mt-4">
        <ul className="space-y-1 sm:space-y-2">
          <li className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
            <Link className="text-blue-500 hover:underline">00:10 Introduction</Link>
          </li>
          <li className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
            <Link className="text-blue-500 hover:underline">02:40 What is computing?</Link>
          </li>
          <li className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
            <Link className="text-blue-500 hover:underline">02:50 Why we need?</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VideoDescription;
