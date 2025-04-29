// import React from "react";
// import { Link } from "react-router-dom";

// const PagenotFound = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-center px-4">
//       <div className="animate-bounce text-6xl mb-6">😵</div>
//       <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-pink-500 drop-shadow-lg mb-4">
//         404
//       </h1>
//       <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wide">
//         Oops! Page Not Found
//       </h2>
//       <p className="text-gray-300 mb-8 max-w-md">
//         The page you are looking for doesn’t exist or might have been moved.
//         Let’s get you back home.
//       </p>
//       {/* <Link
//         to="/signup"
//         className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105"
//       >
//         Go Home
//       </Link> */}
//     </div>
//   );
// };

// export default PagenotFound;

import React from "react";
import { Link } from "react-router-dom";

const PagenotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  bg-white px-4">
      <div className="max-w-xl text-center">
        <div className="relative inline-block">
          <div className="animate-spin text-6xl mb-5">😵</div>
          <span className="text-[100px] font-extrabold text-red-700  leading-none">
            404
          </span>
          <span className="absolute bottom-0 right-0 rotate-15 translate-x-7 translate-y-7 bg-[#ffffff] animate-bounce text-black text-sm font-semibold px-1 py-1 border-1 rounded shadow-md font-mono">
            Lost?
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-8 mb-3">
          Whoops! Page not found.
        </h2>
        <p className="text-gray-500 mb-6">
          The page you’re looking for doesn’t exist or may have been moved!
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-[#ff6f61] to-[#fe9a8b] text-white rounded-xl text-base font-medium shadow-sm hover:shadow-sm hover:opacity-90 transition-all duration-300"
        >
          Take Me Home
        </Link>
      </div>
    </div>
  );
};

export default PagenotFound;
