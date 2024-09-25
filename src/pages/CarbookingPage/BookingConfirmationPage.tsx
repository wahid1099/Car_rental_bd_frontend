import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Lottie from "react-lottie-player";
import lottieJson from "./animation.json";

const BookingConfirmation = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  // Assuming booking data is passed through state
  const bookingData = location.state?.bookingData;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center">Booking Confirmation</h1>
      <Lottie
        loop={false}
        animationData={lottieJson}
        play
        style={{ width: 150, height: 150, margin: "20px 0" }}
      />
      {bookingData ? (
        <div className="mt-4 text-center">
          <h2 className="text-lg">Booking Details</h2>
          <p>
            <strong>Customer Name:</strong> {user?.name}
          </p>
          <p>
            <strong>License No:</strong> {bookingData.drivingLicenseNo}
          </p>
          <p>
            <strong>Date:</strong> {bookingData.date}
          </p>
          <p>
            <strong>Start Time:</strong> {bookingData.startTime}
          </p>
          <p className="mt-4 text-lg font-semibold">
            Get ready to collect car keys and pay later.
          </p>
          {/* Add more details as necessary */}
        </div>
      ) : (
        <p className="text-center">No booking data found.</p>
      )}
    </div>
  );
};

export default BookingConfirmation;
