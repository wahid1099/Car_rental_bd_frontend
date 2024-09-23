import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import {
  BsFillPersonCheckFill,
  BsFillPencilFill,
  BsFillPeopleFill,
} from "react-icons/bs";
// import { MdOutlineManageHistory } from "react-icons/md";
import { FaCar, FaClipboardList } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <div className="space-y-5 mt-10">
      {/* User Profile Link */}
      <div>
        <NavLink
          to="/dashboard/admin-profile-view"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 mt-3 transition-colors duration-300 transform rounded-lg ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-200 hover:bg-blue-500 hover:text-white"
            }`
          }
        >
          <BsFillPersonCheckFill className="w-5 h-5" />
          <span className="mx-4 font-medium">My Profile</span>
        </NavLink>
      </div>

      {/* Manage Bookings Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("manageBookings")}
          className="flex items-center px-4 py-3 w-full text-left transition-colors duration-300 transform rounded-lg text-gray-200 hover:bg-blue-500 hover:text-white"
        >
          <FaClipboardList className="w-5 h-5" />
          <span className="mx-4 font-medium">Manage Bookings</span>
          <AiOutlineDown
            className={`ml-auto transform transition-transform ${
              activeDropdown === "manageBookings" ? "rotate-180" : ""
            }`}
          />
        </button>

        {activeDropdown === "manageBookings" && (
          <div className="absolute left-0 mt-2 w-full bg-blue-700 border border-blue-500 rounded shadow-lg z-10">
            <NavLink
              to="/dashboard/admin-bookings"
              className={({ isActive }) =>
                `block px-4 py-3 transition-colors duration-300 transform ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-200 hover:bg-blue-500 hover:text-white"
                }`
              }
            >
              All Bookings
            </NavLink>
          </div>
        )}
      </div>

      {/* User Management Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("userManagement")}
          className="flex items-center px-4 py-3 w-full text-left transition-colors duration-300 transform rounded-lg text-gray-200 hover:bg-blue-500 hover:text-white"
        >
          <BsFillPeopleFill className="w-5 h-5" />
          <span className="mx-4 font-medium">User Management</span>
          <BsFillPeopleFill
            className={`ml-auto transform transition-transform ${
              activeDropdown === "userManagement" ? "rotate-180" : ""
            }`}
          />
        </button>

        {activeDropdown === "userManagement" && (
          <div className="absolute left-0 mt-2 w-full bg-blue-700 border border-blue-500 rounded shadow-lg z-10">
            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                `block px-4 py-3 transition-colors duration-300 transform ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-200 hover:bg-blue-500 hover:text-white"
                }`
              }
            >
              <div className="flex items-center space-x-2">
                <BsFillPencilFill />
                <span className="font-medium">Manage Users</span>
              </div>
            </NavLink>
          </div>
        )}
      </div>

      {/* Car Management Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("carManagement")}
          className="flex items-center px-4 py-3 w-full text-left transition-colors duration-300 transform rounded-lg text-gray-200 hover:bg-blue-500 hover:text-white"
        >
          <FaCar className="w-5 h-5" />
          <span className="mx-4 font-medium">Car Management</span>
          <AiOutlineDown
            className={`ml-auto transform transition-transform ${
              activeDropdown === "carManagement" ? "rotate-180" : ""
            }`}
          />
        </button>

        {activeDropdown === "carManagement" && (
          <div className="absolute left-0 mt-2 w-full bg-blue-700 border border-blue-500 rounded shadow-lg z-10">
            <NavLink
              to="/dashboard/add-car"
              className={({ isActive }) =>
                `block px-4 py-3 transition-colors duration-300 transform ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-200 hover:bg-blue-500 hover:text-white"
                }`
              }
            >
              Add Cars
            </NavLink>
            <NavLink
              to="/dashboard/all-cars"
              className={({ isActive }) =>
                `block px-4 py-3 transition-colors duration-300 transform ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-200 hover:bg-blue-500 hover:text-white"
                }`
              }
            >
              All Cars
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
