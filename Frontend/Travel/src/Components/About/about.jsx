import React from 'react';

const About = () => {
  return (
    <div 
      className="relative w-full h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url("/ddd.webp")`}}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white">About Us</h1>
        <p className="text-lg md:text-xl text-white max-w-2xl mt-4">
          Welcome to our travel website! We are passionate about exploring new places
          and helping you create unforgettable experiences. Join us on a journey to 
          discover the world’s most breathtaking destinations.
        </p>
      </div>
    </div>
  );
};

export default About;
