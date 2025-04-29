import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  PasswordCharacter,
  PasswordLowercase,
  PasswordNumber,
  PasswordUppercase,
} from "../../constant/Pattern";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../constant/Firebase";
import { paths } from "../../constant/Paths";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const schema = yup.object({
  name: yup.string().min(3).max(10).required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 character")
    .matches(PasswordUppercase, "Must have an uppercase letter")
    .matches(PasswordLowercase, "Must have a lowercase letter")
    .matches(PasswordNumber, "Must have a number")
    .matches(PasswordCharacter, "Must have a special character")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        toast.success("Signup successful! Redirecting to login...", {
          autoClose: 2000,
        });
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((error) => {
        console.error(error.code, error.message);

        if (error.code === "auth/email-already-in-use") {
          toast.error(
            "This email is already registered. Please log in instead.",
            {
              autoClose: 2000,
            }
          );
        } else {
          toast.error(`Signup failed: ${error.message}`, {
            autoClose: 2000,
          });
        }
      });
  };

  return (
    <motion.div
      className="bg-[#ffffff] rounded-xl shadow-xl w-full max-w-md mx-auto mb-5 sm:mb-0 p-4 sm:p-6 md:p-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-center font-bold text-2xl md:text-4xl">Signup</h1>
      <hr className="mt-1 sm:mt-2 mb-3 sm:mb-8" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <label className=" sm:text-md font-medium">Name</label>
          <input
            type="text"
            className="w-full mt-0.5 sm:mt-1 mb-1.5 border border-[#333333] p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
            placeholder="enter your name..."
            {...register("name")}
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-1.5 sm:mt-3"
        >
          <label className=" sm:text-md font-medium">E-mail</label>
          <input
            type="email"
            className="w-full mt-0.5 sm:mt-1 mb-1 border border-[#333333] p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
            placeholder="enter your email..."
            {...register("email")}
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-1.5 sm:mt-3 relative"
        >
          <label className="sm:text-md font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full mt-0.5 sm:mt-1 mb-1 border border-[#333333]  p-1.5 sm:p-2 pr-10 rounded-sm text-sm sm:text-base"
            placeholder="enter your password..."
            {...register("password")}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          {passwordValue && (
            <div
              className="absolute right-3 top-[39px] cursor-pointer text-[#555]"
              onClick={togglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          )}
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-2 sm:mt-3 relative"
        >
          <label className=" sm:text-md font-medium">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="w-full mt-0.5 sm:mt-1 mb-1 border border-[#333333]  p-1.5 sm:p-2 pr-10 rounded-sm text-sm sm:text-base"
            placeholder="re-enter your password..."
            {...register("confirmPassword")}
            onChange={(e) => setConfirmPasswordValue(e.target.value)}
          />
          {confirmPasswordValue && (
            <div
              className="absolute right-3 top-[39px] cursor-pointer text-[#555]"
              onClick={toggleConfirmPassword}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          )}
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 sm:mt-6"
        >
          <button
            type="submit"
            className="w-full text-base sm:text-lg mb-3 sm:mb-4 font-medium bg-gradient-to-r from-[#ff6f61] to-[#fe9a8b] text-white shadow-md hover:opacity-90 transition duration-300 p-2 sm:p-2.5 rounded-lg cursor-pointer"
          >
            Create an Account
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <p className="text-center font-medium text-sm sm:text-base">
            Already have an Account?{" "}
            <Link to={paths.login} className="text-[#d67b7b] font-bold">
              Log In
            </Link>
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Signup;
