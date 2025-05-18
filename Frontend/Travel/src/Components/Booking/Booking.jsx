// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { SlCalender } from "react-icons/sl";
// import { IoPeopleOutline } from "react-icons/io5";
// import { FaLocationDot } from "react-icons/fa6";
// import { RxCross2 } from "react-icons/rx";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"
// import OtpPopup from "./OtpPopup";

// const Booking = () => {
//     const [trip, setTrip] = useState(null);
//     const [people, setPeople] = useState(1);
//     const [email, setEmail] = useState("");
//     const [otp, setOtp] = useState("");
//     const [showOtpPopup, setShowOtpPopup] = useState(false);
//     const params = useParams();


//     useEffect(() => {
//         const fetchTripDetails = async () => {

//             try {
//                 const response = await axios.get(
//                     `http://localhost:5000/trips/booking/${params.id}`
//                 );
//                 setTrip(response.data.myTrip);
//             } catch (err) {
//                 console.error(err);
//                 alert("Failed to fetch trip details. Please try again.");
//             }
//         };

//         fetchTripDetails();
//     }, [params.id]);

//     const handleSendOtp = async () => {
//         try {
//             await axios.post("http://localhost:5000/send-otp", { email });
//             setShowOtpPopup(true);
//             toast.success("OTP sent to your email")
//         } catch (error) {
//             alert("Failed to send OTP");
//         }
//     };

//     if (!trip) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="flex flex-col lg:flex-row p-6 gap-6 dark:bg-[#090a25]">
//             <ToastContainer />
//             {/* Left Side: Trip Card */}
//             <div className="lg:w-1/2 ">
//                 <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-[#010215]">
//                     <img
//                         src={trip.image ? `http://localhost:5000/${trip.image}` : "https://via.placeholder.com/400"}
//                         alt={trip.title}
//                         className="w-full h-64 object-cover object-bottom"
//                     />
//                     <div className="p-6">
//                         <h2 className="text-2xl font-bold mb-2 dark:text-white">{trip.title}</h2>
//                         <p className="text-gray-700 mb-4 flex items-center align-middle gap-2 dark:text-white"><FaLocationDot className="text-green-400" />{trip.destination}</p>
//                         <p className="text-gray-700 mb-4 flex align-middle items-center gap-2 dark:text-white"> <SlCalender className="text-yellow-400 " />{new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}</p>
//                         <div className="flex justify-between items-center">
//                             <p className="text-lg font-semibold dark:text-white">${trip.price.toFixed(2)}</p>
//                             <div className="flex flex-col">
//                                 <p className="text-sm text-gray-600 dark:text-white">👥 {trip.num_people} people</p>
//                                 <p className="text-sm text-gray-600 dark:text-white">( {trip.num_people - trip.registration} slots left)</p>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Right Side: Registration Form (UI Only) */}
//             <div className="lg:w-1/2">
//                 <form className="bg-white rounded-lg shadow-lg p-6 dark:bg-[#010215]">
//                     <h2 className="text-2xl font-bold mb-6 text-green-500">Trip Registration</h2>

//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2 dark:text-white">Name</label>
//                         <input type="text" className="w-full p-2 border border-gray-300 rounded-lg dark:text-white" />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2 dark:text-white">Email</label>
//                         <input type="email" className="w-full p-2 border border-gray-300 rounded-lg dark:text-white" onChange={(e) => setEmail(e.target.value)} />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2 dark:text-white ">Phone</label>
//                         <input type="tel" className="w-full p-2 border border-gray-300 rounded-lg dark:text-white" />
//                     </div>
//                     {/* <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2 dark:text-white ">Account Number</label>
//                         <input type="tel" className="w-full p-2 border border-gray-300 rounded-lg dark:text-white" max={trip.numPeople} />
//                     </div> */}

