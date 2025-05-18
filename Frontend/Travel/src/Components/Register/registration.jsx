
import React, { useState } from "react";
import * as Components from './registrationstyle';
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [signIn, toggle] = React.useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [logInMail, setlogInMail] = useState("");
    const [logInPassword, setlogInPassword] = useState("");
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user ? user._id : null
    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPass) {
            toast.error("Your password is mismatched");
            return;
        }

        try {

            const response = await axios.post('http://localhost:5000/auth/signup', {
                name, email, password
            });


            const { user, token } = response.data;

            if (user && user._id) {
                await axios.post(`http://localhost:5000/dashboard/create`, { author: user._id });
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                toast.success("Registration Successful!");
                setTimeout(() => {
                    navigate(`/dashboard/${user._id}`);
                }, 1000);
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        if (error.response.data.result === "User already exists") {
                            toast.error("Email already registered");
                        } else {
                            toast.error("Please fill all required fields");
                        }
                        break;
                    case 500:
                        toast.error("Server error. Please try again later.");
                        break;
                    default:
                        toast.error("Registration failed. Please try again.");
                }
            } else {
                toast.error("Network error. Please check your connection.");
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                logInMail,
                logInPassword
            });

            const { user, token } = response.data;
            if (user && user._id) {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem("token", token);
                toast.success("Login Successful!");
                setTimeout(() => {
                    navigate(`/dashboard/${user._id}`);
                }, 1000);
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        toast.error("Please enter both email and password");
                        break;
                    case 401:
                        toast.error("Invalid email or password");
                        break;
                    case 404:
                        toast.error("User not found");
                        break;
                    default:
                        toast.error("Login failed. Please try again.");
                }
            } else {
                toast.error("Network error. Please check your connection.");
            }
        }
    };

    return (
        <div>
            <Link to="/" className="flex items-center gap-2 absolute top-2 left-2 z-50">
                <img src="/logo.png" alt="Pak Travels" className="h-15 w-15" />
                <h2 className="text-lg font-bold text-green-700">TripSync</h2>
            </Link>
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
                style={{ zIndex: 9999 }} // Ensure it's on top
            />
            <Components.Container className="relative">
                <Components.SignUpContainer $signIn={signIn}>
                    <Components.Form onSubmit={handleSignup}>
                        <Components.Title className="text-2xl text-green-600">Create Account</Components.Title>
                        <Components.Input type='text' placeholder='Name' className="rounded-3xl" onChange={(e) => setName(e.target.value)} />
                        <Components.Input type='email' placeholder='Email' className="rounded-3xl" onChange={(e) => setEmail(e.target.value)} />
                        <Components.Input type='password' placeholder='Password' className="rounded-3xl" onChange={(e) => setPassword(e.target.value)} />
                        <Components.Input type='password' placeholder=' Confirm Password' className="rounded-3xl" onChange={(e) => setConfirmPass(e.target.value)} />
                        <Components.Button>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer $signIn={signIn}>
                    <Components.Form onSubmit={handleLogin}>
                        <Components.Title className="text-2xl text-green-600">Log in</Components.Title>
                        <Components.Input type='email' placeholder='Email' className="rounded-3xl" onChange={(e) => setlogInMail(e.target.value)} />
                        <Components.Input type='password' placeholder='Password' className="rounded-3xl" onChange={(e) => setlogInPassword(e.target.value)} />
                        {/* <Components.Anchor as={NavLink} to="/register/recover">
                            Forgot your password?
                        </Components.Anchor> */}
                        <Link to="/recover" className="mb-2 text-gray-500 text-md">Forgot Your Password?</Link>
                        <Components.Button>Log In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer $signIn={signIn}>
                    <Components.Overlay $signIn={signIn}>
                        <Components.LeftOverlayPanel $signIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Log In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel $signIn={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>
                                Enter Your personal details and start journey with us
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>

                    </Components.Overlay>
                </Components.OverlayContainer>

            </Components.Container>
        </div>
    );
}

export default Register;
