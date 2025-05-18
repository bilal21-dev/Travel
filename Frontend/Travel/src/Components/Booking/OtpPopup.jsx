
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';



const OtpPopup = ({ email, people, setShowOtpPopup, trip = [] }) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const params = useParams();



    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user ? user._id : null;


    const verifyOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/verify-otp", { email, otp });
            Swal.fire({
                icon: "success",
                title: "OTP Verified!",
                text: response.data.message,
                confirmButtonColor: "#4CAF50",
            });
            setShowOtpPopup(false);
            let result = await axios.put(`http://localhost:5000/update/people/${params.id}`, { people });
            result = await axios.put(`http://localhost:5000/dashboard/bookingcount`, { id: userID });
            result = await axios.put(`http://localhost:5000/dashboard/expensecount`, { id: userID, amount: trip.price * people });
            console.log("ja rha hu");
            result = await axios.post(`http://localhost:5000/booking/trip`, { id: userID, tripID: trip.id })


            const stripe = await loadStripe("pk_test_51Qw6DeJCipB5xevDn0YUP72nVRIlctY4Xjok17ygbz0gEFZhjvy2CuVxizPz94m18SaUPfNyGSVSirdud2ZmcNII00CjMPbmDF")
            const body = {
                trips: [trip]
            }
            const headers = {
                "Content-Type": "application/json"
            }
            const outcome = await fetch("http://localhost:5000/create-checkout-session", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })
            const session = await outcome.json();
            const outcome2 = stripe.redirectToCheckout({
                sessionId: session.id
            })


            // navigate(`/dashboard/${userID}`);
        } catch (error) {
            setError(error.response?.data?.error || "OTP verification failed");
            Swal.fire({
                icon: "error",
                title: "Invalid OTP",
                text: "Please try again.",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-full text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Enter OTP</h2>
                <p className="text-gray-500 mb-3">A verification code has been sent to your email.</p>

                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-3 rounded-lg w-full text-center text-lg tracking-widest outline-none"
                    placeholder="Enter OTP"
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}

                <div className="flex justify-between mt-5">
                    <button
                        onClick={() => setShowOtpPopup(false)}
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all w-1/2 mx-1"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={verifyOtp}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all w-1/2 mx-1"
                    >
                        Verify OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpPopup;
