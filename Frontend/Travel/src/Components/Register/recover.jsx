import { useState } from 'react';
import { Mail, Lock, ArrowRight, Check } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Swal from "sweetalert2";


const Recover = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically make an API call to send OTP
    try {
      await axios.post("http://localhost:5000/send-otp", { email });
      toast.success("OTP sent to your email")
    } catch (error) {
      alert("Failed to send OTP");
    }
    setStep(2);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically verify OTP
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", { email, otp });
      Swal.fire({
        icon: "success",
        title: "OTP Verified!",
        // text: response.data.message,
        confirmButtonColor: "#4CAF50",
      });
      setStep(3);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: "Please try again.",
        confirmButtonColor: "#d33",
      });
    }

  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    console.log("agya andr");
    try {
      console.log("chaaa");

      if (newPassword === confirmPassword) {
        console.log("chaaa");

        const response = await axios.put(`http://localhost:5000/password/update`, {
          email: email,
          newPassword: newPassword,
        });
        console.log("hogya update");
        if (response.data.success) {
          toast.success("Password Updated successfully")
          setStep(4);
        }
      }
      else {
        toast.error("Password Does not match")
      }

    } catch (error) {
      // Handle specific backend error messages
      const errorMessage = error.response?.data?.error ||
        "Password update failed. Check current password and try again.";
      alert(errorMessage);
    }

  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Account Recovery
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10">

          {/* Step 1: Email Input */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your email"
                    />
                    <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Send OTP
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Enter OTP
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    OTP has been sent to {email}
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Verify OTP
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-6">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">
                    email
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    // placeholder="Enter new password"
                    />
                    <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter new password"
                    />
                    <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Confirm new password"
                    />
                    <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Reset Password
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center">
              <div className="rounded-full bg-green-100 p-3 mx-auto w-fit">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Password Reset Successful</h3>
              <p className="mt-2 text-sm text-gray-500">
                Your password has been successfully reset. You can now login with your new password.
              </p>
              <button
                onClick={() => window.location.href = '/register'}
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recover;