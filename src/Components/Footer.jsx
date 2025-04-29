import React from "react";
import { Link, NavLink } from "react-router-dom";
import { paths } from "../constant/Paths";

const Footer = () => {
  return (
    <footer className="bg-white shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1)]">
      <hr className=" border-gray-200 " />
      <div className="max-w-6xl mx-auto px-4 py-2 md:py-4 flex flex-col md:flex-row justify-center items-center">
        {/* <p className="text-xl px-4 font-bold mb-2 md:mb-0 border-b bg-gradient-to-r from-[#ff6f61] to-[#d7263d] text-transparent bg-clip-text">
          Social
          <span className="text-[#4a2c2a]">Feed</span>
        </p> */}    

        {/* <div className="flex gap-4 text-sm ">
          <Link
            to="/"
            className="px-3 py-1 rounded-xl text-[#d7263d] hover:bg-[#ffd5db] transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/profile"
            className="px-3 py-1 rounded-xl text-[#d7263d] hover:bg-[#ffd5db] transition-colors duration-200"
          >
            Profile
          </Link>
        </div> */}

        <div className="text-center text-sm font-medium text-[#6c2e2e] mt-2 mb-2 md:mb-0 md:mt-0">
          © {new Date().getFullYear()}{" "}
          <NavLink to={paths.home} className=" font-bold">
            <span className="bg-gradient-to-r from-[#ff6f61] to-[#fe9a8b] text-transparent bg-clip-text">
              Social
            </span>
            <span className="text-[#4a2c2a]">Feed.</span>
          </NavLink>{" "}
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
