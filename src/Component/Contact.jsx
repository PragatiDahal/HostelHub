import React from "react";
import { FaPhone, FaGlobe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <>
      <div className="min-h-screen bg-[#E8F8F5] flex items-center justify-center p-6">
        <div className="w-full max-w-lg mx-auto space-y-6">
          <header className="text-center pt-10">
            <h2 className="text-3xl font-bold text-[#2C3E50] font-[poppins] ">
              Get in touch with us
            </h2>
          </header>

          {/* Contact Information */}
          <div className="flex flex-col md:flex-row md:justify-around space-y-4 md:space-y-0 px-4">
            <div className="flex items-center space-x-2 bg-[#2C3E50] text-white p-3 rounded-md justify-center ">
              <span className="text-orange-500">
                {/* Telephone */}
                <FaPhone />
              </span>
              <span className="font-[poppins]">9801234567</span>
            </div>

            <div className="flex items-center space-x-2 bg-[#2C3E50] text-white p-3 rounded-md justify-center">
              <span className="text-orange-500">
                {/* Email */}
                <MdEmail />
              </span>
              <span className="font-[poppins]">hostelhub@gmail.com</span>
            </div>

            <div className="flex items-center space-x-2 bg-[#2C3E50] text-white p-3 rounded-md justify-center">
              <span className="text-orange-500">
                {/* Website */}
                <FaGlobe />
              </span>
              <span className="font-[poppins]">hostelhub.com</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-8 px-10">
            <form action="#">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-[#E8F8F5]"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-[#E8F8F5]"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-[#E8F8F5]"
                />
              </div>

              <div className="mb-4">
                <textarea
                  placeholder="Message"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-32 bg-[#E8F8F5]"
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#1ABC9C] text-white font-[poppins] px-6 py-3 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
