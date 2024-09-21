import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import HomePage from "../pages/HomePage/HomePage";
import AboutUs from "../pages/AboutUsPage/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import Register from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },

      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
