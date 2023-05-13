import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import LoginPage from "./Pages/LogInPage";
import RegisterPage from "./Pages/RegisterPage";
import App from "./App";
import ProfilePage from "./Pages/ProfilePage";
import PageError from "./Pages/PageError";
import EditProfile from "./Pages/EditProfile";
import DetailPostPage from "./Pages/DetailPostPage";
import UploadPost from "./Pages/UploadPost";
import ExplorePage from "./Pages/ExplorePage";
import EditPost from "./Pages/EditPost";


const noAuth = ["/","login", "/register"];

const auth = {
  noAuth: (Component) => {
    return <Component />;
  },
  login: (Component) => {
    const isLogin = localStorage.getItem("id") ? true : false;

    if (isLogin || noAuth.includes(window.location.pathname)) {
      return <Component />;
    } else {
      const isLoginPage = window.location.pathname === "/login";
      if (isLoginPage) {
        return <LoginPage />;
      } else {
        window.location.assign("/login");
        alert("You have to sign in to access this page!");
      }
    }
  },
};

const router = createBrowserRouter([
  {
    path: "/", // No Authentication Needed
    element: auth.noAuth(LoginPage),
    errorElement: <PageError />,
  },
  {
    path: "/home", // No Authentication Needed
    element: auth.login(App),
    errorElement: <PageError />,
  },
  {
    path: "/register", // No Authentication Needed
    element: auth.noAuth(RegisterPage),
    errorElement: <PageError />,
  },
  {
    path: "/profile", // Need to Login
    element: auth.login(ProfilePage),
    errorElement: <PageError />,
  },
  {
    path: "/editprofile", // Need to Login
    element: auth.login(EditProfile),
    errorElement: <PageError />,
  },
  {
    path: "/detail", // No Authentication Needed
    element: auth.login(DetailPostPage),
    errorElement: <PageError />,
  },
  {
    path: "/upload", // Need to Login
    element: auth.login(UploadPost),
    errorElement: <PageError />,
  },
  {
    path: "/explore", // Need to Login
    element: auth.login(ExplorePage),
    errorElement: <PageError />,
  },{
    path: "/eerror", // Need to Login
    element: auth.login(PageError),
    errorElement: <PageError />,
  },{
    path: "/editpost", // Need to Login
    element: auth.login(EditPost),
    errorElement: <PageError />,
  },{
    path: "/editprofile", // Need to Login
    element: auth.login(EditProfile),
    errorElement: <PageError />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);