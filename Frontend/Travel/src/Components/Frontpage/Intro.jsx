import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { SlCalender } from "react-icons/sl";
import { IoPeopleOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { PiCashRegister } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { IoPeople } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";

const Intro = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [trips, setTrips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user ? user._id : null;

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/trips/search?destination=${destination}&startDate=${startDate}`
      );
      setTrips(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const handleBooking = () => {
    if (!token) {
      toast.error("You need to register first!", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      console.log("User is authenticated. Proceed with booking logic.");
    }
  };
  const animation = {
    animation: 'scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  }
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <ToastContainer />

      {/* Login/Register Section */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
        {token ? (
          <Avatar
            size={40}
            icon={<UserOutlined />}
            className="cursor-pointer shadow-lg bg-white"
            onClick={() => navigate(`/dashboard/${userID}`)}
          />
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-full shadow-md transition duration-300 hover:bg-green-600 text-sm sm:text-base"
            onClick={() => navigate(`/register`)}
          >
            Register
          </button>
        )}
      </div>

      {/* Background Image Section */}
      <div className="relative flex-grow w-full flex flex-col items-center justify-center px-4 sm:px-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("/vbi.jpg")` }}
        />
        <div className="absolute inset-0 bg-black/70" />

        {/* Logo */}
        <img
          src="/logo.png"
          alt="Pak Travels"
          className="h-12 w-12 sm:h-14 sm:w-14 absolute top-2 left-4 sm:left-5 z-20"
        />

        {/* Title */}
        <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold text-center z-20 max-w-3xl pt-10 sm:pt-16">
          Explore Pakistan with <span className="text-green-400">TripSync</span>
        </h1>

        {/* Search Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-4 items-stretch md:items-end z-50 mt-8 sm:mt-12 w-full max-w-lg sm:max-w-2xl">
          {/* Destination Input */}
          <div className="flex flex-col w-full">
            <label className="text-gray-600 font-semibold text-sm">Destination</label>
            <input
              type="text"
              placeholder="Enter destination"
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* Date Input */}
          <div className="flex flex-col w-full">
            <label className="text-gray-600 font-semibold text-sm">Date</label>
            <input
              type="date"
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <button
            className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition text-sm sm:text-base"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Modal for Search Results */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-3xl relative" style={animation}>
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              <AiOutlineClose size={24} />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Available Trips</h2>
            <div className="grid gap-4 relative max-h-64 sm:max-h-80 overflow-y-auto p-2">
              {trips.length > 0 ? (
                trips.map((trip, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-4 relative"
                  >
                    <img
                      src={
                        trip.image
                          ? `http://localhost:5000/${trip.image}`
                          : "https://via.placeholder.com/150"
                      }
                      alt={trip.title || "Trip"}
                      className="w-full sm:w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex flex-col gap-1 w-full">
                      <h3 className="text-sm sm:text-lg font-semibold">{trip.title || "Unknown Trip"}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 flex gap-2 items-center">
                        <SlCalender className="text-yellow-400" />
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 flex gap-2 items-center">
                        <IoPeople className="text-orange-400" /> {trip.numPeople} ({trip.numPeople - trip.registration} slots available)
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 flex gap-2 items-center">
                        <FaLocationDot className="text-blue-400" /> {trip.destination}
                      </p>
                      <p className="text-green-600 font-bold text-sm sm:text-base">
                        Rs. {trip.price ? trip.price.toFixed(2) : "0.00"}{" "}
                        <span className="text-gray-600 font-medium text-xs sm:text-sm">/ per person</span>
                      </p>
                    </div>
                    <button
                      className="text-white bg-blue-500 px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 absolute bottom-2 right-2"
                      onClick={handleBooking}
                    >
                      <PiCashRegister />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No trips available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Intro;
