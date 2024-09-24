/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Stars from "../CardCard/Stars";

import { FaCarSide, FaDoorOpen, FaGasPump, FaUsers } from "react-icons/fa6";
import { FaCalendarAlt, FaCogs, FaTachometerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const CarDetailsCard = ({ carDetails }: any) => {
  const star = carDetails?.rating;
  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-evenly items-center my-10 p-4">
      {/* Left side - Image/Slider */}
      <div className="lg:w-1/2 w-full flex justify-center">
        <Carousel
          interval={6000}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
        >
          {carDetails?.carImgUrl.map((imgUrl: any, index: any) => (
            <div key={index}>
              <img
                className="rounded-md object-cover w-full h-64 sm:h-80 md:h-[400px]"
                src={imgUrl}
                alt={`Car Image ${index + 1}`}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Right side - Description */}
      <div className="lg:w-1/2 w-full lg:pl-10 mt-8 lg:mt-0">
        <div className="max-w-md mx-auto rounded-xl overflow-hidden md:max-w-2xl">
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {carDetails?.name}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-yellow-400">
                  <Stars star={star} />
                </div>
              </div>
            </div>
            <div className="text-lg text-red-500 mt-2">
              Tk{carDetails?.pricePerHour}
              <span className="text-gray-500"> / PerHour</span>
            </div>
            <p className="mt-4 text-gray-700 line-clamp-2">
              {carDetails?.description}
            </p>
            <hr className="text-xl mt-4" />
            <div className="mt-6">
              <div className="text-lg font-semibold text-gray-900">
                Key Feature
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <FaCarSide className="text-red-500 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">BODY:</span> Sedan
                  </div>
                </div>

                <div className="flex items-center">
                  <FaTachometerAlt className="text-red-500 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">MILEAGE:</span> 70.000 (Mi)
                  </div>
                </div>

                <div className="flex items-center">
                  <FaCalendarAlt className="text-red-500 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">YEARS:</span> 2023 Model
                  </div>
                </div>

                <div className="flex items-center">
                  <FaCogs className="text-red-500 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">ENGINE:</span> 2500
                  </div>
                </div>

                <div className="flex items-center">
                  <FaUsers className="text-red-500 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">PASSENGERS:</span>{" "}
                    {carDetails?.maxSeats} Seats
                  </div>
                </div>

                <div className="flex items-center">
                  <FaCogs className="text-red-500 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">GEAR:</span>{" "}
                    {carDetails?.gearType}
                  </div>
                </div>

                <div className="flex items-center">
                  <FaDoorOpen className="text-red-500 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">DOORS:</span> 2 Doors
                  </div>
                </div>

                <div className="flex items-center">
                  <FaGasPump className="text-red-500 w-6 h-6" />
                  <div className="ml-2 text-sm">
                    <span className="text-gray-600">FUEL:</span>{" "}
                    {carDetails?.fuelType}
                  </div>
                </div>
              </div>
            </div>

            <hr className="mt-6" />
            <div className="mt-6">
              <Link to="/booking" className="w-full">
                <button className="border-2 font-semibold border-red-700 px-4 w-full py-1 text-red-600 hover:bg-black hover:text-white transition mb-2 md:mb-0">
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
