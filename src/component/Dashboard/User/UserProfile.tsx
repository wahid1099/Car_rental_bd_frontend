/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag } from "antd";
import { bookingApi } from "../../../../redux/features/Booking/bookingApi";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { userApi } from "../../../../redux/features/user/userApi";
import Loader from "../../../../shared/Loader/Loader";
import { TCarBooking } from "../../../../type/global.type";
import { GetStatusTag, PaymentStatusTag } from "../../../../utils/getStatusTag";

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
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-400 to-slate-600 p-8 mb-10 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-center text-white">
          Welcome Back,{" "}
          <span className="text-yellow-300">{userData?.name}</span>!
        </h2>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="relative bg-white shadow-lg rounded-lg p-8 transition-transform duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="flex justify-center cursor-pointer">
              <Link to="/dashboard/profile-update" className="relative">
                <img
                  className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-lg"
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
              <h2 className="text-3xl font-semibold text-gray-800">
                {userData?.name}
              </h2>
              <Tag className="mt-2 text-gray-600">{userData?.role}</Tag>
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
          <div className="bg-white shadow-lg rounded-lg p-8 transition-transform duration-300 hover:shadow-xl col-span-1 md:col-span-2 transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              My Completed Booking{" "}
              <span className="text-yellow-500">Summary</span>
            </h2>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              {totalBooking > 0 ? (
                <p className="text-xl text-gray-700">
                  You have completed
                  <span className="text-red-600 font-bold">
                    {" "}
                    {totalBooking}{" "}
                  </span>
                  car bookings so far.
                </p>
              ) : (
                <p className="text-xl text-gray-700 font-bold">
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
            Completed Booking <span className="text-red-500">History</span>
          </h2>
        </div>
        <hr className="mt-10" />
        <div>
          {totalBooking > 0 ? (
            <Table
              columns={columns}
              dataSource={tableData || []}
              pagination={false}
              className="overflow-x-auto"
            />
          ) : (
            <div className="text-center text