import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MdCancel } from "react-icons/md";
import { Upload, Button, message, DatePicker, Input, InputNumber, Divider, Steps, Form } from "antd";
import { UploadOutlined, EnvironmentOutlined, TeamOutlined, DollarOutlined, CalendarOutlined } from "@ant-design/icons";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function TripPopUp({ closePopUp, addNewTrip }) {
  // Form states
  const [title, setTitle] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [price, setPrice] = useState("");
  const [destination, setDestination] = useState("");
  const [registration, setRegistration] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user ? user._id : null;
  
  // Handle image upload
  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      
      const uploadResult = await axios.post(
        "http://localhost:5000/upload/image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      
      if (uploadResult.data && uploadResult.data.imageUrl) {
        setImageUrl(uploadResult.data.imageUrl);
        message.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Failed to upload image. Please try again.");
    }
  };
  
  // Ant Design Upload props
  const uploadProps = {
    beforeUpload: (file) => {
      // Check file type
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG files!');
        return Upload.LIST_IGNORE;
      }
      
      // Check file size (less than 5MB)
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!');
        return Upload.LIST_IGNORE;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
      handleImageUpload(file); // Upload image when selected
      return false;
    },
    onRemove: () => {
      setImage(null);
      setImagePreview("");
      setImageUrl("");
      message.info("Image removed.");
    },
    showUploadList: false
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      
      const formData = new FormData();
      formData.append("title", title);
      formData.append("numPeople", numPeople);
      formData.append("price", price);
      formData.append("registration", registration);
      formData.append("author", userID);
      formData.append("destination", destination);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      if (image) {
        formData.append("image", image);
      }
      
      const result = await axios.post(
        "http://localhost:5000/create/trip",
        formData, 
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      
      addNewTrip(result.data);
      closePopUp();
      toast.success("Trip created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      await axios.put(`http://localhost:5000/dashboard/tourcount`, { id: userID, action: "increase" });
    } catch (error) {
      if (error.errorFields) {
        message.error('Please complete all required fields');
      } else {
        console.error("Error creating trip:", error);
        toast.error("Failed to create trip. Please try again.");
      }
    }
  };
  
  // Next and previous step handlers
  const nextStep = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields(['title', 'destination']);
      } else if (currentStep === 1) {
        await form.validateFields(['numPeople', 'price']);
      }
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Steps configuration
  const steps = [
    {
      title: 'Basic Info',
      content: (
        <div className="space-y-6 fade-in">
          <Form.Item 
            name="title" 
            label="Trip Title" 
            rules={[{ required: true, message: 'Please enter trip title' }]}
          >
            <Input 
              prefix={<EnvironmentOutlined className="text-green-600" />}
              placeholder="Enter an attractive title for your trip"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-2"
            />
          </Form.Item>
          
          <Form.Item 
            name="destination" 
            label="Destination" 
            rules={[{ required: true, message: 'Please enter destination' }]}
          >
            <Input 
              prefix={<EnvironmentOutlined className="text-green-600" />}
              placeholder="Where will this trip take you?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="py-2"
            />
          </Form.Item>
        </div>
      ),
    },
    {
      title: 'Trip Details',
      content: (
        <div className="space-y-6 fade-in">
          <Form.Item 
            name="numPeople" 
            label="Number of People" 
            rules={[{ required: true, message: 'Please enter number of people' }]}
          >
            <InputNumber
              prefix={<TeamOutlined className="text-green-600" />}
              placeholder="How many travelers?"
              min={1}
              value={numPeople}
              onChange={(value) => setNumPeople(value)}
              className="w-full py-2"
            />
          </Form.Item>
          
          <Form.Item 
            name="price" 
            label="Price" 
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber
              prefix={<DollarOutlined className="text-green-600" />}
              placeholder="Trip price"
              min={0}
              value={price}
              onChange={(value) => setPrice(value)}
              className="w-full py-2"
            />
          </Form.Item>
        </div>
      ),
    },
    {
      title: 'Dates & Image',
      content: (
        <div className="space-y-6 fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item 
              name="startDate" 
              label="Starting Date" 
              rules={[{ required: true, message: 'Please select start date' }]}
            >
              <DatePicker 
                className="w-full" 
                onChange={(date, dateString) => setStartDate(dateString)}
                format="YYYY-MM-DD"
              />
            </Form.Item>
            
            <Form.Item 
              name="endDate" 
              label="Ending Date" 
              rules={[{ required: true, message: 'Please select end date' }]}
            >
              <DatePicker 
                className="w-full" 
                onChange={(date, dateString) => setEndDate(dateString)}
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </div>
          
          <Form.Item 
            name="image" 
            label="Trip Image" 
            rules={[{ required: true, message: 'Please upload an image' }]}
          >
            <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors cursor-pointer">
              {!imagePreview ? (
                <Upload.Dragger {...uploadProps} className="w-full">
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined style={{ fontSize: '48px', color: '#10b981' }} />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for a single JPG or PNG image (max 5MB)
                  </p>
                </Upload.Dragger>
              ) : (
                <div className="relative w-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-auto max-h-64 rounded-lg object-cover shadow-lg"
                  />
                  <Button 
                    icon={<MdCancel />} 
                    className="absolute top-2 right-2 bg-white rounded-full shadow-md"
                    onClick={() => {
                      setImage(null);
                      setImagePreview("");
                      setImageUrl("");
                    }}
                  />
                </div>
              )}
            </div>
          </Form.Item>
        </div>
      ),
    },
    {
      title: 'Review',
      content: (
        <div className="space-y-6 fade-in">
          <div className="bg-gray-50  rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-600">Trip Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  <EnvironmentOutlined className="text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="text-gray-500 text-sm">Trip Title</p>
                    <p className="font-medium">{title}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <EnvironmentOutlined className="text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="text-gray-500 text-sm">Destination</p>
                    <p className="font-medium">{destination}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <TeamOutlined className="text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="text-gray-500 text-sm">Number of People</p>
                    <p className="font-medium">{numPeople}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <DollarOutlined className="text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="font-medium">${price}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CalendarOutlined className="text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="text-gray-500 text-sm">Dates</p>
                    <p className="font-medium">{startDate} to {endDate}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {imagePreview && (
              <div className="mt-4">
                <p className="text-gray-500 text-sm mb-2">Trip Image</p>
                <img src={imagePreview} alt="Trip" className="w-full h-auto max-h-40 object-cover rounded-lg" />
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 backdrop-blur-sm"
    >
      <div className="modal-enter bg-white dark:bg-gray-200 rounded-xl shadow-2xl w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 max-h-[90vh] overflow-hidden relative">
        {/* Header with gradient background */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-400 p-6">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            {/* Pattern overlay */}
            <div className="absolute inset-0" 
                style={{
                  backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" width=\"80\" height=\"80\"%3E%3Cpath fill=\"%23ffffff\" fill-opacity=\"0.4\" d=\"M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z\"/%3E%3C/svg%3E')"
                }}
            ></div>
          </div>
          
          <button
            className="absolute top-4 right-4 text-white hover:text-red-100 focus:outline-none transition-colors z-10"
            onClick={closePopUp}
          >
            <MdCancel className="text-3xl" />
          </button>
          
          <h1 className="text-3xl font-bold text-white mb-1 relative z-10">Create New Trip</h1>
          <p className="text-green-50 relative z-10">Let's create an unforgettable journey</p>
        </div>
        
        {/* Progress steps */}
        <div className="px-8 pt-6">
          <Steps
            current={currentStep}
            items={steps.map(item => ({ title: item.title }))}
            className="custom-steps"
          />
        </div>
        
        {/* Form content */}
        <div className="p-8 overflow-y-auto max-h-[50vh] custom-scrollbar">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            className="w-full"
          >
            {steps[currentStep].content}
          </Form>
        </div>
        
        {/* Navigation buttons */}
        <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-green-600 to-emerald-400 flex justify-between items-center">
          <div>
            {currentStep > 0 && (
              <Button 
                onClick={prevStep}
                className="mr-4 border-green-600 text-green-600 hover:text-green-700 hover:border-green-700"
              >
                Previous
              </Button>
            )}
          </div>
          <div>
            {currentStep < steps.length - 1 && (
              <Button 
                type="primary" 
                onClick={nextStep}
                className="bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700"
              >
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button 
                type="primary" 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700"
              >
                Create Trip
              </Button>
            )}
          </div>
        </div>
        
        {/* Custom styling */}
        <style jsx>{`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #10b981 #f3f4f6;
          }
          
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 10px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #10b981;
            border-radius: 10px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #059669;
          }
          
          .dark .custom-scrollbar::-webkit-scrollbar-track {
            background: #1f2937;
          }
          
          /* Override Ant Design styles */
          :global(.ant-btn-primary) {
            background-color: #10b981 !important;
            border-color: #10b981 !important;
          }
          
          :global(.ant-btn-primary:hover) {
            background-color: #059669 !important;
            border-color: #059669 !important;
          }
          
          :global(.ant-steps-item-process .ant-steps-item-icon) {
            background-color: #10b981 !important;
            border-color: #10b981 !important;
          }
          
          :global(.ant-steps-item-finish .ant-steps-item-icon) {
            border-color: #10b981 !important;
          }
          
          :global(.ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon) {
            color: #10b981 !important;
          }
          
          :global(.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after) {
            background-color: #10b981 !important;
          }
          
          .dark :global(.ant-form-item-label > label) {
            color: white;
          }
          
          .dark :global(.ant-input),
          .dark :global(.ant-input-number),
          .dark :global(.ant-picker) {
            background-color: #1f2937;
            border-color: #374151;
            color: white;
          }
          
          .dark :global(.ant-input-number-input) {
            color: white;
          }
          
          .dark :global(.ant-upload-drag) {
            background-color: #1f2937;
            border-color: #374151;
          }
          
          .dark :global(.ant-upload-text),
          .dark :global(.ant-upload-hint) {
            color: #d1d5db;
          }
        `}</style>
      </div>
    </div>
  );
}

TripPopUp.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  addNewTrip: PropTypes.func.isRequired,
};

export default TripPopUp;

