import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { BsPeople, BsList } from "react-icons/bs";
import { FaMountainSun } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { setTourCount } from '../../redux/tourSlice';
import { setBookingCount } from '../../redux/bookingSlice';
import { setExpenseCount } from '../../redux/expenseSlice';
import { motion } from "framer-motion";
import { format, isValid } from "date-fns";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import axios from "axios";

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const tourCount = useSelector(state => state.tour.count);
    const bookingCount = useSelector(state => state.booking.count);
    const expenseCount = useSelector(state => state.expense.count);
    const user = JSON.parse(localStorage.getItem("user"));
    const [bookings, setBookings] = useState([]);
    const userID = user ? user._id : null;
    
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/dashboard/${userID}`);
                dispatch(setTourCount(response.data.tours));
                dispatch(setBookingCount(response.data.bookings));
                dispatch(setExpenseCount(response.data.total_expenses));
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        if (userID) {
            fetchDashboardData();
            axios.get(`http://localhost:5000/booking/${userID}`)
                .then((response) => setBookings(response.data))
                .catch((error) => console.error("Error fetching bookings:", error));
        }
    }, [dispatch, userID]);

    // Card data for easier management
    const dashboardCards = [
        {
            title: "Total Bookings",
            icon: <BsPeople className="text-white text-xl" />,
            count: String(bookingCount).padStart(2, '0'),
            bgColor: "bg-gradient-to-br from-indigo-500 to-purple-600",
            iconBg: "bg-purple-400/50",
            textColor: "text-white"
        },
        {
            title: "Your Tours",
            icon: <FaMountainSun className="text-white text-xl" />,
            count: String(tourCount).padStart(2, '0'),
            bgColor: "bg-gradient-to-br from-amber-400 to-yellow-500",
            iconBg: "bg-yellow-300/50",
            textColor: "text-white"
        },
        {
            title: "Total Expense",
            icon: <BsCashCoin className="text-white text-xl" />,
            count: `Rs.${String(expenseCount).padStart(2, '0')}`,
            bgColor: "bg-gradient-to-br from-emerald-400 to-green-600",
            iconBg: "bg-green-400/50",
            textColor: "text-white"
        }
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
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
                style={{ zIndex: 9999 }}
            />

            {/* Sidebar */}
            <div className={`w-1/5 ${sidebarOpen ? "block fixed z-50 h-full shadow-2xl" : "hidden"} lg:block`}>
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-4/5 p-6 md:p-10">
                {/* Mobile Header */}
                <div className="flex justify-between items-center mb-8 lg:hidden">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-green-400">Dashboard</h1>
                    <button
                        className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle Sidebar"
                    >
                        <BsList className="text-xl" />
                    </button>
                </div>

                {/* Dashboard Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 hidden lg:block dark:text-green-400 mb-2">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Welcome Back! Here is your booking activity from the last 24 hours.
                    </p>
                </div>

                {/* Card Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {dashboardCards.map((card, index) => (
                        <div key={index} className="relative">
                            <motion.div
                                className={`absolute inset-0 ${card.bgColor.split('from-')[1].split(' ')[0]} opacity-30 blur-xl rounded-2xl`}
                                animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.4, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className={`h-40 rounded-2xl shadow-lg overflow-hidden ${card.bgColor} hover:shadow-xl transition-all duration-300`}
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="h-full w-full p-6 flex flex-col justify-between relative">
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-3 rounded-full ${card.iconBg}`}>
                                            {card.icon}
                                        </div>
                                        <h3 className={`font-medium ${card.textColor}`}>{card.title}</h3>
                                    </div>
                                    <h2 className={`text-4xl font-bold ${card.textColor}`}>
                                        {card.count}
                                    </h2>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Recent Bookings Section */}
                <motion.div 
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Your Recent Bookings
                        </h2>
                    </div>

                    <div className="p-6">
                        {Array.isArray(bookings) && bookings.length > 0 ? (
                            <ul className="space-y-6">
                                {bookings.map((booking) => {
                                    const tripDate = booking?.trip?.start_date ? new Date(booking.trip.start_date) : null;

                                    return (
                                        <li
                                            key={booking._id}
                                            className="bg-gray-50 dark:bg-gray-750 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <div className="flex flex-col sm:flex-row dark:bg-gray-900 bg-gray-100">
                                                {/* Trip Image */}
                                                <div className="sm:w-1/4 h-32 sm:h-auto overflow-hidden">
                                                    <img
                                                        src={booking.trip.image ? `http://localhost:5000/${booking.trip.image}` : "https://via.placeholder.com/150"}
                                                        alt={booking.trip.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Trip Details */}
                                                <div className="flex flex-col sm:flex-row p-4 w-full">
                                                    <div className="flex-1 space-y-2">
                                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                            {booking.trip.title}
                                                        </h3>
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                                                            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                                <FaMapMarkerAlt className="text-emerald-500" />
                                                                {booking.trip.destination}
                                                            </p>
                                                            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                                <IoIosPeople className="text-purple-500" />
                                                                {booking.trip.registration} people
                                                            </p>
                                                            {tripDate && isValid(tripDate) ? (
                                                                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                                    <FaCalendarAlt className="text-blue-500" />
                                                                    {format(tripDate, "dd MMM yyyy")}
                                                                </p>
                                                            ) : (
                                                                <p className="text-gray-400 italic">Date not available</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Price & Booking Time */}
                                                    <div className="mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700 sm:pl-4 flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-2 sm:min-w-[120px]">
                                                        <p className="font-bold text-xl text-emerald-600 dark:text-emerald-400">
                                                            Rs.{booking.trip.price}
                                                        </p>

                                                        {booking.created_at && isValid(new Date(booking.created_at)) ? (
                                                            <p className="text-gray-500 dark:text-gray-400 text-xs">
                                                                Booked: {format(new Date(booking.created_at), "dd MMM yy")}
                                                            </p>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                                    <FaCalendarAlt className="text-3xl text-gray-400" />
                                </div>
                                <p className="text-gray-500 dark:text-gray-400">No recent bookings found.</p>
                                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                    Your booking history will appear here.
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;




