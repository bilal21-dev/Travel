// import React, { useState } from "react";
// import Sidebar from "../Dashboard/Sidebar";
// import { BsList } from "react-icons/bs";
// import WeatherInfo from "./Weather";
// import CultureInfo from "./Culture";
// import MapComponent from "./MapComponent";
// import { FaMapLocationDot } from "react-icons/fa6";
// import { TiWeatherSunny } from "react-icons/ti";

// const Explore = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [location, setLocation] = useState("");
//     const [searchedLocation, setSearchedLocation] = useState("");
//     const [position, setPosition] = useState([33.6844, 73.0479]);

//     const handleSearch = async () => {
//         setSearchedLocation(location);
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
//             );
//             const data = await response.json();

//             if (data.length > 0) {
//                 setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
//             } else {
//                 alert("Location not found. Try a different name.");
//             }
//         } catch (error) {
//             console.error("Error fetching location:", error);
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 transition duration-300">
//             {/* Sidebar */}
//             <div className={`w-1/5 ${sidebarOpen ? "block absolute z-50 bg-white h-full shadow-lg" : "hidden"} lg:block`}>
//                 <Sidebar />
//             </div>

//             {/* Main Content */}
//             <div className="w-full lg:w-4/5 p-6 relative">
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl lg:text-3xl font-bold text-black dark:text-green-500">
//                         Explore the World
//                     </h1>
//                     <button
//                         className="lg:hidden text-3xl p-2 rounded-md focus:outline-none dark:text-green-500"
//                         onClick={() => setSidebarOpen(!sidebarOpen)}
//                     >
//                         <BsList />
//                     </button>
//                 </div>

//                 {/* Search Input */}
//                 <div className="flex justify-center items-center gap-4">
//                     <input
//                         type="text"
//                         className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-gray-500 w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
//                         onChange={(e) => setLocation(e.target.value)}
//                         value={location}
//                     />
//                     <button
//                         className="px-4 py-2 bg-green-500 rounded-md text-white hover:bg-green-600 transition duration-300"
//                         onClick={handleSearch}
//                     >
//                         Search
//                     </button>
//                 </div>

//                 {/* Weather Section */}
//                 <div className="relative mt-6 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-[#ffffff] to-[#f7f9fc] dark:from-[#0d0e23] dark:to-[#1b1d38] border border-gray-200 dark:border-gray-700 transition duration-300">
//                     <div className="flex items-center gap-2 mb-3">
//                         <TiWeatherSunny className="text-green-500 text-2xl" />
//                         <p className="font-bold text-2xl text-gray-800 dark:text-green-400">
//                             Weather
//                         </p>
//                     </div>
//                     <WeatherInfo location={searchedLocation} />
//                 </div>

//                 {/* Culture Info Component */}
//                 <CultureInfo location={searchedLocation} />

//                 {/* Map Section */}
//                 <div className="mt-6 p-4 bg-white dark:bg-[#1b1d38] border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl transition duration-300 relative z-0">
//                     <div className="flex items-center gap-2 mb-3">
//                         <FaMapLocationDot className="text-green-500 text-xl" />
//                         <p className="font-bold text-2xl text-gray-800 dark:text-green-400">
//                             Location on Map
//                         </p>
//                     </div>
//                     <MapComponent position={position} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Explore;

import React, { useState, useEffect } from "react";
import { Input, Button, Typography, Tooltip } from "antd";
import { SearchOutlined, CompassOutlined } from "@ant-design/icons";
import { BsList } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { TiWeatherSunny } from "react-icons/ti";
import { toast } from "react-toastify";
import Sidebar from "../Dashboard/Sidebar";
import WeatherInfo from "./Weather";
import CultureInfo from "./Culture";
import MapComponent from "./MapComponent";

const { Title, Text } = Typography;

