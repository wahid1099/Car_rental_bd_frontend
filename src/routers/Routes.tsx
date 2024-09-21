import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import HomePage from "../pages/HomePage/HomePage";
import AboutUs from "../pages/AboutUsPage/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import Register from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboadLayout from "../layout/DashboardLayout";
import AddCarData from "../component/Dashboard/Admin/CarManagement/AddCarData";
import GetAllCarData from "../component/Dashboard/Admin/CarManagement/AllCars";
import UpdateCar from "../component/Dashboard/Admin/CarManagement/UpdateCarData";

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
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <DashboadLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "all-cars",
        element: <GetAllCarData />,
      },
      {
        path: "add-car",
        element: <AddCarData />,
      },
      {
        path: "update-car/:id",
        element: <UpdateCar />,
      },
    ],
  },
]);
