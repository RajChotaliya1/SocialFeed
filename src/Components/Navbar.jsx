import React, { useState, useEffect } from "react";
import { FaUser, FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaHome } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../constant/Firebase";
import { paths } from "../constant/Paths";
import { IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion"; // import framer-motion

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false); // state for the modal visibility
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    setUserMenuOpen(false);
    navigate(paths.login);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowConfirm(false); // Close the modal after confirming
  };

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 text-sm font-medium rounded transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-[#ff6f61] to-[#fe9a8b] text-white "
        : "bg-[#f1f1f1] text-[#d67b7b] hover:bg-[#fce4e4]"
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to={paths.home} className="text-xl md:text-2xl font-extrabold">
          <span className="bg-gradient-to-r from-[#ff6f61] to-[#fe9a8b] text-transparent bg-clip-text">
            Social
          </span>
          <span className="text-[#4a2c2a]">Feed</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 relative">
          <NavLink to={paths.home} className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to={paths.postpage} className={navLinkClass}>
            + New Post
          </NavLink>

          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="text-2xl text-[#1d3557] focus:outline-none"
            >
              <FaUserCircle className="text-center text-3xl mt-1 hover:text-[#b05c5c] cursor-pointer" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-20">
                {user && (
                  <>
                    <NavLink
                      to={paths.profile}
                      className="block px-4 py-2 text-sm text-[#1d3557] hover:bg-[#f1f1f1]"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FaUser className="inline w-3 h-3 mb-0.5 mr-2" />
                      Profile
                    </NavLink>
                    <NavLink
                      onClick={() => setShowConfirm(true)}
                      className="block px-4 py-2 text-sm text-[#1d3557] hover:bg-[#f1f1f1]"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Logout
                    </NavLink>
                  </>
                )}
                {!user && (
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 text-sm text-[#1d3557] hover:bg-[#f1f1f1]"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <FaSignInAlt className="inline mr-2" />
                    Login
                  </NavLink>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-[#1d3557]"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border bg-white border-gray-100 mx-auto w-[94%] left-0 absolute right-0 m-3 rounded-sm pt-4 px-4 pb-4 space-y-2 text-start shadow-md">
          <NavLink
            to={paths.home}
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            <FaHome className="inline mr-2 mb-1" />
            Home
          </NavLink>
          <NavLink
            to={paths.postpage}
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            <IoMdAdd className="inline mr-2 mb-1" />
            New post
          </NavLink>
          <NavLink
            to={paths.profile}
            className={navLinkClass}
            onClick={() => {
              setUserMenuOpen(false);
              setMenuOpen(false);
            }}
          >
            <FaUser className="inline mr-2 mb-1" />
            Profile
          </NavLink>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
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
    </nav>
  );
};

export default Navbar;
