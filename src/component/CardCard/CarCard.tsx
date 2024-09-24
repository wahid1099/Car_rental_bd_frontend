import { Link, useLocation } from "react-router-dom";
import Starts from "./Stars";
import BookingFormModal from "../Booking/BookingFromModal";
import { TCar } from "../../type/global.type";

// Import Icons
import {
  FaCarSide,
  FaGasPump,
  FaCogs,
  FaChair,
  FaTachometerAlt,
} from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";

const CarCard = ({ car }: { car: TCar }) => {
  const id = car?._id;
  const star = car?.rating;
  const { pathname } = useLocation();

  // Define status color
  const statusColor =
    car?.status === "available" ? "text-green-500" : "text-red-500";

  return (
    <div
      style={{ background: "#F9FAFB" }}
      className="border border-gray-200 rounded-lg p-4 md:h-[650px] shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 max-w-xs mx-auto"
    >
      {/* Car Image */}
      <div className="relative overflow-hidden bg-white rounded-lg mb-4">
        <img
          src={car?.carImgUrl[0]}
          alt={car?.name}
          className="w-full h-48 rounded-md object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {car?.pricePerHour} Tk / Hour
        </span>
      </div>

      {/* Car Information */}
      <div className="bg-white p-5 rounded-lg">
        {/* Car Name */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-800">{car?.name}</h3>
          {car?.isElectric && (
            <span className="text-green-500 text-sm font-semibold">
              Electric
            </span>
          )}
        </div>

        {/* Star Rating */}
        <div className="mb-4">
          <Starts star={star}></Starts>
        </div>

        {/* Car Description */}
        <p className="text-gray-600 text-sm mb-4 text-justify line-clamp-3">
          {car?.description}
        </p>

        {/* Additional Car Details with Icons */}
        <div className="text-sm text-gray-600 mb-4">
          <div className="flex flex-wrap gap-4 mb-4">
            <p className="flex items-center gap-2">
              <FaCarSide className="text-blue-500" />
              {car?.carType || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <FaChair className="text-blue-500" />
              {car?.maxSeats || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <FaCogs className="text-blue-500" />
              {car?.gearType || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <FaGasPump className="text-blue-500" />
              {car?.fuelType || "N/A"}
            </p>
          </div>

          <p className="flex items-center gap-2">
            <FaTachometerAlt className="text-blue-500" />
            <strong></strong> {car?.vehicleSpecification || "N/A"}
          </p>
          {/* Status with colored badge */}
          <p className="flex items-center gap-2">
            <AiOutlineCheckCircle className={statusColor} />
            <strong>Status:</strong>
            <span className={statusColor}>{car?.status || "Unknown"}</span>
          </p>
        </div>

        {/* Buttons for View Details or Booking */}
        <div className="flex flex-col md:flex-row justify-between gap-2">
          {pathname === "/booking" ? (
            <BookingFormModal car={car} />
          ) : (
            <Link to={`/view-details/${id}`} className="w-full">
              <button className="bg-blue-600 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
