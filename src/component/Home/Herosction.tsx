// src/components/HeroSection.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import car1 from "../../assets/slide/car1.png";
import car2 from "../../assets/slide/car7.jpg";
import car3 from "../../assets/slide/car6.jpg";
import car4 from "../../assets/slide/car7.webp";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: car1,
    title: "Luxury Cars for Your Journey",
    description:
      "Experience the best in comfort and style.We're here for you anytime, anywhere. Your satisfaction is our priority",
  },
  {
    id: 2,
    image: car2,
    title: "Affordable Rentals",
    description:
      "Find the perfect car within your budget.With Wide Range of Vehicles",
  },
  {
    id: 3,
    image: car3,
    title: "Book Now and Save",
    description: "Special discounts for early bookings.",
  },
  {
    id: 4,
    image: car4,
    title: "Flexible Rental Plans",
    description:
      "Special discounts for early bookings.Rent by the day, week, or month – the choice is yours.",
  },
];

const HeroSection = () => {
  return (
    <section className="relative h-screen">
      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="object-cover w-full h-full"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-2">
                {slide.title}
              </h1>
              <p className="mb-4 text-lg md:text-xl">{slide.description}</p>
              <Link to="/car" className="md:mt-4 mb-6 mb:mb-0">
                <button className="bg-indigo-800 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full mb-8">
                  Book Now
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Search Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Enter Location"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">
          Check Availability
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
