import React from 'react'
import HostelCard from './Hostels/HostelCard';
import h2 from "../../src/assets/h2.png"
import h3 from "../../src/assets/h3.png"
import h4 from "../../src/assets/h4.png"

const Hostels = () => {
    const hostels = [
      {
        name: "ABC Hostel",
        image: h2,
        description: "Lorem Ipsum lorem Ipsum Akrit lorem Akriti lorem.",
        features: ["4 bedrooms", "WiFi", "Laundry"],
        ratings: "★★★★☆",
      },
      {
        name: "PQR Hostel",
        image: h3,
        description: "Lorem Ipsum lorem Ipsum Akrit lorem Akriti lorem.",
        features: ["4 bedrooms", "WiFi", "Laundry"],
        ratings: "★★★★☆",
      },
      {
        name: "XYZ Hostel",
        image: h4,
        description: "Lorem Ipsum lorem Ipsum Akrit lorem Akriti lorem.",
        features: ["4 bedrooms", "WiFi", "Laundry"],
        ratings: "★★★★☆",
      },
    ];
    return (
      <>
        <div className="bg-[#E8F8F5] pt-12 px-4 mt-10">
          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-white shadow-md p-4 sm:rounded-full">
              <input
                type="text"
                placeholder="Location"
                className="outline-none px-4 py-2 border border-[#E67E22] rounded-full w-full sm:w-auto font-[poppins]"
              />
              <input
                type="text"
                placeholder="Gender specific"
                className="outline-none px-4 py-2 border border-[#E67E22] rounded-full w-full sm:w-auto font-[poppins]"
              />
              <input
                type="text"
                placeholder="Price range"
                className="outline-none px-4 py-2 border border-[#E67E22] rounded-full w-full sm:w-auto font-[poppins]"
              />
              <button className="bg-[#1ABC9C] text-white px-4 py-2 rounded-full w-full sm:w-auto font-[poppins]">
                Search
              </button>
            </div>
          </div>
  
          {/* Kathmandu */}
          <div className="text-left mb-10 pt-8">
          <h2 className="text-4xl font-bold font-[poppins] text-[#2C3E50]">Kathmandu</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {hostels.map((hostel, index) => (
            <HostelCard key={index} hostel={hostel} />
          ))}
        </div>
  
          {/* View More Button */}
          <div className="flex justify-center pb-8">
            <button className="bg-[#1ABC9C] text-white px-6 py-2 rounded-full font-[poppins]">
              View more
            </button>
          </div>

          {/* Lalitpur */}
          <div className="text-left mb-10 pt-8">
          <h2 className="text-4xl font-bold font-[poppins] text-[#2C3E50]">Lalitpur</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {hostels.map((hostel, index) => (
            <HostelCard key={index} hostel={hostel} />
          ))}
        </div>
  
          {/* View More Button */}
          <div className="flex justify-center pb-8">
            <button className="bg-[#1ABC9C] text-white px-6 py-2 rounded-full font-[poppins]">
              View more
            </button>
          </div>

          {/* Bhaktapur */}
          <div className="text-left mb-10 pt-8">
          <h2 className="text-4xl font-bold font-[poppins] text-[#2C3E50]">Bhaktapur</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {hostels.map((hostel, index) => (
            <HostelCard key={index} hostel={hostel} />
          ))}
        </div>
  
          {/* View More Button */}
          <div className="flex justify-center pb-8">
            <button className="bg-[#1ABC9C] text-white px-6 py-2 rounded-full font-[poppins]">
              View more
            </button>
          </div>
        </div>
      </>
  )
}

export default Hostels