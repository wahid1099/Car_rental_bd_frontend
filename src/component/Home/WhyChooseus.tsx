// src/components/WhyChooseUs.jsx
import { FaTag, FaUserTie, FaCarSide, FaHeadset } from "react-icons/fa"; // Importing icons
import carImage from "../../assets/Audi1.png"; // Replace with your actual image path

const WhyChooseUs = () => {
  return (
    <section className="flex flex-col mt-20 md:flex-row items-center py-12 px-6 bg-gray-50 relative overflow-hidden">
      {/* Left side: Car image with background */}
      <div className="relative w-full md:w-1/2 flex justify-center md:justify-start">
        {/* Background Shape */}
        <div className="absolute w-60 h-60 bg-blue-100 transform rotate-45 -top-10 -left-20 md:w-80 md:h-80 md:-top-8 md:-left-8"></div>
        {/* Car Image */}
        <img
          src={carImage}
          alt="Luxury Car"
          className="relative z-10 max-w-full h-auto object-contain"
        />
      </div>

      {/* Right side: Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start mt-8 md:mt-0 md:ml-8 relative z-20">
        {/* Section Title */}
        <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          Why Choose Us
        </div>
        {/* Main Heading */}
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
          We offer the best experience with our rental deals
        </h2>
        {/* Feature List */}
        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaTag className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Best price guaranteed</h3>
              <p className="text-gray-600 text-sm">
                Find a lower price? We’ll refund you 100% of the difference.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaUserTie className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Experience driver</h3>
              <p className="text-gray-600 text-sm">
                Don’t have a driver? Don’t worry, we have many experienced
                drivers for you.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaCarSide className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">24 hour car delivery</h3>
              <p className="text-gray-600 text-sm">
                Book your car anytime and we will deliver it directly to you.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaHeadset className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">24/7 technical support</h3>
              <p className="text-gray-600 text-sm">
                Have a question? Contact Rentcars support anytime when you have
                a problem.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseUs;
