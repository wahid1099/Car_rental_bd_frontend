/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Space, Table } from "antd";
import { bookingApi } from "../../../redux/features/Booking/BookingApi";
import { GetStatusTag, PaymentStatusTag } from "../../../utils/getStatusTag";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { TCarBooking } from "../../../type/global.type";
import { HashLoader } from "react-spinners";

import Swal from "sweetalert2";
import type { ColumnsType } from "antd/es/table";

const MyBookings = () => {
  const [returnCarWithPayment] =
    bookingApi.useCarReturnAndWithPaymentMutation();
  const {
    data: myBookings,
    isFetching,
    isLoading,
  } = bookingApi.useGetMyBookingsQuery(undefined);
  const bookingData = myBookings?.data;

  const [deleteMyBooking, { isLoading: isDeleting }] =
    bookingApi.useDeleteBookingMutation();
  const tableData = bookingData?.map((item: TCarBooking) => ({
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

  const handleDeleteMyBooking: SubmitHandler<FieldValues> = async (
    bookingId
  ) => {
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
          await deleteMyBooking(bookingId).unwrap();
          Swal.fire("Deleted!", "Your booking has been deleted.", "success");
        } catch (error: any) {
          Swal.fire(
            "Error!",
            error.message || "There was an error deleting your booking.",
            "error"
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your booking is safe :)", "error");
      }
    });
  };

  const handleReturnCarWithPayment: SubmitHandler<FieldValues> = async (
    bookingId
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to complete the payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, return it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await returnCarWithPayment(bookingId).unwrap();
          window.location.href = res.data.payment_url;
        } catch (error: any) {
          Swal.fire(
            "Error!",
            error.message || "There was an error returning your booking.",
            "error"
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your booking is safe :)", "error");
      }
    });
  };

  const columns: ColumnsType<TCarBooking> = [
    {
      title: "Car Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (last: number) => `Tk ${last.toFixed(2)}/hour`,
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Pick-Up Date",
      dataIndex: "pickUpDate",
      key: "pickUpDate",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Pick-Up Time",
      dataIndex: "pickOfTime",
      key: "pickOfTime",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Drop-Off Date",
      dataIndex: "dropOffDate",
      key: "dropOffDate",
      render: (text: any, record: { status: string }) =>
        record.status === "completed" ? text : "N/A",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Drop-Off Time",
      dataIndex: "dropOfTime",
      key: "dropOfTime",
      render: (text: any, record: { status: string }) =>
        record.status === "completed" ? text : "N/A",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Car Booking Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => GetStatusTag(status),
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus: string) => PaymentStatusTag(paymentStatus),
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Action",
      key: "action",
      render: (item: any) => {
        const onGoing = item.status === "ongoing";
        const paymentPaid = item.paymentStatus === "paid";
        const payment = item.status === "pending";

        return (
          <Space size="middle">
            <UpdateBookingModel data={item} />
            <Button
              onClick={() => handleDeleteMyBooking(item.key)}
              disabled={onGoing || isDeleting}
            >
              Delete
            </Button>
            <Button
              onClick={() => handleReturnCarWithPayment(item.key)}
              disabled={payment || onGoing || paymentPaid}
            >
              Payment
            </Button>
          </Space>
        );
      },
      responsive: ["xs", "sm", "md", "lg"],
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="bg-white p-6 mb-12 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-center text-gray-800 mb-6 md:mb-10">
          Total Bookings <span className="text-blue-600">List</span>
        </h2>
      </div>

      {isLoading || isFetching ? (
        <div className="flex justify-center items-center min-h-[70vh]">
          <HashLoader size={80} color="#4A90E2" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={tableData || []}
            pagination={false}
          />
        </div>
      )}
    </div>
  );
};

export default MyBookings;

const UpdateBookingModel = ({ data }: any) => {
  const [updateBooking] = bookingApi.useUpdateBookingMutation();
  const { register, handleSubmit, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (updateData) => {
    const bookingData = {
      identity: updateData?.identity,
      identityNo: updateData?.identityNo,
      drivingLicenseNo: updateData?.drivingLicenseNo,
    };
    try {
      await updateBooking({
        bookingId: data.key,
        bookingData,
      }).unwrap();

      Swal.fire(
        "Updated!",
        "Your booking has been updated successfully.",
        "success"
      );
      handleCancel();
      reset();
    } catch (error: any) {
      Swal.fire(
        "Error!",
        error.message || "There was an error updating your booking.",
        "error"
      );
    }
  };

  const onGoing = data.status === "ongoing";
  const isCompleted = data.status === "completed";
  return (
    <div>
      <Button onClick={showModal} disabled={onGoing || isCompleted}>
        Update
      </Button>
      <Modal
        title="Update Booking"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="w-full max-w-lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-3">
            <label>NID/PASSPORT</label>
            <select
              className="mt-1 bg-white border text-gray-900 text-sm rounded block w-full p-2.5 shadow-lg"
              {...register("identity")}
            >
              <option value="nid" selected={data.identity === "nid"}>
                NID
              </option>
              <option value="passport" selected={data.identity === "passport"}>
                Passport
              </option>
            </select>
          </div>
          <div className="flex flex-col mb-3">
            <label>ID Number</label>
            <input
              className="mt-1 bg-white border text-gray-900 text-sm rounded block w-full p-2.5 shadow-lg"
              {...register("identityNo")}
              defaultValue={data.identityNo}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label>Driving License Number</label>
            <input
              className="mt-1 bg-white border text-gray-900 text-sm rounded block w-full p-2.5 shadow-lg"
              {...register("drivingLicenseNo")}
              defaultValue={data.drivingLicenseNo}
            />
          </div>
          <Button className="mt-4 bg-blue-500 text-white" htmlType="submit">
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};
