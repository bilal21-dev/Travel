import React from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { FiEdit2 } from 'react-icons/fi';
import { IoTrophyOutline } from 'react-icons/io5';
import { BsCalendarDate } from 'react-icons/bs';
// import { AiOutlinePulse } from 'react-icons/ai';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Card - Profile Info */}
        <div className="bg-white dark:bg-[#010215] rounded-lg shadow-lg p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-green-200 dark:bg-green-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl text-green-700 dark:text-green-200">B</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Bilal-Ahmar</h2>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <FiEdit2 size={16} />
              </button>
            </div>
            <p className="text-green-500 text-sm mb-6">agency</p>
            
            {/* Member Status */}
            <div className="w-full border-t pt-4">
              <div className="flex items-center gap-3 mb-4">
                {/* <AiOutlinePulse className="text-green-500" size={20} /> */}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member Status</p>
                  <p className="font-medium text-green-500">Active</p>
                </div>
              </div>
              
              {/* Member Since */}
              <div className="flex items-center gap-3 mb-4">
                <BsCalendarDate className="text-green-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Jan 2025</p>
                </div>
              </div>
              
              {/* Tours Completed */}
              <div className="flex items-center gap-3">
                <IoTrophyOutline className="text-green-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tours Completed</p>
                  <p className="font-medium text-gray-700 dark:text-gray-300">12 Tours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Contact & About */}
        <div className="md:col-span-2 space-y-6">
          {/* Contact Information Card */}
          <div className="bg-white dark:bg-[#010215] rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Contact Information</h3>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <FiEdit2 size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <HiOutlineMail className="text-green-500 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-700 dark:text-gray-300">bilalahmar99@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <HiOutlinePhone className="text-green-500 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-gray-700 dark:text-gray-300">03224023765</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 md:col-span-2">
                <HiOutlineLocationMarker className="text-green-500 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Lahore</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Me Card */}
          <div className="bg-white dark:bg-[#010215] rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">About Me</h3>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <FiEdit2 size={16} />
              </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300">we provide good travels</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


