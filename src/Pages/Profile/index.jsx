import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../constant/Firebase";
import { FaUserCircle } from "react-icons/fa";
import { paths } from "../../constant/Paths";
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName || "User Name",
        email: currentUser.email,
      });
    } else {
      navigate(paths.login);
    }
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate(paths.login);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleConfirmLogout = () => {
    setShowConfirm(false);
    handleSignOut();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 25,
        duration: 0.5,
      }}
      className="flex justify-center px-2 lg:px-0 relative"
    >
      <motion.div
        className="bg-white p-5 md:p-8 rounded-lg shadow-sm w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.6,
        }}
      >
        <motion.h2
          className="text-center font-bold text-3xl mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Profile
        </motion.h2>

        <motion.div
          className="bg-gray-100 p-6 rounded-lg shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.6,
          }}
        >
          <motion.div
            className="flex justify-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.5,
            }}
          >
            <FaUserCircle className="w-14 h-14" />
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.5,
            }}
          >
            <h3 className="text-xl font-bold text-gray-700">{user?.name}</h3>
            <p className="text-gray-500">{user?.email}</p>
          </motion.div>

          <motion.button
            onClick={() => setShowConfirm(true)}
            className="mt-6 w-full bg-gradient-to-r from-[#ff6f61] to-[#fe9a8b] text-white shadow-md hover:opacity-90 font-bold py-2 px-4 rounded-lg transition-all duration-200 cursor-pointer"
            whileTap={{ scale: 0.98 }}
          >
            Log Out
          </motion.button>
        </motion.div>
      </motion.div>

      {showConfirm && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showConfirm ? 1 : 0, y: showConfirm ? 0 : 50 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            duration: 0.5,
          }}
          className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showConfirm ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg font-semibold cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Yes, Log Out
              </motion.button>
              <motion.button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg font-semibold cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Profile;