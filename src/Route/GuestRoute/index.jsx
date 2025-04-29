import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../constant/Firebase";

const GuestRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <>
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="w-16 h-16 border-1 border-dashed rounded-full animate-spin border-t-transparent border-l-transparent border-b-transparent border-r-4 border-r-gradient-to-t from-[#d67b7b] to-[#f8b0b0]"></div>
          <p className="mt-4 text-lg font-bold font-mono">Loading...</p>
        </div>
      </>
    );
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default GuestRoute;
