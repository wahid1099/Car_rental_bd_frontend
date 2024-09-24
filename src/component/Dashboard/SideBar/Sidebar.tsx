import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { useAppDispatch } from "../../../redux/hooks";
import { logOut } from "../../../redux/features/Auth/AuthSlice";
import avatar from "../../../assets/images.jpeg";

import Avatar from "./Avatar";
import UserMenu from "./UserMenu";
import Logo from "../../../assets/logo.png";
import AdminMenu from "./AdminMenus";
import { FaHome } from "react-icons/fa";
import { authApi } from "../../../redux/features/Auth/atuhApi";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isActive, setActive] = useState<boolean>(false);
  const { data: profileData } = authApi.useGetMeQuery(undefined);
  const user = profileData?.data;

  // Sidebar responsive handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-blue-700 text-white flex justify-between md:hidden">
        <div className="block cursor-pointer p-4 font-bold">
          <Avatar />
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-blue-600"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gradient-to-r from-blue-900 to-blue-700 w-64 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-300 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <div className="w-full hidden md:flex py-4 justify-center items-center bg-white shadow-lg rounded-md mx-auto">
            <Link to="/">
              <img
                className="hidden md:block"
                width="100"
                height="100"
                src={Logo}
                alt=""
              />
              {/* <h2 className="text-xl font-semibold hidden md:block">
          Rent<span className="text-red-600">Wheels</span>
        </h2> */}
            </Link>
          </div>
          <div className="flex flex-col items-center mt-6">
            <Link to="/">
              <img
                className="object-cover w-24 h-24 mx-2 rounded-full border-4 border-blue-500"
                src={user?.image || avatar} // Replace with your custom image path
                alt={user?.name || "User Avatar"} // Fallback alt text
                referrerPolicy="no-referrer"
              />
            </Link>
            <Link to="/dashboard">
              <h4 className="mx-2 mt-2 font-semibold text-white hover:underline">
                {user?.name}
              </h4>
            </Link>
            <Link to="/dashboard">
              <p className="mx-2 mt-1 text-sm text-gray-200 hover:underline">
                {user?.userEmail}
              </p>
            </Link>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex-grow">
          {user?.role === "admin" ? <AdminMenu /> : <UserMenu />}
        </div>

        <div>
          <hr className="border-gray-600" />
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mt-5 transition-colors duration-300 transform hover:bg-blue-600 hover:text-white ${
                isActive ? "bg-blue-600 text-white" : "text-gray-300"
              }`
            }
          >
            <FaHome className="w-5 h-5" />
            <span className="mx-4 font-medium">Home</span>
          </NavLink>
          <button
            onClick={handleLogOut}
            className="flex w-full items-center px-4 py-3 mt-5 text-gray-300 hover:bg-blue-600 hover:text-white transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
