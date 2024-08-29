import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter,FaTelegram } from 'react-icons/fa6';
import { FaPhoneAlt, FaEnvelope, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-[#1F3A54] text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and Social Links */}
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-[#00AF91] font-[poppins]">Hostel <span className="text-white">Hub</span></h1>
          <p className="mt-2 text-sm font-[poppins]">Your trusted guide to hostels</p>
          <div className="flex mt-4 space-x-4">
            <FaFacebookF className="text-[#00AF91] cursor-pointer" size={25} />
            <FaInstagram className="text-[#00AF91] cursor-pointer" size={25} />
            <FaYoutube className="text-[#00AF91] cursor-pointer" size={25} />
            <FaXTwitter className="text-[#00AF91] cursor-pointer" size={25} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 font-[poppins]">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#00AF91] font-[poppins]">Home</a></li>
            <li><a href="#" className="hover:text-[#00AF91] font-[poppins]">Hostels</a></li>
            <li><a href="#" className="hover:text-[#00AF91] font-[poppins]">About</a></li>
            <li><a href="#" className="hover:text-[#00AF91] font-[poppins]">Contact</a></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h2 className="text-lg font-semibold mb-4 font-[poppins]">Get in touch with us</h2>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 font-[poppins]">
              <FaPhoneAlt />
              <span>9801234567</span>
            </li>
            <li className="flex items-center space-x-2 font-[poppins]">
              <FaEnvelope />
              <span>hostelhub@gmail.com</span>
            </li>
            <li className="flex items-center space-x-2 font-[poppins]">
              <FaGlobe />
              <span>hostelhub.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold mb-4 font-[poppins]">Newsletter</h2>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md text-black focus:outline-none font-[poppins]"
            />
            <button className="bg-[#00AF91] px-4 py-2 rounded-r-md">
              <FaTelegram size={25}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
