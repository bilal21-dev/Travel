// // import React from "react";
// // import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
// // import { MdLogout } from "react-icons/md";
// // import { Layout, Menu } from "antd";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import "react-toastify/dist/ReactToastify.css";
// // import { ToastContainer, toast } from "react-toastify";
// // import DarkModeToggle from "../DarkModeToggle";
// // import { FaSearch } from "react-icons/fa";
// // import { BiWorld } from "react-icons/bi";

// // const { Sider } = Layout;

// // const Sidebar = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   let user = JSON.parse(localStorage.getItem("user"));
// //   user = user._id;

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     toast.success("Logout Successful!");
// //     setTimeout(() => {
// //       navigate("/");
// //     }, 1000);
// //   };

// //   const items = [
// //     {
// //       key: `/dashboard/${user}`,
// //       icon: <UserOutlined />,
// //       label: "Home",
// //     },
// //     {
// //       key: `/dashboard/trips/${user}`,
// //       icon: <LaptopOutlined />,
// //       label: "Trips",
// //     },
// //     {
// //       key: `/dashboard/search/${user}`,
// //       icon: <FaSearch />,
// //       label: "Search Trips",
// //     },
// //     {
// //       key: `/dashboard/explore/${user}`,
// //       icon: <BiWorld />,
// //       label: <span>Explore</span>,
// //     },
// //     {
// //       key: "logout",
// //       icon: <MdLogout className="!text-red-600" />,
// //       label: <span className="logout-text">Logout</span>,
// //       onClick: handleLogout,
// //       className: "logout-menu-item",
// //     },

// //   ];

// //   return (
// //     <Sider
// //       width={250}
// //       // style={{
// //       //   height: "100vh",
// //       //   background: "#e6f7e6",
// //       //   boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
// //       //   marginTop:"0px",
// //       // }}
// //       style={{
// //         height: "100%", // Use 100% instead of 100vh to respect parent height
// //         background: "#e6f7e6",
// //         boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
// //         position: "fixed", // Keep fixed for consistency across screen sizes
// //         top: 66, // Align with the top of its container
// //         left: 0, // Align with the left
// //         overflow: "auto", // Allow internal scrolling if needed
// //       }}
// //     >
// //       <Menu
// //         mode="inline"
// //         selectedKeys={[location.pathname]}
// //         className="h-full border-r-0 !bg-[#e6f7e6] dark:!bg-[#010215] dark:text-white transition duration-300"
// //         theme="light"
// //         onClick={(item) => {
// //           if (item.key !== "logout") {
// //             navigate(item.key);
// //           }
// //         }}
// //         items={items}
// //       />

// //       {/* Dark Mode Toggle placed at the bottom */}
// //       <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
// //         <DarkModeToggle />
// //       </div>

// //       <style>
// //         {`
// //         /* Light mode selected item */
// //         .ant-layout-sider .ant-menu-item-selected {
// //           background: #28a745 !important;
// //           color: white !important;
// //           font-weight: bold !important;
// //         }

// //         /* Dark mode selected item */
// //         .dark .ant-layout-sider .ant-menu-item-selected {
// //           background: #28a745 !important;
// //           color: black !important;
// //           font-weight: bold !important;
// //         }

// //         /* Dark mode non-selected items */
// //         .dark .ant-layout-sider .ant-menu-item {
// //           color: white !important;
// //         }

// //         /* Logout item stays red in both modes */
// //         .logout-text {
// //           color: red !important;
// //         }

// //         .dark .logout-text {
// //           color: red !important;
// //         }
// //         `}
// //       </style>
// //     </Sider>
// //   );
// // };

// // export default Sidebar;




// import React, { useEffect, useState } from "react";
// import { Layout, Menu, Avatar, Typography, Tooltip } from "antd";
// import { UserOutlined, LaptopOutlined, LogoutOutlined } from "@ant-design/icons";
// import { MdLogout } from "react-icons/md";
// import { FaSearch } from "react-icons/fa";
// import { BiWorld } from "react-icons/bi";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import DarkModeToggle from "./DarkModeToggle";

// const { Sider } = Layout;
// const { Title, Text } = Typography;

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);
//   const userObj = JSON.parse(localStorage.getItem("user") || "{}");
//   const user = userObj._id;
//   const userName = userObj.name || "User";

//   // Detect screen size and collapse sidebar on small screens
//   useEffect(() => {
//     const handleResize = () => {
//       setCollapsed(window.innerWidth < 768);
//     };
    
//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     toast.success("Logout Successful!");
//     setTimeout(() => {
//       navigate("/");
//     }, 1000);
//   };

//   const items = [
//     {
//       key: `/dashboard/${user}`,
//       icon: <UserOutlined style={{ fontSize: '18px' }} />,
//       label: "Home",
//     },
//     {
//       key: `/dashboard/trips/${user}`,
//       icon: <LaptopOutlined style={{ fontSize: '18px' }} />,
//       label: "Trips",
//     },
//     {
//       key: `/dashboard/search/${user}`,
//       icon: <FaSearch style={{ fontSize: '16px' }} />,
//       label: "Search",
//     },
//     {
//       key: `/dashboard/explore/${user}`,
//       icon: <BiWorld style={{ fontSize: '18px' }} />,
//       label: "Explore",
//     },
//   ];

