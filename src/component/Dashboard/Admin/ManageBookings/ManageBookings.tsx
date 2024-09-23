/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Table } from "antd";
import { bookingApi } from "../../../../redux/features/Booking/BookingApi";
import { GetStatusTag, PaymentStatusTag } from "../../../../utils/getStatusTag";
import { TCarBooking } from "../../../../type/global.type";
import Swal from "sweetalert2";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { carApi } from "../../../../redux/features/Car/CarApi";
import { HashLoader } from "react-spinners";

const AdminManageBooking = () => {
  const { data: allBookings, isLoading } =
    bookingApi.useGetAllBookingsQuery(undefined);
  const allBookingData = allBookings?.data;
  const [updateStatus] = bookingApi.useUpdateBookingStatusMutation();
  const [deleteBooking] = bookingApi.useDeleteBookingMutation();
  const [returnCarIntoGraze] = carApi.useReturnCarMutation();

  // handle return car
  const handleReturnCar: SubmitHandler<FieldValues> = async (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to return this car.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, return it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await returnCarIntoGraze(bookingId).unwrap();
          Swal.fire("Returned!", "The car has been returned.", "success");
        } catch (error: any) {
          Swal.fire("Error!", error.message, "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "The car return has been cancelled.", "error");
      }
    });
  };

  // handle approve
  const handleApprove: SubmitHandler<FieldValues> = async (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to approve this booking.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateStatus(bookingId).unwrap();
          Swal.fire("Approved!", "The booking has been approved.", "success");
        } catch (error: any) {
          Swal.fire("Error!", error.message, "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          "Cancelled",
          "The booking approval has been cancelled.",
          "error"
        );
      }
    });
  };

  // handle delete booking
  const handleDeleteBooking: SubmitHandler<FieldValues> = async (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBooking(bookingId).unwrap();
          Swal.fire("Deleted!", "The booking has been deleted.", "success");
        } catch (error: any) {
          Swal.fire("Error!", error.message, "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "The booking is safe.", "error");
      }
    });
  };

  const tableData = allBookingData?.map((item: TCarBooking) => ({
    key: item._id,
    userName: item?.user?.name,
    userEmail: item?.user?.email,
    name: item?.car.name,
    price: item?.car.pricePerHour,
    pickUpDate: item?.pickUpDate,
    pickUpTime: item?.pickTime,
    dropOffDate: item?.dropOffDate,
    dropOffTime: item?.dropTime,
    status: item?.status,
    paymentStatus: item?.paymentStatus,
    totalCost: item?.totalCost,
  }));

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Car Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Pick-Up Date",
      dataIndex: "pickUpDate",
      key: "pickUpDate",
    },
    {
      title: "Pick-Up Time",
      dataIndex: "pickUpTime",
      key: "pickUpTime",
    },
    {
      title: "Drop-Off Date",
      dataIndex: "dropOffDate",
      key: "dropOffDate",
      render: (text: any, record: any) =>
        record.status === "completed" ? text : "N/A",
    },
    {
      title: "Drop-Off Time",
      dataIndex: "dropOffTime",
      key: "dropOffTime",
      render: (text: any, record: any) =>
        record.status === "completed" ? text : "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => GetStatusTag(status),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => PaymentStatusTag(status),
    },
    {
      title: "Total Profite",
      dataIndex: "totalCost",
      key: "totalCost",
    },
    {
      title: "Action",
      key: "action",
      render: (item: any) => {
        const isOngoing = item.status === "ongoing";
        const isCompleted = item.status === "completed";
        return (
          <Space size="middle">
            <Button
              onClick={() => handleApprove(item.key)}
              disabled={isOngoing || isCompleted}
            >
              Approve
            </Button>
            <Button
              onClick={() => handleReturnCar(item.key)}
              disabled={isCompleted}
            >
              Return Car
            </Button>
            <Button
              onClick={() => handleDeleteBooking(item.key)}
              disabled={isOngoing}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="bg-gradient-to-r from-slate-500 p-8 mb-10 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-center text-white">
          Manage All <span className="text-yellow-300">User Bookings</span>
        </h2>
      </div>
      {/* Show loading spinner while data is loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div
            className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
          >
            <HashLoader size={100} color="blue" />
          </div>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={tableData || []}
          className="overflow-x-auto"
        />
      )}
    </div>
  );
};

export default AdminManageBooking;
