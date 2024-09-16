import React from 'react'
import image from "../../assets/preview.webp";


const HostelRegister = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-[#E8F8F5] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-[#a7e8dc] flex flex-col md:flex-row items-center mx-auto rounded-lg overflow-hidden">
          {/* Left content section */}
          <div className="flex justify-center items-center w-full md:w-1/2 h-full p-4">
            <img
              src={image}
              className="w-auto h-auto max-w-full max-h-full rounded-lg"
              alt="login"
            />
          </div>
          {/* Right content section */}
          <div className="w-full md:w-1/2 p-8 bg-[#a7e8dc] rounded-lg">
            <h2 className="text-3xl font-bold mb-4 text-center text-[#2C3E50] font-[poppins]">
              Register your Hostel
            </h2>
            <form className="space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
              />
              <input
                type="number"
                placeholder="Phone number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
              />
              <input
                type="text"
                placeholder="Hostel name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
              />
              <input
                type="number"
                placeholder="Hostel PAN number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
              />
              <button
                type="submit"
                className="w-full bg-[#2C3E50] text-white font-[poppins] py-2 rounded-md hover:bg-[#1A2D41] transition duration-200"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default HostelRegister