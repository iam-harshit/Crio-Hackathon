import React from "react";
import { Link } from "react-router-dom";
import crioLogoMobile from "../assets/crio-logo.png";
import { IoIosSearch } from "react-icons/io";

const Header = () => {

  return (
    <div className="sticky top-0 z-10 pb-2 pt-2 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-[#212529]" style={{backgroundColor: '#212529'}}>

      <div className="flex h-5 items-center">
        <Link to="/" className="flex h-7 items-center">
         <img
      className="h-full ml-5 w-[100px] dark:md:block"
      src={crioLogoMobile}
      alt="Crio.Do"
    />
        </Link>
      </div>
      <div className="group flex items-center">
        <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            <IoIosSearch className="text-white text-xl" />
          </div>
          <input
            type="text"
            className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
            placeholder="Search"
          />
        </div>
        <button
          className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]">
          <IoIosSearch className="text-white text-xl" />
        </button>
      </div>

    </div>
  );
};

export default Header;
