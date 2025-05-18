// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import axios from "axios";
// import { SlCalender } from "react-icons/sl";
// import { FaLocationDot } from "react-icons/fa6";
// import { BsList } from "react-icons/bs";
// import { PiCashRegister } from "react-icons/pi";
// import { useNavigate } from 'react-router-dom';

// const SearchTrips = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [destination, setDestination] = useState("");
//     const [startDate, setStartDate] = useState("");
//     const [trips, setTrips] = useState([]);
//     const navigate = useNavigate();

//     const searchTrip = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/trips/search?destination=${destination}&startDate=${startDate}`);
//             setTrips(response.data);
//         } catch (error) {
//             console.error('Error fetching trips:', error);
//         }
//     };

//     return (
//         <div className='flex min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800'>
//             {/* <div className={`w-1/5 ${sidebarOpen ? 'block absolute z-50 bg-white h-full shadow-lg' : 'hidden'} lg:block`}>
//                 <Sidebar />
//             </div> */}


//             <div className={`w-1/5 ${sidebarOpen ? "block absolute z-50 bg-white h-full shadow-lg" : "hidden"} lg:block`}>
//                 <Sidebar />
//             </div>


//             <div className="w-full lg:w-4/5 p-6">
//                 <div className="flex justify-between items-center mb-6 lg:hidden">
//                     <h1 className="text-2xl font-bold text-black dark:text-green-500">Search Your Destination</h1>
//                     <button className="text-3xl p-2 rounded-md focus:outline-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
//                         <BsList className='dark:text-green-500' />
//                     </button>
//                 </div>

//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-black hidden lg:block dark:text-green-500">Search Your Destinations</h1>
//                 </div>

//                 {/* Search Inputs */}
//                 <div className='lg:flex lg:justify-center mt-10 w-11/12 sm:w-4/5 md:w-3/4 lg:w-4/6 bg-white dark:bg-[#010215] p-6 rounded-lg shadow-lg flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-end mx-auto'>
//                     <div className='flex flex-col w-full sm:w-auto'>
//                         <label className='text-gray-700 dark:text-white font-semibold mb-1'>Destination</label>
//                         <input
//                             type='text'
//                             placeholder='Enter destination'
//                             className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-gray-500 w-full sm:w-auto'
//                             onChange={(e) => setDestination(e.target.value)}
//                         />
//                     </div>
//                     <div className='flex flex-col w-full sm:w-auto'>
//                         <label className='text-gray-700 dark:text-white font-semibold mb-1'>Date</label>
//                         <input
//                             type='date'
//                             className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-gray-500 w-full sm:w-auto'
//                             onChange={(e) => setStartDate(e.target.value)}
//                         />
//                     </div>
//                     <div className='flex w-full sm:w-auto justify-center sm:justify-end'>
//                         <button className='bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300 w-full sm:w-auto' onClick={searchTrip}>
//                             Search
//                         </button>
//                     </div>
//                 </div>

//                 {/* Display Trips */}
//                 <div className="grid gap-4 relative max-h-96 mt-10 p-2 overflow-y-auto custom-scrollbar">
//                     {trips.length > 0 ? (
//                         trips.map((trip, index) => (
//                             <div
//                                 key={index}
//                                 className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center gap-4 relative dark:bg-[#010215]"
//                             >
//                                 <img
//                                     src={
//                                         trip.image
//                                             ? `http://localhost:5000/${trip.image}`
//                                             : "https://via.placeholder.com/150"
//                                     }
//                                     alt={trip.title || "Trip"}
//                                     className="w-30 h-30 object-cover rounded-md"
//                                 />
//                                 <div className="flex flex-col gap-1">
//                                     <h3 className="text-lg font-semibold text-black dark:text-white">{trip.title || "Unknown Trip"}</h3>
//                                     <p className="text-sm text-gray-500 flex gap-2 items-center">
//                                         <SlCalender className="text-yellow-400" />
//                                         {new Date(trip.start_date).toLocaleDateString()} -{" "}
//                                         {new Date(trip.end_date).toLocaleDateString()}
//                                     </p>
//                                     <p className="text-sm text-gray-500 flex gap-2 items-center">
//                                         <FaLocationDot className="text-blue-400" /> {trip.destination}
//                                     </p>
//                                     <p className="text-sm text-gray-500 flex gap-2 items-center">
//                                         👥 {trip.num_people} ( {trip.num_people - trip.registration} slots left)
//                                     </p>
//                                     <p className="text-green-600 font-bold">
//                                         Rs. {trip.price ? trip.price.toFixed(2) : "0.00"} <span className="text-gray-600 font-medium text-sm">/ per person</span>
//                                     </p>
//                                 </div>
//                                 <button
//                                     className="absolute bottom-2 right-2 text-white bg-blue-500 px-3 py-2 rounded-lg flex gap-2"
//                                     onClick={() => {
//                                         navigate(`/dashboard/booking/${trip.id}`)
//                                     }}
//                                 >
//                                     <PiCashRegister className="mt-1" />
//                                 </button>
//                             </div>
//                         ))
//                     ) : (<p></p>
//                     )}
//                 </div>
//             </div>

//             {/* Custom Scrollbar Styles */}
//             <style>
//                 {`
//                 .custom-scrollbar {
//     scrollbar-width: thin;
//     scrollbar-color: #1E3A8A #f3f4f6; /* Dark Blue Thumb on Light Track */
// }