const Explore = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [location, setLocation] = useState("");
    const [searchedLocation, setSearchedLocation] = useState("");
    const [position, setPosition] = useState([33.6844, 73.0479]);
    const [isLoading, setIsLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        const savedSearches = localStorage.getItem("recentExploreSearches");
        if (savedSearches) {
            setRecentSearches(JSON.parse(savedSearches));
        }
    }, []);

    const updateRecentSearches = (newLocation) => {
        if (!newLocation.trim()) return;

        const updatedSearches = [
            newLocation,
            ...recentSearches.filter((item) => item !== newLocation),
        ].slice(0, 5);

        setRecentSearches(updatedSearches);
        localStorage.setItem("recentExploreSearches", JSON.stringify(updatedSearches));
    };

    const handleSearch = async () => {
        if (!location.trim()) {
            toast.warning("Please enter a location");
            return;
        }

        setIsLoading(true);
        setSearchedLocation(location);
        updateRecentSearches(location);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
            );
            const data = await response.json();

            if (data.length > 0) {
                setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
                toast.success(`Found location: ${data[0].display_name}`);
            } else {
                toast.error("Location not found. Try a different name.");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
            toast.error("Error searching for location. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-all duration-300">
            {/* Sidebar */}
            <div
                className={`${
                    sidebarOpen ? "block fixed z-50 h-full shadow-xl transition-all duration-300 ease-in-out" : "hidden"
                } lg:block lg:relative lg:w-1/5 z-30`}
            >
                <Sidebar />
            </div>

            {/* Mobile Backdrop */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-white bg-opacity-50 z-[-1]"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="w-full lg:w-4/5 p-4 md:p-6 relative transition-all duration-300 ease-in-out">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 fade-in">
                    <div className="flex items-center space-x-3">
                        <CompassOutlined className="text-green-500 text-2xl lg:text-3xl animate-pulse" />
                        <Title level={2} className="!text-2xl lg:!text-3xl !font-bold !text-gray-800 !m-0 dark:!text-green-400">
                            Explore the World
                        </Title>
                    </div>
                    <button
                        className="lg:hidden text-3xl p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 focus:outline-none text-green-600 dark:text-green-400 transition-all duration-300"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <BsList />
                    </button>
                </div>

                {/* Search */}
                <div className="mb-8 max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700">
                        <Text className="block mb-3 text-gray-600 dark:text-gray-300 font-medium">
                            Where would you like to explore?
                        </Text>

                        <div className="flex flex-col md:flex-row gap-3">
                            <Input
                                size="large"
                                placeholder="Enter city or country name..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="flex-grow"
                                prefix={<SearchOutlined className="text-gray-400" />}
                            />
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleSearch}
                                loading={isLoading}
                                className="!bg-green-500 hover:!bg-green-600 transition-all duration-300"
                            >
                                {isLoading ? "Searching..." : "Explore"}
                            </Button>
                        </div>

                        {recentSearches.length > 0 && (
                            <div className="mt-4">
                                <Text className="text-sm text-gray-500 dark:text-gray-400">Recent searches:</Text>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {recentSearches.map((item, index) => (
                                        <Tooltip title="Click to search again" key={index}>
                                            <Button
                                                size="small"
                                                onClick={() => {
                                                    setLocation(item);
                                                    setSearchedLocation(item);
                                                    handleSearch();
                                                }}
                                                className="!bg-gray-100 !text-gray-700 hover:!bg-green-100 dark:!bg-gray-700 dark:!text-gray-300 dark:hover:!bg-green-800/30"
                                            >
                                                {item}
                                            </Button>
                                        </Tooltip>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Weather + Culture Section */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Weather Box */}
                    <div className="fade-in flex-1 bg-white dark:from-gray-800 dark:to-indigo-900/30 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 flex flex-col">
                        <div className="p-5 flex-1">
                            <div className="flex items-center gap-2 mb-4">
                                <TiWeatherSunny className="text-blue-500 text-2xl" />
                                <Title level={4} className="!text-xl !font-bold !text-gray-800 !m-0 dark:!text-blue-400">
                                    Weather Forecast
                                </Title>
                            </div>
                            {searchedLocation ? (
                                <WeatherInfo location={searchedLocation} />
                            ) : (
                                <div className="text-center py-8">
                                    <Text className="text-gray-500 dark:text-gray-400">
                                        Search for a location to see weather information
                                    </Text>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Culture Box */}
                    <div className="fade-in flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 flex flex-col">
                        <div className="p-5 flex-1">
                            <CultureInfo location={searchedLocation} />
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="fade-in mt-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <div className="p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <FaMapLocationDot className="text-green-600 text-xl" />
                            <Title level={4} className="!text-xl !font-bold !text-gray-800 !m-0 dark:!text-green-400">
                                {searchedLocation ? `${searchedLocation} on Map` : "World Map"}
                            </Title>
                        </div>
                        <div className="h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                            <MapComponent position={position} />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm py-4">
                    <p>Explore the world's most fascinating destinations with TripSync</p>
                </div>
            </div>
        </div>
    );
};

export default Explore;
