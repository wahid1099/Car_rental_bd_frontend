// src/components/Footer.jsx
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../../assets/footerlogo.png"; // Update the path according to your project
import { Link } from "react-router-dom";
import { FiMapPin, FiPhoneIncoming, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#0F1D3C] text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Company Info Section */}
        <div className="col-span-2">
          <div className="flex-shrink-0 mb-5">
            <Link to="/">
              <img className="h-8 w-auto" src={logo} alt="Logo" />
            </Link>
          </div>
          <p className="flex items-center space-x-2">
            <FiMapPin className="text-lg" />
            <span>25586 Hc 1, Glennallen, Alaska, 99588, USA</span>
          </p>

          {/* Phone */}
          <p className="flex items-center space-x-2 mt-2">
            <FiPhoneIncoming className="text-lg" />
            <span>+603 4784 273 12</span>
          </p>

          {/* Email */}
          <p className="flex items-center space-x-2 mt-2">
            <FiMail className="text-lg" />
            <span>rentcars@gmail.com</span>
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Our Product</h4>
          <ul className="space-y-2">
            <li>Career</li>
            <li>Car</li>
            <li>Packages</li>
            <li>Features</li>
            <li>Priceline</li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>Download</li>
            <li>Help Centre</li>
            <li>Guides</li>
            <li>Partner Network</li>
            <li>Cruises</li>
            <li>Developer</li>
          </ul>
        </div>

        {/* About and Follow Us */}
        <div className="flex flex-col space-y-4 md:space-y-0">
          <div>
            <h4 className="text-lg font-semibold mb-4">About Rentcars</h4>
            <ul className="space-y-2">
              <li>Why choose us</li>
              <li>Our Story</li>
              <li>Investor Relations</li>
              <li>Press Center</li>
              <li>Advertise</li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="mt-6 md:mt-0">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white text-[#0F1D3C] p-2 rounded-full hover:bg-gray-200 transition"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="bg-white text-[#0F1D3C] p-2 rounded-full hover:bg-gray-200 transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="bg-white text-[#0F1D3C] p-2 rounded-full hover:bg-gray-200 transition"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} - Rentcars, All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
