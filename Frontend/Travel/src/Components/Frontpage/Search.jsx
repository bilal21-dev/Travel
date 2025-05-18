import React from "react";

const Search = () => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-lg flex items-center gap-4 justify-center">
            {/* Destination Input */}
            <div className="flex flex-col">
                <label className="text-gray-600 font-semibold">Destination</label>
                <input
                    type="text"
                    placeholder="Enter destination"
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Date Input */}
            <div className="flex flex-col">
                <label className="text-gray-600 font-semibold">Date</label>
                <input
                    type="date"
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Search Button */}
            <button className="bg-green-500 text-white px-5 py-2 mt-6 rounded-md hover:bg-green-600 transition">
                Search
            </button>
        </div>
    );
};

export default Search;



