/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Table, Tag } from "antd";
import { carApi } from "../../../../redux/features/Car/CarApi";
import { toast } from "sonner";
import { GridLoader } from "react-spinners";
import { TCar } from "../../../../type/global.type";
import UpdateCar from "./UpdateCarData";

const GetAllCarData = () => {
  const { data: allCars, isLoading: isFetching } = carApi.useGetAllCarsQuery(
    {}
  );
  const carData = allCars?.data;
  const [deleteCar] = carApi.useDeleteCarMutation();

  const tableData = carData?.map((item: TCar) => ({
    key: item._id,
    isDelete: item?.isDelete,
    carImage: item?.carImgUrl ? item.carImgUrl[0] : null,
    carName: item?.name,
    status: item?.status,
    carType: item?.carType,
    rating: item?.rating,
    pricePerHour: item?.pricePerHour,
    description: item?.description,
    color: item?.color,
    maxSeats: item?.maxSeats,
    gearType: item?.gearType,
    fuelType: item?.fuelType,
  }));

  // Delete car handler
  const handleDeleteCar = async (id: string) => {
    try {
      await deleteCar(id).unwrap();
      toast.success("Car Deleted Successfully", { position: "top-right" });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "carImage",
      key: "carImage",
      render: (carImage: string) => (
        <img
          src={carImage}
          alt="Car"
          style={{
            width: 70,
            height: 70,
            borderRadius: "8px",
            objectFit: "cover",
            border: "2px solid #e5e7eb", // Light border around the image
          }}
        />
      ),
    },
    {
      title: "Car Name",
      dataIndex: "carName",
      key: "carName",
    },
    {
      title: "Car Type",
      dataIndex: "carType",
      key: "carType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "completed" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (item: any) => (
        <Space size="middle">
          <Button
            onClick={() => handleDeleteCar(item.key)}
            className="bg-red-500 text-white hover:bg-red-600 transition duration-300"
          >
            Delete
          </Button>
          <UpdateCar data={item} />
        </Space>
      ),
    },
  ];

  if (isFetching)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader size={100} color="blue" />
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-8 mb-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-white">
          Manage All <span className="text-yellow-300">Cars</span>
        </h2>
      </div>
      <Table
        columns={columns}
        dataSource={tableData || []}
        pagination={false}
        className="overflow-x-auto bg-white p-4 shadow-md rounded-lg"
      />
    </div>
  );
};

export default GetAllCarData;
