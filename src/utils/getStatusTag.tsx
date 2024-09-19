import { Tag } from "antd";

export const GetStatusTag = (status: string) => {
  switch (status) {
    case "completed":
      return <Tag className="text-green-700 font-bold ">completed</Tag>;
    case "ongoing":
      return <Tag className="text-yellow-700 font-bold ">ongoing</Tag>;
    case "pending":
      return <Tag className="text-red-600  font-bold">Pending</Tag>;
    default:
      return <Tag className="text-gray-500">{status}</Tag>;
  }
};
export const PaymentStatusTag = (paymentStatus: string) => {
  switch (paymentStatus) {
    case "pending":
      return <Tag className="text-red-600 font-bold ">Pending</Tag>;
    case "paid":
      return <Tag className="text-green-700 font-bold ">Paid</Tag>;

    default:
      return <Tag className="text-gray-500">{paymentStatus}</Tag>;
  }
};