// /* Webkit Browsers (Chrome, Edge, Safari) */
// .custom-scrollbar::-webkit-scrollbar {
//     width: 10px;
//     height: 10px;
// }

// /* Scrollbar Track */
// .custom-scrollbar::-webkit-scrollbar-track {
//     background: #f3f4f6; /* Light gray track */
//     border-radius: 10px; /* Rounded corners */
// }

// /* Scrollbar Thumb */
// .custom-scrollbar::-webkit-scrollbar-thumb {
//     background: #1E3A8A; /* Dark blue */
//     border-radius: 10px; /* Rounded corners */
// }

// /* Hover Effect */
// .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//     background: #172554; /* Slightly darker blue on hover */
// }

// /* Dark Mode Support */
// .dark .custom-scrollbar::-webkit-scrollbar-track {
//     background: #090a25; /* Darker background in dark mode */
// }

// .dark .custom-scrollbar::-webkit-scrollbar-thumb {
//     background: #1E3A8A; /* Dark blue */
// }

// .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//     background: #172554; /* Slightly darker on hover */
// }
//                 `}
//             </style>
//         </div>
//     );
// };

// export default SearchTrips;


import React, { useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { SlCalender } from 'react-icons/sl';
import { FaLocationDot } from 'react-icons/fa6';
import { BsList } from 'react-icons/bs';
import { PiCashRegister } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const SearchTrips = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    const searchTrip = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/trips/search?destination=${destination}&startDate=${startDate}`);
            setTrips(response.data);
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    return (
        <div className="flex min-h-screen  bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
            <div className={`w-1/5 ${sidebarOpen ? 'block absolute z-50 bg-white dark:bg-gray-800 h-full shadow-xl transform transition-transform duration-300 ease-in-out' : 'hidden'} lg:block`}>
                <Sidebar />
            </div>

            <div className="w-full lg:w-4/5 p-6 lg:p-8">
                {/* Mobile Header */}
                <div className="flex justify-between items-center mb-6 lg:hidden">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-green-400">Search Your Destination</h1>
                    <button
                        className="text-3xl p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <BsList className="dark:text-emerald-400" />
                    </button>
                </div>

                {/* Desktop Header */}
                <div className="mb-8 hidden lg:block">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-green-400 tracking-wide">Explore Your Next Adventure</h1>
                </div>

                {/* Search Inputs */}
                <div className="lg:flex lg:justify-center mt-10 w-11/12 sm:w-4/5 md:w-3/4 lg:w-3/5 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-end mx-auto transform transition-all duration-300 ">
                    <div className="flex flex-col w-full sm:w-auto">
                        <label className="text-gray-700 dark:text-gray-300 font-semibold mb-2">Destination</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter destination"
                                className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 dark:text-gray-200 w-full sm:w-48 pl-10"
                                onChange={(e) => setDestination(e.target.value)}
                            />
                            <FaLocationDot className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full sm:w-auto">
                        <label className="text-gray-700 dark:text-gray-300 font-semibold mb-2">Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 dark:text-gray-200 w-full sm:w-48 pl-10"
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <SlCalender className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        </div>
                    </div>
                    <div className="flex w-full sm:w-auto justify-center sm:justify-end">
                        <button
                            className="bg-green-400 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
                            onClick={searchTrip}
                        >
                            Search
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Display Trips */}
                <div className="grid gap-6 relative max-h-[500px] mt-12 p-4 overflow-y-auto custom-scrollbar">
                    {trips.length > 0 ? (
                        trips.map((trip, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex items-center gap-6 relative hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <img
                                    src={
                                        trip.image
                                            ? `http://localhost:5000/${trip.image}`
                                            : "https://via.placeholder.com/150"
                                    }
                                    alt={trip.title || "Trip"}
                                    className="w-32 h-32 object-cover rounded-xl border-2 border-gray-100 dark:border-gray-700"
                                />
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-emerald-300">{trip.title || "Unknown Trip"}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 flex gap-2 items-center">
                                        <SlCalender className="text-yellow-500" />
                                        {new Date(trip.start_date).toLocaleDateString()} -{" "}
                                        {new Date(trip.end_date).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 flex gap-2 items-center">
                                        <FaLocationDot className="text-blue-500" />
                                        {trip.destination}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 flex gap-2 items-center">
                                        👥 {trip.num_people} ({trip.num_people - trip.registration} slots left)
                                    </p>
                                    <p className="text-emerald-600 font-semibold text-lg">
                                        Rs. {trip.price ? trip.price.toFixed(2) : "0.00"}{" "}
                                        <span className="text-gray-500 font-normal text-sm">/ per person</span>
                                    </p>
                                </div>
                                <button
                                    className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex gap-2 items-center"
                                    onClick={() => navigate(`/dashboard/booking/${trip.id}`)}
                                >
                                    <PiCashRegister className="mt-0.5" />
                                    Book Now
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-4">No trips found. Try a different search!</p>
                    )}
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style>
                {`
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #1E3A8A #f3f4f6;
                }

                /* Webkit Browsers (Chrome, Edge, Safari) */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 10px;
                    height: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f3f4f6;
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1E3A8A;
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #172554;
                }

                .dark .custom-scrollbar::-webkit-scrollbar-track {
                    background: #090a25;
                }

                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1E3A8A;
                }

                .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #172554;
                }
                `}
            </style>
        </div>
    );
};

export default SearchTrips;