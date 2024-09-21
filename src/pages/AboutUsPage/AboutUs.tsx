// src/pages/AboutUs.jsx
import { FiMapPin, FiPhoneIncoming, FiMail } from "react-icons/fi";
import team1 from "../../assets/wahid.png";
import car1 from "../../assets/Audi1.png";
import car2 from "../../assets/ferrari.png";
import car3 from "../../assets/slide/car1.png";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

import { LiaLinkedin } from "react-icons/lia";

// Dummy data for team members and fleet categories
const teamMembers = [
  { id: 1, photo: team1, name: "MD WAHID ", role: "CEO" },
  {
    id: 2,
    photo: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Jane Smith",
    role: "COO",
  },
  {
    id: 3,
    photo: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Michael Brown",
    role: "CTO",
  },
  {
    id: 4,
    photo: "https://randomuser.me/api/portraits/men/8.jpg",
    name: "Doe Brown",
    role: "Manager",
  },
];

const fleetCategories = [
  {
    id: 1,
    image: car1,
    name: "Sports",
    description:
      "Affordable and fuel-efficient cars for budget-conscious travelers.",
  },
  {
    id: 2,
    image: car3,
    name: "Luxury",
    description:
      "Experience ultimate comfort and style with our luxury vehicles.",
  },
  {
    id: 3,
    image: car2,
    name: "SUVs",
    description:
      "Spacious and versatile SUVs perfect for family trips and adventures.",
  },
];

const AboutUs = () => {
  return (
    <div>
      {/* Header Section */}
      <header
        className="bg-cover bg-no-repeat	 bg-center h-80 "
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/white-sport-sedan-with-colorful-tuning-road_114579-5044.jpg?t=st=1726843620~exp=1726847220~hmac=56aa450dccc63963e2e3487087e0c507044b8753a561347f44405491eaca998b&w=1380')",
        }}
      >
        <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            About Us
          </h1>
        </div>
      </header>

      {/* Company History */}
      <section className="py-10 px-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-6">Our History</h2>
        <p className="max-w-3xl mx-auto text-center text-gray-700">
          Founded in 2010, RentCars is committed to providing top-quality
          vehicle rentals to travelers worldwide. Our mission is to deliver an
          exceptional experience and redefine the car rental industry with a
          customer-first approach.
        </p>
      </section>

      {/* Our Team */}
      <section className="py-10 bg-white container mx-auto text-center mt-20 px-4">
        <p className="text-gray-600 text-sm md:text-base">
          HELPS YOU TO FIND THE PERFECT CAR
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold mt-2">
          Meet our <span className="text-red-700">Amazing Team Members</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 mt-20">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <div className="flex justify-center mt-4 space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-700">
                  <LiaLinkedin size={24} />
                </a>
                <a href="#" className="text-gray-600 hover:text-pink-600">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Fleet */}
      <section className="py-10 px-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-6">Our Fleet</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fleetCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values & Commitment */}
      <section className="py-10 bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">
          Our Values & Commitment
        </h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center px-6">
          <div className="md:w-1/2">
            <p className="text-gray-700">
              We are dedicated to providing exceptional service, prioritizing
              sustainability, and maintaining a customer-first approach in
              everything we do.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/3d-car-city-street_23-2150796864.jpg?t=st=1726844037~exp=1726847637~hmac=8fbd46249e6a0559980fd1321e044c3e0466eda6f705c8edd93f5dcf34fa87df&w=740"
            alt="Our Values"
            className="md:w-1/2 mt-4 md:mt-0 object-cover rounded-full"
          />
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-10 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        <div className="flex flex-col items-center space-y-4">
          <p className="flex items-center space-x-2">
            <FiMapPin className="text-xl" />
            <span>25586 Hc 1, Glennallen, Alaska, 99588, USA</span>
          </p>
          <p className="flex items-center space-x-2">
            <FiPhoneIncoming className="text-xl" />
            <span>+603 4784 273 12</span>
          </p>
          <p className="flex items-center space-x-2">
            <FiMail className="text-xl" />
            <span>rentcars@gmail.com</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
