import Slider from "react-slick";
import CarCard from "./CarCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carApi } from "../../redux/features/Car/CarApi";
import { MoonLoader } from "react-spinners";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TCar } from "../../type/global.type";

const FeaturedCars = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { data: getCars, isFetching } = carApi.useGetAllCarsQuery({ price: 0 });
  const carData = getCars?.data;

  return (
    <div>
      <div className="text-center py-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Recommended <span className="text-red-500">Cars</span>
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <p className="text-gray-600 max-w-2xl mx-auto text-center md:text-left">
            Experience the perfect blend of performance and comfort with our
            top-rated vehicles, featuring advanced technology, sleek design, and
            exceptional fuel efficiency.
          </p>
          <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 cursor-pointer">
            <Link to="/car">
              <FaArrowRight className="text-gray-600 text-xl" />
            </Link>
          </div>
        </div>

        {isFetching ? (
          <div className="flex items-center justify-center min-h-screen">
            <MoonLoader size={200} color="blue" />
          </div>
        ) : (
          <Slider {...settings}>
            {carData?.map((car: TCar, index: number) => (
              <CarCard car={car} key={index} />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default FeaturedCars;