//   return (
//     <Sider
//       collapsible
//       collapsed={collapsed}
//       onCollapse={(value) => setCollapsed(value)}
//       width={250}
//       style={{
//         height: "100%",
//         position: "fixed",
//         top: 66,
//         left: 0,
//         overflow: "auto",
//         boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
//         transition: "all 0.3s ease",
//         zIndex: 10,
//       }}
//       className="sidebar-custom dark:bg-gray-900 bg-white"
//     >
//       {/* User Profile Section */}
//       <div className="user-profile p-4 flex flex-col items-center justify-center border-b border-gray-200 dark:border-gray-700">
//         <Avatar 
//           size={collapsed ? 40 : 64} 
//           icon={<UserOutlined />} 
//           className="bg-green-500 mb-2 shadow-md"
//         />
//         {!collapsed && (
//           <div className="text-center mt-2">
//             <Title level={5} className="m-0 text-gray-800 dark:text-white">
//               {userName}
//             </Title>
//             <Text type="secondary" className="dark:text-gray-400">
//               Explorer
//             </Text>
//           </div>
//         )}
//       </div>

//       {/* Navigation Menu */}
//       <Menu
//         mode="inline"
//         selectedKeys={[location.pathname]}
//         className="border-r-0 transition-colors duration-300 custom-menu"
//         theme="light"
//         onClick={(item) => {
//           if (item.key !== "logout") {
//             navigate(item.key);
//           }
//         }}
//         items={items}
//       />

//       {/* Logout Button */}
//       <div className="logout-container px-4 mt-6 mb-4">
//         <Tooltip title="Logout" placement={collapsed ? "right" : "top"}>
//           <button 
//             onClick={handleLogout}
//             className="logout-button flex items-center gap-2 w-full py-2 px-3 rounded-lg transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-900/30"
//           >
//             <LogoutOutlined className="text-red-500 text-lg" />
//             {!collapsed && <span className="text-red-500 font-medium">Logout</span>}
//           </button>
//         </Tooltip>
//       </div>

//       {/* Dark Mode Toggle */}
//       {/* <div className={`dark-mode-container ${collapsed ? 'px-2' : 'px-4'} mt-auto mb-6 flex justify-center`}>
//         <DarkModeToggle />
//       </div> */}

//       <style>
//         {`
//         /* Custom styles for the sidebar */
//         .sidebar-custom {
//           transition: all 0.3s ease;
//         }

//         /* Light mode styles */
//         .sidebar-custom {
//           background: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.97));
//         }

//         /* Dark mode styles */
//         .dark .sidebar-custom {
//           background: linear-gradient(to bottom, rgba(17,24,39,0.95), rgba(17,24,39,0.98));
//         }

//         /* Light mode menu styles */
//         .custom-menu.ant-menu {
//           background: transparent !important;
//         }

//         .custom-menu.ant-menu-light .ant-menu-item-selected {
//           background: linear-gradient(to right, #10B981, #059669) !important;
//           color: white !important;
//           font-weight: 500 !important;
//           border-radius: 6px !important;
//           margin: 4px 8px !important;
//           width: calc(100% - 16px) !important;
//         }

//         .custom-menu.ant-menu-light .ant-menu-item:hover:not(.ant-menu-item-selected) {
//           color: #059669 !important;
//           background: rgba(16, 185, 129, 0.1) !important;
//           border-radius: 6px !important;
//           margin: 4px 8px !important;
//           width: calc(100% - 16px) !important;
//         }

//         .custom-menu.ant-menu-light .ant-menu-item {
//           border-radius: 6px !important;
//           margin: 4px 8px !important;
//           width: calc(100% - 16px) !important;
//           transition: all 0.3s ease;
//         }

//         /* Dark mode menu styles */
//         .dark .custom-menu.ant-menu {
//           background: transparent !important;
//           color: rgba(255, 255, 255, 0.85) !important;
//         }

//         .dark .custom-menu.ant-menu-light .ant-menu-item-selected {
//           background: linear-gradient(to right, #10B981, #059669) !important;
//           color: white !important;
//           font-weight: 500 !important;
//           border-radius: 6px !important;
//         }

//         .dark .custom-menu.ant-menu-light .ant-menu-item:hover:not(.ant-menu-item-selected) {
//           color: #10B981 !important;
//           background: rgba(16, 185, 129, 0.2) !important;
//           border-radius: 6px !important;
//         }

//         .dark .custom-menu.ant-menu-light .ant-menu-item {
//           color: rgba(255, 255, 255, 0.85) !important;
//         }

//         /* Logout button styles */
//         .logout-button {
//           border: 1px solid rgba(239, 68, 68, 0.2);
//         }

//         .dark .logout-button {
//           border: 1px solid rgba(239, 68, 68, 0.3);
//         }

//         /* Logo and sidebar theme */
//         .ant-layout-sider-trigger {
//           background: #10B981 !important;
//         }

