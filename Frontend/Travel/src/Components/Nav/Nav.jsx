import React, { useState} from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { IoMdArrowRoundBack } from "react-icons/io";

// import { useEffect, useState } from "react";
const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user ? user._id : null;
  const userName = user ? user.name : null;
  const navigate = useNavigate();
 

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 shadow-md py-1">
        <div className="container mx-auto flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden ml-2 text-gray-600 dark:text-green-500 focus:outline-none z-50"
            onClick={() => setDrawerVisible(true)}
          >
            <MenuOutlined className="text-xl" />
          </button>

          {/* Logo and Title */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Pak Travels" className="h-14 w-14" />
            <h2 className="text-lg font-bold text-green-700 dark:text-green-400">
              TripSync
            </h2>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 relative">
            {["Dashboard", "About", "Contact"].map((item, index) => {
              const path =
                item === "Dashboard" ? `/dashboard/${userID}` : `/${item.toLowerCase()}`;
              return (
                <NavLink
                  key={index}
                  to={path}
                  className={({ isActive }) =>
                    `relative text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-2 pb-1 transition-all ${isActive ? "text-green-600 dark:text-green-400 font-semibold" : ""
                    }`
                  }
                >
                  {item}
                  {/* Green bottom border when active */}
                  {window.location.pathname === path && (
                    <span className="absolute left-0 bottom-[-18px] w-full h-[1px] bg-green-600 dark:bg-green-400"></span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Dark Mode Toggle & Profile Icon */}
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <div className="flex gap-3 items-center">
              <NavLink to={`dashboard/profile/${userID}`}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <UserOutlined className="text-gray-600 dark:text-white w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800" />
                  <p className="font-bold dark:text-white">{userName}</p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>


        {/* Mobile Drawer with Sliding Effect */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg p-5 z-50 transform ${drawerVisible ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
        >
          <button
            className="text-gray-600 dark:text-gray-300 mb-4 focus:outline-none hover:text-red-500 transition"
            onClick={() => setDrawerVisible(false)}
          >
            <IoMdArrowRoundBack />
          </button>
          <nav className="flex flex-col space-y-4">
            {["Dashboard", "About", "Contact"].map((item, index) => {
              const path =
                item === "Dashboard" ? `/dashboard/${userID}` : `/${item.toLowerCase()}`;
              return (
                <NavLink
                  key={index}
                  to={path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-all ${isActive
                      ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-200 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                    }`
                  }
                  onClick={() => setDrawerVisible(false)}
                >
                  {item}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Backdrop Overlay */}
        {drawerVisible && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDrawerVisible(false)}
          ></div>
        )}
      </nav>

      {/* Padding to prevent content overlap */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;



// import React, { useState, useEffect } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { Drawer, Avatar, Button, Divider } from "antd";
// import { Menu, User, X } from "lucide-react";

// const Navbar = () => {
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const userID = user?._id || null;
//   const userName = user?.name || null;
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
  
//   const getUserInitials = () => {
//     if (!userName) return "U";
//     return userName.split(" ")
//       .map(name => name.charAt(0))
//       .join("")
//       .toUpperCase()
//       .substring(0, 2);
//   };
  
//   const menuItems = [
//     { label: "Dashboard", path: userID ? `/dashboard/${userID}` : "/dashboard" },
//     { label: "About", path: "/about" },
//     { label: "Contact", path: "/contact" }
//   ];
  
//   const isRouteActive = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <>
//       <nav 
//         className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//           scrolled 
//             ? "bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 shadow-lg py-1" 
//             : "bg-white dark:bg-gray-900 shadow-md py-2"
//         }`}
//       >
//         <div className="container mx-auto flex justify-between items-center px-4">
//           <Link to="/" className="flex items-center gap-2 group">
//             <div className="relative overflow-hidden rounded-full">
//               <img 
//                 src="/logo.png" 
//                 alt="TripSync" 
//                 className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110" 
//               />
//             </div>
//             <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-300">
//               TripSync
//             </h2>
//           </Link>

//           <div className="hidden lg:flex items-center space-x-1">
//             {menuItems.map((item) => (
//               <NavLink
//                 key={item.label}
//                 to={item.path}
//                 className={({ isActive }) => `
//                   relative px-4 py-2 rounded-md font-medium transition-all duration-200
//                   hover:text-green-600 dark:hover:text-green-400
//                   ${isActive 
//                     ? "text-green-600 dark:text-green-400" 
//                     : "text-gray-700 dark:text-gray-200"}
//                 `}
//               >
//                 {item.label}
//                 {isRouteActive(item.path) && (
//                   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 dark:from-green-400 dark:to-emerald-300 transform origin-left transition-transform duration-300"></span>
//                 )}
//               </NavLink>
//             ))}
//           </div>

//           <div className="flex items-center gap-3">
//             <NavLink 
//               to={userID ? `/dashboard/profile/${userID}` : "/login"} 
//               className="group flex items-center gap-2 p-1 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
//             >
//               <Avatar 
//                 className="border-2 border-transparent group-hover:border-green-500 transition-all"
//                 src={user?.profilePic}
//                 style={{ backgroundColor: !user?.profilePic ? '#10b981' : 'transparent' }}
//               >
//                 {getUserInitials()}
//               </Avatar>
              
//               <span className="hidden md:block font-medium text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
//                 {userName || "Sign In"}
//               </span>
//             </NavLink>
            
//             <Button
//               type="text" 
//               className="lg:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
//               onClick={() => setDrawerVisible(true)}
//               icon={<Menu className="h-5 w-5" />}
//             />
//           </div>
//         </div>
//       </nav>

//       <Drawer 
//         open={drawerVisible}
//         onClose={() => setDrawerVisible(false)}
//         placement="left"
//         width={280}
//         closeIcon={<X className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />}
//         styles={{
//           header: { 
//             padding: '16px',
//             borderBottom: '1px solid #e5e7eb',
//           },
//           body: { 
//             padding: '16px 0',
//           },
//           mask: {
//             backgroundColor: 'rgba(0, 0, 0, 0.4)',
//             backdropFilter: 'blur(4px)'
//           },
//           content: {
//             boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
//           }
//         }}
//         title={
//           <Link to="/" className="flex items-center gap-2" onClick={() => setDrawerVisible(false)}>
//             <img src="/logo.png" alt="TripSync" className="h-10 w-10" />
//             <h2 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-300">
//               TripSync
//             </h2>
//           </Link>
//         }
//       >
//         <div className="space-y-1 px-4">
//           {menuItems.map((item) => (
//             <NavLink
//               key={item.label}
//               to={item.path}
//               className={({ isActive }) => `
//                 flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all
//                 ${isActive 
//                   ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" 
//                   : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}
//               `}
//               onClick={() => setDrawerVisible(false)}
//             >
//               <span>{item.label}</span>
//               {isRouteActive(item.path) && (
//                 <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                 </svg>
//               )}
//             </NavLink>
//           ))}
//         </div>
        
//         {userID && (
//           <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 px-4">
//             <NavLink
//               to={`/dashboard/profile/${userID}`}
//               className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//               onClick={() => setDrawerVisible(false)}
//             >
//               <Avatar 
//                 className="border-2 border-green-100 dark:border-green-900"
//                 src={user?.profilePic}
//                 style={{ backgroundColor: !user?.profilePic ? '#10b981' : 'transparent' }}
//               >
//                 {getUserInitials()}
//               </Avatar>
//               <div className="flex flex-col">
//                 <span className="font-medium text-gray-900 dark:text-gray-100">{userName}</span>
//                 <span className="text-sm text-gray-500 dark:text-gray-400">View Profile</span>
//               </div>
//             </NavLink>
//           </div>
//         )}
//       </Drawer>

//       <div className="pt-16"></div>
//     </>
//   );
// };

// export default Navbar;
