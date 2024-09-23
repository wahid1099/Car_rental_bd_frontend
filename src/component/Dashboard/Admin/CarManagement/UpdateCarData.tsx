/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  carFeatures,
  vehicleSpecifications,
} from "../../../../type/global.type";
import { MultiValue } from "react-select";
import Select from "react-select";
import uploadImageToCloudinary from "../../../../utils/uploadImage";
import { carApi } from "../../../../redux/features/Car/CarApi";
import { toast } from "sonner";

type OptionType = {
  value: string;
  label: string;
};

const UpdateCar = ({ data }: any) => {
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);
  const [selectVehicleSpecifications, setSelectVehicleSpecifications] =
    useState<OptionType[]>([]);
  const { register, setValue, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const [updateCar] = carApi.useUpdateCarMutation();

  // Handle change for car features
  const handleFeatureChange = (selectedOptions: MultiValue<OptionType>) => {
    setSelectOptions(selectedOptions as OptionType[]);
    setValue(
      "carFeatures",
      selectedOptions.map((option) => option.value)
    ); // Store selected feature values
  };

  // Handle change for vehicle specifications
  const handleSpecificationChange = (
    selectedOptions: MultiValue<OptionType>
  ) => {
    setSelectVehicleSpecifications(selectedOptions as OptionType[]);
    setValue(
      "vehicleSpecifications",
      selectedOptions.map((option) => option.value)
    );
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (cdata) => {
    setIsLoading(true);
    const { rating, maxSeats, pricePerHour, carImgUrl, isElectric, ...rest } =
      cdata;

    const ratingValue = Number(rating);
    const seatsValue = Number(maxSeats);
    const priceValue = Number(pricePerHour);

    // Handle image upload separately
    let imageUploadResult = data?.carImgUrl; // Default to existing image
    if (carImgUrl.length > 0) {
      imageUploadResult = await uploadImageToCloudinary(carImgUrl);
    }
    // Prepare data for submission
    const updatedData = {
      ...rest,
      rating: ratingValue,
      maxSeats: seatsValue,
      pricePerHour: priceValue,
      isElectric: isElectric === "true" ? true : false,
      carImgUrl: imageUploadResult,
      features: selectOptions.map((option) => option.value), // Make sure it's an array of values
      vehicleSpecification: selectVehicleSpecifications.map(
        (option) => option.value
      ),
    };
    try {
      const res = await updateCar({
        id: data?.key,
        carData: updatedData,
      }).unwrap();
      console.log(res);
      toast.success("Car Updated Successfully", { position: "top-center" });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={showModal}>Update Car</Button>
      <Modal
        title="Update Car"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Car Name
                </label>
                <input
                  type="text"
                  defaultValue={data?.carName}
                  {...register("name")}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rating
                </label>
                <input
                  defaultValue={data?.rating}
                  type="number"
                  {...register("rating")}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="isElectric"
                  className="block text-sm font-medium text-gray-700"
                >
                  Is Electric?
                </label>
                <select
                  {...register("isElectric")}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  <option value="">Select...</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="pricePerHour"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price Per Hour
                </label>
                <input
                  defaultValue={data?.pricePerHour}
                  type="number"
                  {...register("pricePerHour")}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="carImgUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Car Image
                </label>
                <input
                  type="file"
                  id="carImgUrl"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  {...register("carImgUrl")}
                />
              </div>

              <div>
                <label
                  htmlFor="maxSeats"
                  className="block text-sm font-medium text-gray-700"
                >
                  Max Seats
                </label>
                <input
                  defaultValue={data?.maxSeats}
                  type="number"
                  {...register("maxSeats")}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
                  Car Color
                </label>
                <input
                  defaultValue={data?.color}
                  type="text"
                  {...register("color")}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="gearType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gear Type
                </label>
                <input
                  defaultValue={data?.gearType}
                  type="text"
                  {...register("gearType")}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fuelType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fuel Type
                </label>
                <input
                  defaultValue={data?.fuelType}
                  type="text"
                  {...register("fuelType")}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="carType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Car Type
                </label>
                <select
                  defaultValue={data?.carType}
                  {...register("carType")}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  <option value="">Select car type</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Truck">Truck</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="carFeatures"
                  className="block text-sm font-medium text-gray-700"
                >
                  Car Features
                </label>
                <Select
                  // defaultValue={data?.carFeature}
                  options={carFeatures}
                  value={selectOptions}
                  isMulti={true}
                  onChange={handleFeatureChange}
                  className="mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="vehicleSpecifications"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehicle Specifications
                </label>
                <Select
                  // defaultValue={data?.vehicleSpecifications}
                  options={vehicleSpecifications}
                  value={selectVehicleSpecifications}
                  isMulti={true}
                  onChange={handleSpecificationChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                defaultValue={data?.description}
                {...register("description")}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <button
              type="submit"
              className={`bg-blue-500 text-white w-full font-bold py-2 px-4 rounded ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "updating..." : "Update Car"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateCar;