//         .dark .ant-layout-sider-trigger {
//           background: #059669 !important;
//         }
//         `}
//       </style>
//     </Sider>
//   );
// };

// export default Sidebar;


import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Typography, Tooltip } from "antd";
import { UserOutlined, LaptopOutlined, LogoutOutlined } from "@ant-design/icons";
import { FaSearch } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Sider } = Layout;
const { Title, Text } = Typography;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const userObj = JSON.parse(localStorage.getItem("user") || "{}");
  const user = userObj._id;
  const userName = userObj.name || "User";

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successful!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const items = [
    {
      key: `/dashboard/${user}`,
      icon: <UserOutlined style={{ fontSize: "18px" }} />,
      label: "Home",
    },
    {
      key: `/dashboard/trips/${user}`,
      icon: <LaptopOutlined style={{ fontSize: "18px" }} />,
      label: "Trips",
    },
    {
      key: `/dashboard/search/${user}`,
      icon: <FaSearch style={{ fontSize: "16px" }} />,
      label: "Search",
    },
    {
      key: `/dashboard/explore/${user}`,
      icon: <BiWorld style={{ fontSize: "18px" }} />,
      label: "Explore",
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
      style={{
        height: "100%",
        position: "fixed",
        top: 66,
        left: 0,
        overflow: "auto",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        zIndex: 10,
      }}
      className="sidebar-custom dark:bg-gray-900 bg-white"
    >
      {/* User Profile Section */}
      <div className="user-profile p-4 flex flex-col items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <Avatar size={collapsed ? 40 : 64} icon={<UserOutlined />} className="bg-green-500 mb-2 shadow-md" />
        {!collapsed && (
          <div className="text-center mt-2">
            <Title level={5} className="m-0 user-name">
              {userName}
            </Title>
            <Text type="secondary" className="dark:text-white">Explorer</Text>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        className="border-r-0 transition-colors duration-300 custom-menu"
        theme="light"
        onClick={(item) => {
          if (item.key !== "logout") {
            navigate(item.key);
          }
        }}
        items={items}
      />

      {/* Logout Button */}
      <div className="logout-container px-4 mt-6 mb-4">
        <Tooltip title="Logout" placement={collapsed ? "right" : "top"}>
          <button
            onClick={handleLogout}
            className="logout-button flex items-center gap-2 w-full py-2 px-3 rounded-lg transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-900/30"
          >
            <LogoutOutlined className="logout-icon text-lg" />
            {!collapsed && <span className="text-red-500 dark:text-red-500 font-medium">Logout</span>}
          </button>
        </Tooltip>
      </div>

      <style>
        {`
        /* Sidebar background gradient */
        .sidebar-custom {
          transition: all 0.3s ease;
          background: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.97));
        }

        .dark .sidebar-custom {
          background: linear-gradient(to bottom, rgba(17,24,39,0.95), rgba(17,24,39,0.98));
          transition: none !important;
        }

        /* Username text */
        .user-name {
          color: #1f2937;
        }

        .dark .user-name {
          color: #ffffff !important;
        }

        /* Menu item styling */
        .custom-menu.ant-menu {
          background: transparent !important;
        }

        .custom-menu.ant-menu-light .ant-menu-item-selected {
          background: linear-gradient(to right, #10B981, #059669) !important;
          color: white !important;
          font-weight: 500 !important;
          border-radius: 6px !important;
          margin: 4px 8px !important;
          width: calc(100% - 16px) !important;
        }

        .custom-menu.ant-menu-light .ant-menu-item:hover:not(.ant-menu-item-selected) {
          color: #059669 !important;
          background: rgba(16, 185, 129, 0.1) !important;
          border-radius: 6px !important;
          margin: 4px 8px !important;
          width: calc(100% - 16px) !important;
        }

        .custom-menu.ant-menu-light .ant-menu-item {
          border-radius: 6px !important;
          margin: 4px 8px !important;
          width: calc(100% - 16px) !important;
          transition: all 0.3s ease;
        }

        .dark .custom-menu.ant-menu {
          background: transparent !important;
          color: rgba(255, 255, 255, 0.85) !important;
        }

        .dark .custom-menu.ant-menu-light .ant-menu-item-selected {
          background: linear-gradient(to right, #10B981, #059669) !important;
          color: white !important;
          font-weight: 500 !important;
          border-radius: 6px !important;
        }

        .dark .custom-menu.ant-menu-light .ant-menu-item:hover:not(.ant-menu-item-selected) {
          color: #10B981 !important;
          background: rgba(16, 185, 129, 0.2) !important;
          border-radius: 6px !important;
        }

        .dark .custom-menu.ant-menu-light .ant-menu-item {
          color: rgba(255, 255, 255, 0.85) !important;
        }

        /* Logout styling */
        .logout-button {
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .dark .logout-button {
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .logout-icon {
          color: #ef4444;
        }

        .dark .logout-icon {
          color: white !important;
        }

        .ant-layout-sider-trigger {
          background: #10B981 !important;
        }

        .dark .ant-layout-sider-trigger {
          background: #059669 !important;
        }
        `}
      </style>
    </Sider>
  );
};

export default Sidebar;
