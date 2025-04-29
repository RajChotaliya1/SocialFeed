import React from "react";
import Logo from "/src/assets/logo3.webp";
import { Outlet } from "react-router-dom";
import GuestLayout from "../../Route/GuestRoute";

const AuthLayout = () => {
  return (
    <GuestLayout>
      <section
        className="bg-[#ffffff] h-dvh flex justify-center items-center px-4 sm:px-6 lg:px-8"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-center">
            <div className="flex justify-center">
              <img
                src={Logo}
                className=" w-3/4 sm:w-3/4 md:w-2/3 lg:w-full object-contain"
                alt="Logo"
              />
            </div>
            <Outlet />
          </div>
        </div>
      </section>
    </GuestLayout>
  );
};

export default AuthLayout;
