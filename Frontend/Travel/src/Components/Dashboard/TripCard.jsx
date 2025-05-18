import { SlCalender } from "react-icons/sl";
import { IoPeopleOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const TripCard = ({ trips = [], fetchMyTrips }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user ? user._id : null;

  const deleteTrip = async (trip) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this trip!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:5000/delete/${trip.id}`);
          await axios.put("http://localhost:5000/dashboard/tourcount", {
            id: userID,
            action: "decrease",
          });
          toast.success(res.data.message);
          fetchMyTrips();
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.error || "Failed to delete trip", "error");
        }
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {trips.length > 0 ? (
        trips.map((trip, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-64 sm:w-72 relative dark:bg-[#010215]"
          >
            <div className="w-full h-40 sm:h-48 relative">
              <img
                src={trip.image ? `http://localhost:5000/${trip.image}` : "https://via.placeholder.com/150"}
                alt={trip.title || "Trip"}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded-full">
                👥 {trip.num_people || 0} People
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 dark:text-white">
                {trip.title || "Unknown Trip"}
              </h3>

              <div className="flex flex-col gap-2">
                <div className="flex gap-3 items-center align-middle">
                  <SlCalender className="text-sm text-yellow-400" />
                  <span className="text-sm text-gray-500">
                    {new Date(trip.start_date).toLocaleDateString()} -{" "}
                    {new Date(trip.end_date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-3 items-center align-middle">
                  <IoPeopleOutline className="text-sm text-pink-400" />
                  <span className="text-sm text-gray-500">{trip.num_people - trip.registration}</span>
                </div>

                <div className="flex gap-3 items-center align-middle">
                  <FaLocationDot className="text-sm text-blue-400" />
                  <span className="text-sm text-gray-500">{trip.destination}</span>
                </div>
              </div>

              <p className="text-green-600 font-bold text-xl mt-3">
                Rs. {trip.price ? trip.price.toFixed(2) : "0.00"}
                <span className="text-xs text-gray-400 font-medium">/per person</span>
              </p>

              {/* Delete button with SweetAlert2 */}
              <MdDelete
                className="absolute right-2 bottom-2 text-xl text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => deleteTrip(trip)}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No trips available.</p>
      )}
    </div>
  );
};

export default TripCard;
