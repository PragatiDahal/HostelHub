import React, { useState } from "react";
import axios from "axios";
import { FaPhone, FaGlobe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitted(false);
  
    try {
      const response = await axios.post("http://localhost:5000/api/contacts", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Accept both 200 and 201 status codes
      if (response.status === 200 || response.status === 201) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        throw new Error("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-[#E8F8F5] flex items-center justify-center p-6">
      <div className="w-full max-w-lg mx-auto space-y-6">
        <header className="text-center pt-10">
          <h2 className="text-3xl font-bold text-[#2C3E50] font-[poppins] ">
            Get in touch with us
          </h2>
        </header>

        {/* Contact Information */}
        <div className="flex flex-col md:flex-row md:justify-around space-y-4 md:space-y-0 px-4">
          <div className="flex items-center space-x-2 bg-[#2C3E50] text-white p-3 rounded-md justify-center">
            <span className="text-orange-500">
              <FaPhone />
            </span>
            <span className="font-[poppins]">9801234567</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#2C3E50] text-white p-3 rounded-md justify-center">
            <span className="text-orange-500">
              <MdEmail />
            </span>
            <span className="font-[poppins]">hostelhub@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#2C3E50] text-white p-3 rounded-md justify-center">
            <span className="text-orange-500">
              <FaGlobe />
            </span>
            <span className="font-[poppins]">hostelhub.com</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-lg p-8 px-10">
          {isSubmitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
              Your message has been successfully submitted!
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-[#E8F8F5]"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-[#E8F8F5]"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-[#E8F8F5]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
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
  );
};

export default Contact;
