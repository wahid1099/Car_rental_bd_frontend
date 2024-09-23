import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";
import {
  carFeatures,
  vehicleSpecifications,
} from "../../../../type/global.type";
import { useState } from "react";
import { carApi } from "../../../../redux/features/Car/CarApi";
import Swal from "sweetalert2";
import uploadImageToCloudinary from "../../../../utils/uploadImage";

type OptionType = {
  value: string;
  label: string;
};

const AddCarData = () => {
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);
  const [selectVehicleSpecifications, setSelectVehicleSpecifications] =
    useState<OptionType[]>([]);
  const [addCar] = carApi.useCreateCarMutation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset, // Import reset function
    formState: { errors },
  } = useForm();

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
  // Handle onSubmit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const {
      rating,
      pricePerHour,
      maxSeats,
      carImgUrl,
      isElectric,
      carFeatures,
      vehicleSpecifications,
      ...rest
    } = data;
    const userImage = await uploadImageToCloudinary(carImgUrl);

    const modifiedData = {
      ...rest,
      rating: Number(rating),
      pricePerHour: Number(pricePerHour),
      maxSeats: Number(maxSeats),
      carImgUrl: userImage,
      isElectric: isElectric === "true" ? true : false,
      features: carFeatures,
      vehicleSpecification: vehicleSpecifications,
    };

    try {
      const response = await addCar(modifiedData).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Car added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log(response);
      reset(); // Clear the form after successful submission
      setSelectOptions([]); // Clear the selected options state for features
      setSelectVehicleSpecifications([]); // Clear the selected options state for specifications
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add car. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-400 p-8 mb-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-white">
          Create New <span className="text-indigo-800">Car</span>
        </h2>
      </div>
      <div className="container mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Car Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Car Name is required" })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">
                  {String(errors.name.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Rating
              </label>
              <input
                type="number"
                {...register("rating", { required: "Car rating is required" })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.rating && (
                <p className="text-red-500 text-xs">
                  {String(errors.rating.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="isElectric"
                className="block text-sm font-medium text-gray-700"
              >
                Is Electric?
              </label>
              <select
                {...register("isElectric", {
                  required: "Please select if the car is electric",
                })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {errors.isElectric && (
                <p className="text-red-500 text-xs">
                  {String(errors.isElectric.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="pricePerHour"
                className="block text-sm font-medium text-gray-700"
              >
                Price Per Hour
              </label>
              <input
                type="number"
                {...register("pricePerHour", {
                  required: "Price Per Hour is required",
                })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.pricePerHour && (
                <p className="text-red-500 text-xs">
                  {String(errors.pricePerHour.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="maxSeats"
                className="block text-sm font-medium text-gray-700"
              >
                Max Seats
              </label>
              <input
                type="number"
                {...register("maxSeats", {
                  required: "Max Seats are required",
                })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.maxSeats && (
                <p className="text-red-500 text-xs">
                  {String(errors.maxSeats.message)}
                </p>
              )}
            </div>

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
                {...register("carImgUrl", {
                  required: "Car Image is required",
                })}
              />
              {errors.carImgUrl && (
                <p className="text-red-500 text-xs">
                  {String(errors.carImgUrl.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700"
              >
                Car Color
              </label>
              <input
                type="text"
                {...register("color", { required: "color is required" })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.color && (
                <p className="text-red-500 text-xs">
                  {String(errors.color.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="gearType"
                className="block text-sm font-medium text-gray-700"
              >
                Gear Type
              </label>
              <input
                type="text"
                {...register("gearType", { required: "Gear Type is required" })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.gearType && (
                <p className="text-red-500 text-xs">
                  {String(errors.gearType.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="fuelType"
                className="block text-sm font-medium text-gray-700"
              >
                Fuel Type
              </label>
              <input
                type="text"
                {...register("fuelType", { required: "Fuel Type is required" })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.fuelType && (
                <p className="text-red-500 text-xs">
                  {String(errors.fuelType.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="carType"
                className="block text-sm font-medium text-gray-700"
              >
                Car Type
              </label>
              <select
                {...register("carType", {
                  required: "Please select a car type",
                })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select car type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Convertible">Convertible</option>
                <option value="Truck">Truck</option>
              </select>
              {errors.carType && (
                <p className="text-red-500 text-xs">
                  {String(errors.carType.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="carFeatures"
                className="block text-sm font-medium text-gray-700"
              >
                Car Features
              </label>
              <Select
                options={carFeatures}
                value={selectOptions}
                isMulti={true}
                onChange={handleFeatureChange} // Set the onChange handler
              />
              {errors.carFeatures && (
                <p className="text-red-500 text-xs">
                  {String(errors.carFeatures.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="vehicleSpecifications"
                className="block text-sm font-medium text-gray-700"
              >
                Vehicle Specifications
              </label>
              <Select
                options={vehicleSpecifications}
                value={selectVehicleSpecifications}
                isMulti={true}
                onChange={handleSpecificationChange}
              />
              {errors.vehicleSpecifications && (
                <p className="text-red-500 text-xs">
                  {String(errors.vehicleSpecifications.message)}
                </p>
              )}
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
              {...register("description", {
                required: "Car Description is required",
              })}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {String(errors.description.message)}
              </p>
            )}
          </div>

          <div className="flex justify-center mt-10 col-span-full">
            <button
              type="submit"
              className={`bg-blue-800 text-white w-full font-bold py-2 px-4 rounded ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Add New Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarData;
