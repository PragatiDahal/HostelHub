import React from "react";
import image from "../assets/hostelhub.png";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-[#E8F8F5] flex flex-col justify-center items-center">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-8">
        {/* Left Content Section */}
        <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[poppins] text-[#2C3E50] max-w-lg mx-auto md:mx-0 border-b-4 md:border-b-8 border-[#1ABC9C] inline-block">
            Hostel Hub
          </h1>
          <p className="text-[#7F8C8D] text-lg sm:text-xl font-[poppins] mt-4 md:mt-6 max-w-lg mx-auto md:mx-0">
            Find Your Perfect Stay, Every Time
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[poppins] text-[#2C3E50] mt-4 md:mt-6 max-w-lg mx-auto md:mx-0">
            We are here to <br />
            help you find your <br />
            best Hostels
          </h2>
          <button className="mt-6 md:mt-8 px-6 py-2 text-white text-lg font-semibold rounded-lg bg-[#1ABC9C] hover:bg-[#16a085] transition duration-300 ease-in-out">
            Contact Us
          </button>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center items-center md:w-1/2 overflow-hidden">
          <img
            src={image}
            alt="HostelHub"
            className="w-2/3 md:w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

