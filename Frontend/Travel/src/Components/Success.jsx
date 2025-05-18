import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Success = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user ? user._id : null;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 px-4 text-center">
      <CheckCircle className="text-green-600" size={80} />
      <h1 className="text-4xl font-bold text-green-700 mt-4">Payment Successful! 🎉</h1>
      <p className="text-lg text-gray-700 mt-2">Thank you for your purchase. Your trip has been booked successfully.</p>

      <Link
        to={`/dashboard/${userID}`}
        className="mt-6 px-6 py-3 bg-green-600 text-white text-lg rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 hover:scale-105"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Success;
