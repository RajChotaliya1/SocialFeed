import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import PagenotFound from "./Components/PagenotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { paths } from "./constant/Paths";
import Home from "./Pages/Home";
import PostPage from "./Pages/Post";
import MainLayout from "./Layout/MainLayout";
import AuthLayout from "./Layout/AuthLayout";
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path={paths.login} element={<Login />} />
            <Route path={paths.signup} element={<Signup />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path={paths.home} element={<Home />} />
            <Route path={paths.postpage} element={<PostPage />} />
            <Route path={paths.profile} element={<Profile />} />
          </Route>

          <Route path={paths.pagenotfound} element={<PagenotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
