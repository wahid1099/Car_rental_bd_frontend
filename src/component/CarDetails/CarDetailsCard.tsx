/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import Stars from "../CardCard/Stars";

import {
  FaCarSide,
  FaDoorOpen,
  FaGasPump,
  FaUsers,
  FaCalendarDays,
  FaGear,
  FaServicestack,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

const CarDetailsCard = ({ carDetails }: any) => {
  const star = carDetails?.rating;

  const [selectedImage, setSelectedImage] = useState(carDetails?.carImgUrl[0]);

  const handleImageClick = (imgUrl: string) => {
    setSelectedImage(imgUrl);
  };

  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-evenly items-center my-10 p-4">
      {/* Left side - Image/Slider */}
      {/* Left side - Image/Slider */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center">
        {/* Main Image */}
        <div className="relative w-full overflow-hidden group">
          <img
            className="rounded-md object-cover w-full h-64 sm:h-80 md:h-[400px] transition-transform duration-300 transform group-hover:scale-150"
            src={selectedImage}
            alt="Selected Car"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="flex space-x-2 mt-4">
          {carDetails?.carImgUrl.map((imgUrl: string, index: number) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 rounded-md object-cover cursor-pointer ${
                selectedImage === imgUrl ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleImageClick(imgUrl)}
            />
          ))}
        </div>
      </div>
      {/* Right side - Description */}
      <div className="lg:w-1/2 w-full lg:pl-10 mt-8 lg:mt-0">
        <div className="max-w-md mx-auto rounded-xl overflow-hidden md:max-w-2xl bg-white shadow-lg">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold text-gray-800">
                {carDetails?.name}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-yellow-400">
                  <Stars star={star} />
                </div>
              </div>
            </div>

            <div className="text-lg text-red-500 font-bold mt-2">
              Tk{carDetails?.pricePerHour}
              <span className="text-gray-500"> / Per Hour</span>
            </div>

            <p className="mt-4 text-gray-700 text-justify">
              {carDetails?.description}
            </p>

            <hr className="border-gray-200 mt-6" />

            {/* Key Features */}
            <div className="mt-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Key Features
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {/* Feature Icons */}
                <div className="flex items-center">
                  <FaCarSide className="text-blue-600 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">BODY:</span> Sedan
                  </div>
                </div>

                <div className="flex items-center">
                  <FaServicestack className="text-blue-600 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">MILEAGE:</span> 70,000 (Mi)
                  </div>
                </div>

                <div className="flex items-center">
                  <FaCalendarDays className="text-blue-600 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">YEAR:</span> 2023 Model
                  </div>
                </div>

                <div className="flex items-center">
                  <FaGear className="text-blue-600 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">ENGINE:</span> 2500 CC
                  </div>
                </div>

                <div className="flex items-center">
                  <FaUsers className="text-blue-600 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">SEATS:</span>{" "}
                    {carDetails?.maxSeats} Seats
                  </div>
                </div>

                <div className="flex items-center">
                  <FaGear className="text-blue-600 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">GEAR:</span>{" "}
                    {carDetails?.gearType}
                  </div>
                </div>

                <div className="flex items-center">
                  <FaDoorOpen className="text-blue-600 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">DOORS:</span> 2 Doors
                  </div>
                </div>

                <div className="flex items-center">
                  <FaGasPump className="text-blue-600 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">FUEL:</span>{" "}
                    {carDetails?.fuelType}
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-200 mt-6" />

            {/* Booking Button */}
            <div className="mt-6">
              <Link to="/booking" className="block">
                <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsCard;
