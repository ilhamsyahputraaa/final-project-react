import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import LoginPage from "./Pages/LogInPage";
import RegisterPage from "./Pages/RegisterPage";
import App from "./App";
import PageError from "./Pages/PageError";


const noAuth = ["/", "/login", "/register", "/detail"];

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
        alert("You have to sign in to access this page!");
        window.location.assign("/login");
      }
    }
  },
  admin: (Component) => {
    const isLogin = localStorage.getItem("id") ? true : false;
    const isAdmin = localStorage.getItem("role") === "admin" ? true : false;
    if (isLogin && isAdmin) {
      return <Component />;
    } else {
      return <PageError />;
    }
  },
};

const router = createBrowserRouter([
  {
    path: "/", // No Authentication Needed
    element: auth.noAuth(App),
    errorElement: <PageError />,
  },
  {
    path: "/login", // No Authentication Needed
    element: auth.noAuth(LoginPage),
    errorElement: <PageError />,
  },
  {
    path: "/register", // No Authentication Needed
    element: auth.noAuth(RegisterPage),
    errorElement: <PageError />,
  },
  // {
  //   path: "/profile", // Need to Login
  //   element: auth.login(Profile),
  //   errorElement: <PageError />,
  // },
  // {
  //   path: "/detail", // No Authentication Needed
  //   element: auth.noAuth(Detail),
  //   errorElement: <PageError />,
  // },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);