//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2 dark:text-white">Number of People</label>
//                         <input type="number" min="1" max={trip.numPeople - trip.registration} className="w-full p-2 border border-gray-300 rounded-lg dark:text-white" onChange={(e) => setPeople(e.target.value)} />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <div className="flex justify-between">
//                             <p className="font-bold dark:text-white">Trip Cost</p>
//                             <p className="dark:text-white">Rs.{trip.price}</p>
//                         </div>
//                         <div className="flex justify-between">
//                             <p className="font-bold dark:text-white">Number of People</p>
//                             <p className="flex align-middle items-center dark:text-white"><RxCross2 className="dark:text:white" />{people}</p>
//                         </div>
//                         <div className="flex align-middle justify-between">
//                             <p className="font-bold dark:text-white">Total Amount</p>
//                             <p className="dark:text-white">Rs.{trip.price * people}</p>
//                         </div>
//                     </div>
//                     <button
//                         type="button"
//                         className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 mt-2"
//                         onClick={handleSendOtp}
//                     >
//                         Register
//                     </button>
//                 </form>
//                 {showOtpPopup && <OtpPopup setShowOtpPopup={setShowOtpPopup} email={email} people={people} trip={trip}/>}
//             </div>
//         </div>
//     );
// };

// export default Booking;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { 
  Card, Typography, Spin, Image, Divider, Form, 
  Input, InputNumber, Button, Space, Statistic, 
  Row, Col, Alert, Badge, Steps, Empty 
} from "antd";
import { 
  CalendarOutlined, UserOutlined, EnvironmentOutlined, 
  MailOutlined, PhoneOutlined, DollarOutlined,
  LoadingOutlined, CheckOutlined
} from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpPopup from "./OtpPopup";

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const Booking = () => {
  // State management
  const [trip, setTrip] = useState(null);
  const [people, setPeople] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form] = Form.useForm();
  const params = useParams();

  // Fetch trip details
  useEffect(() => {
    const fetchTripDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/trips/booking/${params.id}`
        );
        setTrip(response.data.myTrip);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch trip details. Please try again.");
        setIsLoading(false);
      }
    };

    fetchTripDetails();
  }, [params.id]);

  // Calculate trip details
  const getTripDuration = () => {
    if (!trip) return 0;
    const startDate = new Date(trip.start_date);
    const endDate = new Date(trip.end_date);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  const getAvailableSlots = () => {
    if (!trip) return 0;
    return trip.num_people - trip.registration;
  };

  const getTotalAmount = () => {
    if (!trip) return 0;
    return (trip.price * people).toFixed(2);
  };

  // Handle OTP sending
  const handleSendOtp = async () => {
    try {
      // Form validation
      await form.validateFields();
      
      await axios.post("http://localhost:5000/send-otp", { email });
      setShowOtpPopup(true);
      toast.success("OTP sent to your email");
    } catch (error) {
      if (error.errorFields) {
        error.errorFields.forEach(field => {
          toast.error(field.errors[0]);
        });
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: '#10b981' }} spin />} 
          tip={<span className="dark:text-white mt-4">Loading trip details...</span>}
        />
      </div>
    );
  }

  // Error state - trip not found
  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:from-gray-900 dark:to-gray-800 bg-gradient-to-br from-gray-50 to-gray-100">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span className="dark:text-white">Trip not found or has been removed</span>
          }
        >
          <Button type="primary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-10 px-4 md:px-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} 
                      newestOnTop closeOnClick rtl={false} pauseOnFocusLoss 
                      draggable pauseOnHover theme="colored" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Title level={1} className="text-gray-800 dark:text-white" 
                 style={{ marginBottom: '8px' }}>
            Book Your <span className="text-green-600">Adventure</span>
          </Title>
          <Paragraph className="text-gray-600 dark:text-white">
            Complete your booking to secure your spot
          </Paragraph>
        </div>
        
        <Row gutter={[24, 24]}>
          {/* Trip Details Card */}
          <Col xs={24} lg={12}>
            <Card 
              className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800"
              cover={
                <div className="relative">
                  <Image
                    alt={trip.title}
                    src={trip.image ? `http://localhost:5000/${trip.image}` : "https://via.placeholder.com/400"}
                    className="h-64 object-cover"
                    preview={false}
                  />
                  <Badge 
                    count={`$${trip.price.toFixed(2)} / person`}
                    style={{ 
                      backgroundColor: '#10b981', 
                      position: 'absolute', 
                      top: '16px', 
                      right: '16px' 
                    }}
                  />
                  {getAvailableSlots() <= 5 && (
                    <Badge 
                      count={`Only ${getAvailableSlots()} spots left!`}
                      style={{ 
                        backgroundColor: '#ef4444', 
                        position: 'absolute', 
                        bottom: '16px', 
                        left: '16px' 
                      }}
                    />
                  )}
                </div>
              }
              bordered={false}
            >
              <Title level={3} className="dark:text-white">{trip.title}</Title>
              
              <Space className="mt-4 mb-6" wrap>
                <Button icon={<EnvironmentOutlined />} type="text" className="dark:text-gray-200">
                  {trip.destination}
                </Button>
              </Space>
              
              <Row gutter={16} className="mb-4">
                <Col span={12}>
                  <Card size="small" className="text-center bg-blue-50 dark:bg-blue-900/30">
                    <Space direction="vertical" size={0}>
                      <CalendarOutlined className="text-blue-500 text-lg" />
                      <Text className="text-sm text-gray-700 dark:text-gray-200">Duration</Text>
                      <Text strong className="text-gray-800 dark:text-white">
                        {getTripDuration()} days
                      </Text>
                    </Space>
                  </Card>
                </Col>
                
                <Col span={12}>
                  <Card size="small" className="text-center bg-purple-50 dark:bg-purple-900/30">
                    <Space direction="vertical" size={0}>
                      <UserOutlined className="text-purple-500 text-lg" />
                      <Text className="text-sm text-gray-700 dark:text-gray-200">Group Size</Text>
                      <Text strong className="text-gray-800 dark:text-white">
                        {trip.num_people}
                      </Text>
                    </Space>
                  </Card>
                </Col>
              </Row>
              
              <Divider className="my-4 dark:border-gray-700" />
              
              <Row className="mb-2">
                <Col span={12}>
                  <Text className="text-sm text-gray-600 dark:text-gray-300">Start Date</Text>
                </Col>
                <Col span={12} className="text-right">
                  <Text strong className="text-gray-800 dark:text-white">
                    {new Date(trip.start_date).toLocaleDateString()}
                  </Text>
                </Col>
              </Row>
              
              <Row>
                <Col span={12}>
                  <Text className="text-sm text-gray-600 dark:text-gray-300">End Date</Text>
                </Col>
                <Col span={12} className="text-right">
                  <Text strong className="text-gray-800 dark:text-white">
                    {new Date(trip.end_date).toLocaleDateString()}
                  </Text>
                </Col>
              </Row>
              
              <Divider className="my-4 dark:border-gray-700" />
              
              <div className="flex items-center justify-between">
                <Text className="text-gray-600 dark:text-gray-300">Registration Status</Text>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: `${(trip.registration / trip.num_people) * 100}%` }}
                    ></div>
                  </div>
                  <Text className="text-gray-800 dark:text-white font-medium">
                    {trip.registration}/{trip.num_people}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>

          {/* Booking Form */}
          <Col xs={24} lg={12}>
            <Card 
              className="h-full shadow-lg dark:bg-gray-800"
              title={
                <div>
                  <Title level={4} className="text-green-600 mb-0">Complete Your Booking</Title>
                  <Text className="text-gray-600 dark:text-gray-300 text-sm">
                    Fill in your details to reserve your spot
                  </Text>
                </div>
              }
              bordered={false}
            >
              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                className="mt-2"
              >
                <Form.Item
                  name="name"
                  label={<span className="dark:text-white">Full Name</span>}
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input 
                    prefix={<UserOutlined className="text-green-500" />}
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </Form.Item>
                
                <Form.Item
                  name="email"
                  label={<span className="dark:text-white">Email Address</span>}
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input 
                    prefix={<MailOutlined className="text-green-500" />}
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </Form.Item>
                
                <Form.Item
                  name="phone"
                  label={<span className="dark:text-white">Phone Number</span>}
                  rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                  <Input 
                    prefix={<PhoneOutlined className="text-green-500" />}
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </Form.Item>
                
                <Form.Item
                  name="people"
                  label={<span className="dark:text-white">Number of People</span>}
                  rules={[{ required: true, message: 'Please enter number of people' }]}
                >
                  <InputNumber
                    min={1}
                    max={getAvailableSlots()}
                    defaultValue={1}
                    value={people}
                    onChange={(value) => setPeople(value)}
                    className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </Form.Item>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mt-4">
                  <Title level={5} className="dark:text-white mb-3">Booking Summary</Title>
                  
                  <Row className="mb-1">
                    <Col span={12}>
                      <Text className="text-gray-600 dark:text-gray-300">Trip Cost per Person</Text>
                    </Col>
                    <Col span={12} className="text-right">
                      <Text strong className="dark:text-white">${trip.price.toFixed(2)}</Text>
                    </Col>
                  </Row>
                  
                  <Row className="mb-1">
                    <Col span={12}>
                      <Text className="text-gray-600 dark:text-gray-300">Number of People</Text>
                    </Col>
                    <Col span={12} className="text-right">
                      <Text strong className="dark:text-white">{people}</Text>
                    </Col>
                  </Row>
                  
                  <Divider className="my-2 dark:border-gray-600" />
                  
                  <Row>
                    <Col span={12}>
                      <Text strong className="text-gray-800 dark:text-white">Total Amount</Text>
                    </Col>
                    <Col span={12} className="text-right">
                      <Text strong className="text-lg text-green-600">${getTotalAmount()}</Text>
                    </Col>
                  </Row>
                </div>
                
                <div className="mt-6">
                  <Button 
                    type="primary" 
                    block 
                    size="large"
                    onClick={handleSendOtp}
                    className="bg-green-600 hover:bg-green-700 border-green-600"
                  >
                    Proceed to Verification
                  </Button>
                  <Text className="block text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                    By clicking above, you agree to our terms and conditions.
                  </Text>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
      
      {/* OTP Popup */}
      {showOtpPopup && (
        <OtpPopup 
          setShowOtpPopup={setShowOtpPopup} 
          email={email}
          people={people}
          trip={trip}
        />
      )}
      
      {/* Custom styles for Ant Design components in dark mode */}
      <style jsx>{`
        :global(.ant-card) {
          border: none;
          border-radius: 8px;
        }
        
        :global(.dark .ant-card-head) {
          background-color: rgba(31, 41, 55, 0.8);
          border-bottom-color: #374151;
        }
        
        :global(.dark .ant-card-head-title) {
          color: white;
        }
        
        :global(.dark .ant-form-item-label > label) {
          color: white;
        }
        
        :global(.dark .ant-input) {
          background-color: #374151;
          border-color: #4B5563;
          color: white;
        }
        
        :global(.dark .ant-input-affix-wrapper) {
          background-color: #374151;
          border-color: #4B5563;
          color: white;
        }
        
        :global(.dark .ant-input-affix-wrapper > input) {
          background-color: transparent;
          color: white;
        }
        
        :global(.dark .ant-input-number) {
          background-color: #374151;
          border-color: #4B5563;
        }
        
        :global(.dark .ant-input-number-input) {
          color: white;
        }
        
        :global(.dark .ant-btn-primary) {
          background-color: #10b981;
          border-color: #10b981;
        }
        
        :global(.dark .ant-btn-primary:hover) {
          background-color: #059669;
          border-color: #059669;
        }
        
        :global(.dark .ant-divider) {
          border-color: #374151;
        }
        
        :global(.dark .ant-typography) {
          color: white;
        }
        
        :global(.dark .ant-card-body) {
          color: white;
        }
        
        :global(.dark .ant-btn-text) {
          color: rgba(255, 255, 255, 0.75);
        }
        
        :global(.dark .ant-empty-description) {
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Booking;
