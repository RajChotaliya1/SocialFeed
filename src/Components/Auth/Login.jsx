import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../constant/Firebase";
import { paths } from "../../constant/Paths";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onLogin = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login successfully!...", { autoClose: 2000 });
        setTimeout(() => {
          navigate(paths.home);
        }, 2000);
      })
      .catch((error) => {
        console.log(error.code, error.message);
        toast.error("Invalid email or password", { autoClose: 2000 });
      });
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-md mx-auto mb-5 sm:mb-0 p-4 sm:p-6 md:p-7"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", stiffness: 100, damping: 25 }}
    >
      <h1 className="text-center font-bold text-2xl sm:text-4xl">Log In</h1>
      <hr className="mt-2 mb-5 sm:mb-8" />

      <form onSubmit={handleSubmit(onLogin)}>
        <div className="mt-4">
          <label className="text-md font-medium">E-mail</label>
          <input
            type="email"
            className="w-full mt-1 mb-1 border border-[#333333] p-1.5 sm:p-2 rounded-sm"
            placeholder="enter your email..."
            {...register("email")}
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div className="mt-2 sm:mt-4 relative">
          <label className="text-md font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full mt-1 mb-1 border border-[#333333] p-1.5 sm:p-2 pr-10 rounded-sm"
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
        </div>

        <div className="mt-6">
          <motion.button
            type="submit"
            className="w-full text-base sm:text-lg mb-5 font-medium bg-gradient-to-r from-[#ff6f61] to-[#fe9a8b] text-white shadow-md hover:opacity-90 transition duration-300 p-2.5 sm:p-2.5 rounded-lg cursor-pointer"
            whileTap={{ scale: 0.98 }}
          >
            Log In
          </motion.button>
        </div>

        <div>
          <p className="text-center font-medium text-sm sm:text-base">
            Don't have an Account?{" "}
            <Link to={paths.signup} className="text-[#d67b7b] font-bold">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default Login;
