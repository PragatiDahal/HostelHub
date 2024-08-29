import React from 'react'
import h5 from "../assets/h5.png"

const Booking = () => {
 
  return (
    <div className="relative bg-[#E8F8F5] flex flex-col md:flex-row items-center justify-between p-8">
  {/* Left Section - Text Content */}
  <div className="md:w-1/2 p-6 md:order-1">
    <h1 className="text-4xl font-bold text-[#2C3E50] mb-4">
      Discover Your Ideal Hostel Stay
    </h1>
    <p className="text-lg text-[#2C3E50] mb-6">
      Highlight tailored options here. It could be budget-friendly accommodations, hostels in prime locations, or gender-specific stays designed just for you. Give your unique preferences the spotlight they deserve.
    </p>
    <button className="bg-[#1ABC9C] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#16A085] transition duration-300">
      Book now
    </button>
  </div>

  {/* Right Section - Image */}
  <div className="md:w-1/2 md:order-2 mt-6 md:mt-0">
    <img
      src={h5}
      alt="Hostel Building"
      className="w-full h-auto rounded-lg shadow-lg"
    />
  </div>
</div>


  )
}

export default Booking