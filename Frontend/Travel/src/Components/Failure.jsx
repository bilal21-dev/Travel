import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

const Failure = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 px-4 text-center">
      <XCircle className="text-red-600" size={80} />
      <h1 className="text-4xl font-bold text-red-700 mt-4">Payment Failed! ❌</h1>
      <p className="text-lg text-gray-700 mt-2">Something went wrong. Please try again.</p>
      
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-red-600 text-white text-lg rounded-lg shadow-md transition-all duration-300 hover:bg-red-700 hover:scale-105"
      >
        Try Again
      </Link>
    </div>
  );
};

export default Failure;
