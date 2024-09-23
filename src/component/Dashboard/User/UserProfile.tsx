/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag } from "antd";
import { bookingApi } from "../../../redux/features/Booking/BookingApi";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { userApi } from "../../../redux/features/user/userApi";
import { HashLoader } from "react-spinners";
import { TCarBooking } from "../../../type/global.type";
import { GetStatusTag, PaymentStatusTag } from "../../../utils/getStatusTag";

const UserViewProfile = () => {
  // Fetch user data
  const { data: getMe, isLoading: isLoadingUser } =
    userApi.useGetMeQuery(undefined);
  const userData = getMe?.data;

  // Fetch booking data
  const { data: myBookings, isLoading: isLoadingBookings } =
    bookingApi.useGetMyBookingsQuery(undefined);
  const bookingData = myBookings?.data;

  // Filter for completed bookings
  const completedBookingData = bookingData?.filter(
    (item: TCarBooking) => item.status === "completed"
  );

  const tableData = completedBookingData?.map((item: TCarBooking) => ({
    key: item._id,
    name: item?.car?.name,
    price: item?.car.pricePerHour,
    pickUpDate: item?.pickUpDate,
    pickOfTime: item?.pickTime,
    dropOffDate: item?.dropOffDate,
    dropOfTime: item?.dropTime,
    status: item?.status,
    paymentStatus: item?.paymentStatus,
    identity: item?.identity,
    identityNo: item?.identityNo,
    drivingLicenseNo: item?.drivingLicenseNo,
    totalCost: item?.totalCost,
  }));

  const columns = [
    {
      title: "Car Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (last: number) => `Tk ${last.toFixed(2)}/ hour`,
    },
    {
      title: "Pick-Up Date",
      dataIndex: "pickUpDate",
      key: "pickUpDate",
    },
    {
      title: "Pick-Up Time",
      dataIndex: "pickOfTime",
      key: "pickOfTime",
    },
    {
      title: "Drop-Off Date",
      dataIndex: "dropOffDate",
      key: "dropOffDate",
      render: (text: any, record: { status: string }) =>
        record.status === "completed" ? text : "N/A",
    },
    {
      title: "Drop-Off Time",
      dataIndex: "dropOfTime",
      key: "dropOfTime",
      render: (text: any, record: { status: string }) =>
        record.status === "completed" ? text : "N/A",
    },
    {
      title: "Car Booking Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => GetStatusTag(status),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus: string) => PaymentStatusTag(paymentStatus),
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
    },
  ];

  // Calculate total completed bookings
  const totalBooking = completedBookingData?.length;

  // Show loading spinner while data is being fetched
  if (isLoadingUser || isLoadingBookings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex justify-center items-center min-h-[70vh]">
          <HashLoader size={80} color="#4A90E2" />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-10 mb-10 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-center text-white">
          Welcome Back,{" "}
          <span className="text-yellow-300">{userData?.name}</span>!
        </h2>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="relative bg-white shadow-xl rounded-lg p-8 transition-transform duration-300 hover:shadow-2xl transform hover:-translate-y-2">
            <div className="flex justify-center cursor-pointer">
              <Link to="/dashboard/profile-update" className="relative">
                <img
                  className="w-36 h-36 object-cover rounded-full border-4 border-gray-200 shadow-lg"
                  src={userData?.image}
                  alt={userData?.name}
                />
                {/* Edit Icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-full">
                  <FaEdit className="text-3xl text-white" />
                </div>
              </Link>
            </div>
            <div className="text-center mt-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {userData?.name}
              </h2>
              <Tag
                style={{ backgroundColor: "#EBF8FF", color: "#3182CE" }} // Inline styles for bg-blue-100 and text-blue-600
                className="mt-2"
              >
                {userData?.role}
              </Tag>
            </div>
            <div className="mt-8 text-center text-gray-600">
              <p>
                <span className="font-semibold">Mobile: </span>
                {userData?.phone}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Email: </span>
                {userData?.email}
              </p>
            </div>
          </div>

          {/* Total Completed Booking History Card */}
          <div className="bg-white shadow-xl rounded-lg p-8 transition-transform duration-300 hover:shadow-2xl col-span-1 md:col-span-2 transform hover:-translate-y-2">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              My Completed Booking{" "}
              <span className="text-purple-600">Summary</span>
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              {totalBooking > 0 ? (
                <p className="text-lg text-gray-700">
                  You have completed
                  <span className="text-blue-600 font-bold">
                    {" "}
                    {totalBooking}{" "}
                  </span>
                  car bookings so far.
                </p>
              ) : (
                <p className="text-lg text-gray-700 font-bold">
                  You currently have
                  <span className="text-red-600"> no completed bookings</span>.
                  Keep exploring and book a car!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End Content Section */}

      <hr className="mt-10" />

      <div>
        <div className="mt-6 mb-6">
          <h2 className="text-4xl font-bold text-center">
            Completed Booking <span className="text-purple-500">History</span>
          </h2>
        </div>
        <hr className="mt-10" />
        <div>
          {totalBooking > 0 ? (
            <Table
              columns={columns}
              dataSource={tableData || []}
              pagination={false}
              className="overflow-x-auto bg-white p-5 shadow-md rounded-lg"
            />
          ) : (
            <div className="text-center text-blue-700  max-w-4xl p-4 mx-auto mt-10 sm:mt-20 lg:mt-40 rounded-md shadow-lg">
              <p className="text-lg sm:text-xl font-bold">
                It looks like you haven't completed any bookings yet.
              </p>
              <p className="text-lg sm:text-xl font-bold">
                Start exploring our cars and make your first booking!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserViewProfile;
