import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";

const ErrorPage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/previews/006/549/647/non_2x/404-landing-page-free-vector.jpg')", // Replace with your preferred image URL
      }}
    >
      <div className="text-center p-8 md:p-10 bg-white bg-opacity-90 shadow-xl rounded-xl max-w-md w-full">
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle className="text-red-500 text-7xl md:text-8xl" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 mb-6 text-base md:text-lg">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-all duration-300 text-base md:text-lg"
          >
            <AiOutlineHome className="mr-2 text-lg md:text-xl" /> Go to Home
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-all duration-300 text-base md:text-lg"
          >
            <BiLogIn className="mr-2 text-lg md:text-xl" /> Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
