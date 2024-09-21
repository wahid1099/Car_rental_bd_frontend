// src/components/ContactUs.jsx
import { FiMapPin, FiPhoneIncoming, FiMail } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-[#0F1D3C] text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 text-lg">
          Have any questions? We'd love to hear from you.
        </p>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0F1D3C]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0F1D3C]"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                // This might be causing the error
                placeholder="Your Message"
                className="w-full px-4 py-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0F1D3C]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#0F1D3C] text-white py-2 rounded hover:bg-[#0d1735] transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col justify-between">
          {/* Contact Information */}
          <div className="bg-white p-8 rounded shadow mb-6">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <p className="flex items-center text-lg mb-4">
              <FiMapPin className="mr-2 text-[#0F1D3C]" /> 25586 Hc 1,
              Glennallen, Alaska, 99588, USA
            </p>
            <p className="flex items-center text-lg mb-4">
              <FiPhoneIncoming className="mr-2 text-[#0F1D3C]" /> +603 4784 273
              12
            </p>
            <p className="flex items-center text-lg">
              <FiMail className="mr-2 text-[#0F1D3C]" /> rentcars@gmail.com
            </p>
          </div>

          {/* Google Map Embed */}
          <div className="bg-white p-8 rounded shadow mb-6">
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20649.271656544643!2d90.40536865898456!3d23.807573006584885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c62fb95f16c1%3A0xb333248370356dee!2z4Kav4Kau4KeB4Kao4Ka-IOCmq-Cmv-CmieCmmuCmvuCmsCDgpqrgpr7gprDgp43gppU!5e0!3m2!1sbn!2sbd!4v1726844644002!5m2!1sbn!2sbd"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>

          {/* Social Media Links */}
          <div className="bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-[#0F1D3C] text-white p-3 rounded-full hover:bg-[#0d1735] transition"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="bg-[#0F1D3C] text-white p-3 rounded-full hover:bg-[#0d1735] transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="bg-[#0F1D3C] text-white p-3 rounded-full hover:bg-[#0d1735] transition"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
