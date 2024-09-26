// components/Navbar.js
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/Auth/AuthSlice";
import { FaUserCircle } from "react-icons/fa";
// import { useSelector } from "react-redux";
import { BiSolidUserPlus } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
import { logOut } from "../../redux/features/Auth/AuthSlice";
import { useAppDispatch } from "../../redux/hooks";
import { FiLogOut } from "react-icons/fi";

// src/components/Navbar.jsx
import { useState } from "react";
import logo from "../../assets/logo.png"; // Update the path according to your project

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  //const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Assume you manage the user's login state in Redux
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-8 w-auto" src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/about-us" className="text-gray-700 hover:text-blue-600">
              About Us
            </Link>
            <Link to="/booking" className="text-gray-700 hover:text-blue-600">
              Booking
            </Link>
            <Link
              to="/contact-us"
              className="text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>
          </div>

          {/* User Icon */}
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center text-gray-700 focus:outline-none"
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt="User"
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <FaUserCircle size={24} />
              )}
            </button>

            {/* User Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <BiLogIn className="text-lg" />{" "}
                      {/* Adjust the icon size if needed */}
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <BiSolidUserPlus className="text-lg" />{" "}
                      {/* Adjust the icon size if needed */}
                      <span>Sign Up</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={handleLogOut}
                    >
                      <FiLogOut className="mr-2" />
                      Log Out
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Contact Us
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Products
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
