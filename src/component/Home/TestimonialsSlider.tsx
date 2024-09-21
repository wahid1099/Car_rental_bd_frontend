// src/components/TestimonialsSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";

// Sample data for testimonials
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    review:
      "Amazing service! The car was clean and in perfect condition. Will definitely book again.",
    image: "https://randomuser.me/api/portraits/men/44.jpg", // Replace with actual image URLs
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    review:
      "Great experience overall. The booking process was easy, and the staff was friendly.",
    image: "https://randomuser.me/api/portraits/men/88.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 5,
    review:
      "The best rental service I’ve ever used! Highly recommend it to anyone.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    rating: 5,
    review:
      "Top-notch cars and excellent customer support. I had an awesome trip!",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    id: 5,
    name: "Monky Davis",
    rating: 4.5,
    review:
      "Top-notch cars and excellent customer support. I had an awesome trip!",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    id: 6,
    name: "Wahid ahmed",
    rating: 4,
    review:
      "Top-notch cars and excellent customer support. I had an awesome trip!",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  // Add more testimonials as needed
];

const TestimonialsSlider = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Customer Testimonials
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Hear from our happy customers
        </p>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          navigation
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white  p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <FaQuoteLeft className="text-blue-500 text-2xl mb-4" />
                <p className="text-gray-700 italic mb-4">
                  {testimonial.review}
                </p>
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, index) => (
                      <FaStar key={index} />
                    )
                  )}
                </div>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-2"
                />
                <h4 className="text-lg font-semibold">{testimonial.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
