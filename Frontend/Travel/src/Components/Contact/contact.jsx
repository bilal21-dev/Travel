import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-[#090a25]">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We'd love to hear from you! Whether you have a question, feedback, or
          just want to say hello, feel free to reach out.
        </p>
      </div>

      {/* Contact Form and Info Section */}
      <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg dark:bg-[#010215]">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-green-500">
            Send Us a Message
          </h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:text-white"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:text-white"
                placeholder="johndoe@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:text-white"
                // placeholder="How can we help you?"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-8 rounded-lg shadow-lg dark:bg-[#010215]">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-green-500">
            Contact Information
          </h2>
          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FaPhone className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-medium text-gray-900 dark:text-white">Phone</p>
                <p className="text-gray-600">+1 (123) 456-7890</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FaEnvelope className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-medium text-gray-900 dark:text-white">Email</p>
                <p className="text-gray-600">support@example.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FaMapMarkerAlt className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-medium text-gray-900 dark:text-white">Address</p>
                <p className="text-gray-600">
                  123 Main Street, Suite 100
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;