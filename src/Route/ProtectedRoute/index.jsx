// import React from "react";
// import { Navigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";

// const ProtectedRoute = ({ children }) => {
//   const user = getAuth().currentUser;

//   return user ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-16 h-16 border-1 border-dashed rounded-full animate-spin border-t-transparent border-l-transparent border-b-transparent border-r-4 border-r-gradient-to-t from-[#d67b7b] to-[#f8b0b0]"></div>
        <p className="mt-4 text-lg font-bold font-mono">Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
