import { useState } from "react";
import { carApi } from "../../redux/features/Car/CarApi";
import FeaturedCarCard from "../../component/CardCard/CarCard";
import { TCar } from "../../type/global.type";
import { GridLoader } from "react-spinners";

const CarList = () => {
  const [carType, setCarType] = useState("");
  const [price, setPrice] = useState<number>(0);
  const { data: getCars, isFetching } = carApi.useGetAllCarsQuery({
    price,
    carType,
  });

  const carData = getCars?.data;

  const handlePriceRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value);
    setPrice(parsedValue);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[500px] w-full bg-black">
        <div
          style={{
            backgroundImage:
              "url('https://www.bcautosalesni.com/build/assets/img/homepage-bg-5.jpg')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Find Your Dream Car
          </h1>
          <p className="text-sm md:text-lg">
            Browse through our wide range of cars and book your favorite one
            today!
          </p>
        </div>
      </div>

      {/* Filter & Cars */}
      <div className="container gap-8 mx-auto flex flex-col md:flex-row justify-around mt-12 px-4">
        {/* Filter Section */}
        <div className="bg-gray-100 rounded-md w-full md:w-80 p-6 shadow-lg mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-6">Filter Cars</h2>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Car Type
            </label>
            <select
              onChange={(e) => setCarType(e.target.value)}
              id="car-type"
              className="w-full bg-white border border-gray-300 rounded-lg text-sm p-3 shadow-sm focus:ring focus:ring-blue-500"
            >
              <option value="">Select Car Type</option>
              <option value="luxury sedan">Luxury Sedan</option>
              <option value="sports car">Sports Car</option>
              <option value="muscle car">Muscle Car</option>
              <option value="suv">SUV</option>
              <option value="convertible">Convertible</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Price Range: <span className="text-red-500">Tk {price}</span>
            </label>
            <input
              type="range"
              min="0"
              max="2000"
              value={price}
              onChange={handlePriceRange}
              className="w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Cars Grid Section */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isFetching ? (
              <div className="col-span-full flex justify-center">
                <GridLoader size={60} color="blue" />
              </div>
            ) : (
              carData?.map((car: TCar) => (
                <FeaturedCarCard key={car._id} car={car} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarList;
