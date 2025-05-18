import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Layout from "./Layout.jsx";
import ProtectedRoute from "./ProtectedRoute";
import store from "./Redux/store";
import { Provider } from "react-redux";


import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Intro from './Components/FrontPage/Intro.jsx';
import Home from './Components/Dashboard/Home.jsx';
import Trip from './Components/Dashboard/Trip.jsx';
import SearchTrips from './Components/Dashboard/SearchTrips.jsx';
import Register from './Components/Register/registration.jsx';
import Explore from './Components/Explore/explore.jsx';
import Booking from './Components/Booking/Booking.jsx';
import About from './Components/About/about.jsx';
import Contact from './Components/Contact/contact.jsx';
import Profile from './Components/Profile/profile.jsx';
import Recover from './Components/Register/recover.jsx';
import Success from "./Components/Success";
import Failure from "./Components/Failure";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route index element={<Intro />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<Recover />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard/:id" element={<Home />} />
        <Route path="dashboard/trips/:id" element={<Trip />} />
        <Route path="dashboard/search/:id" element={<SearchTrips />} />
        <Route path="dashboard/explore/:id" element={<Explore />} />
        <Route path="dashboard/booking/:id" element={<Booking />} />
        <Route path="dashboard/profile/:id" element={<Profile />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
      </Route>
    </Route>
  )
);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
