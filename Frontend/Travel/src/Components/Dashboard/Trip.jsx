import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import CreateTrip from './CreateTrip'
import { BsList } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import TripCard from './TripCard';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Trip = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [trips, setTrips] = useState([])
  const params = useParams();

  const handleIconClick = () => {
    setIsPopUpVisible(true);
  };
  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
  };
  const fetchMyTrips = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/trips/${params.id}`);
      const { myTrips } = response.data;
      setTrips(myTrips);
      console.log(trips.num_People);
      
    } catch (err) {
      console.error(err);
      alert("Failed to fetch trips. Please try again.");
    }
  };
  const addNewTrip = (newTrip) => {
    setTrips((prevTrips) => [...prevTrips, newTrip]); // Update state immediately
  };
  useEffect(() => {
    fetchMyTrips();
  }, []);
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Sidebar: Always visible on large screens; toggled on mobile */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }} // Ensure it's on top
      />
      <div
        className={`w-1/5 ${sidebarOpen ? 'block absolute z-50 bg-white h-full shadow-lg' : 'hidden'} lg:block`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-4/5 p-6 relative">
        {/* Header for Main Content */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-black dark:text-green-500">Trip Managment</h1>
          {/* Hamburger button: Visible only on mobile */}
          <button
            className="lg:hidden text-3xl p-2 rounded-md focus:outline-none dark:text-green-500"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <BsList />
          </button>
        </div>

        <button className='fixed bottom-3 right-4 bg-green-600 text-white p-2 flex justify-center align-middle items-center gap-2 rounded-lg hover:bg-green-800 transition-all duration-300 ease-in-out z-30' onClick={handleIconClick}>
          <IoMdAdd />
          Create New Trip
        </button>
        {isPopUpVisible && <CreateTrip closePopUp={handleClosePopUp} addNewTrip={addNewTrip} />}
        <TripCard trips={trips} fetchMyTrips={fetchMyTrips}/>
      </div>
    </div>
  );
};

export default Trip;
