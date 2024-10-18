import React from 'react';
import { Link } from 'react-router-dom';
import Offer from './Offer';
import Testimonials from './Testimonials';

const About = () => {
  return (
    <div className=" bg-cover bg-center h-screen flex flex-col justify-between text-white" style={{ backgroundImage: 'url("/h61.png")',
     }}>
      
      <nav className="flex justify-between items-center px-8 py-4" style={{ backgroundColor: '#2C3E50' }}>
        <div className="text-xl text-white font-bold">
          Hostel <span style={{ color: '#1ABC9C' }}>Hub</span>
        </div>
        <div className="flex items-center space-x-8">
          <a href="/" className="text-white hover:text-gray-300">Home</a>
          <a href="/hostels" className="text-white hover:text-gray-300">Hostels</a>
          <a href="/about" className="text-white hover:text-gray-300">About</a>
          <a href="/contact" className="text-white hover:text-gray-300">Contact</a>
          <a href="/blog" className="text-white hover:text-gray-300">Blog</a>
          <a href="/signin" className="text-white hover:text-gray-300">Sign in</a>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center text-center">
        <div className="bg-[#2C3E50] bg-opacity-70 p-8 md:p-16 rounded-lg shadow-lg max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hostel Hub: Your trusted guide to hostels</h2>
          <p className="text-lg md:text-xl mb-6 text-justify">
            Hostel Hub is your go-to platform for finding the perfect hostel in Kathmandu, Bhaktapur, and Lalitpur.
            We specialize in providing personalized and relevant recommendations based on your preferences,
            whether it's price, location, or gender-specific options. Our easy-to-use system allows you to filter
            through numerous hostels, read reviews, and make informed decisions quickly. At Hostel Hub, we aim to make your
            hostel search hassle-free, offering a seamless booking experience with accurate, reliable, and up-to-date
            information, ensuring you find a place that feels like home.
          </p>
          <Link to="/hostels">
          <button className="bg-[#1ABC9C] hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition duration-300">
            Explore
          </button>
          </Link>
        </div>
      </div>

      
    </div>     
  );
};

export default About;