import React from "react";

const Contact = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-10 bg-[#E8F8F5]">
        <div className="text-center pt-20">
          <h2 className="text-3xl font-bold mb-4">Get in touch with us</h2>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="flex items-center space-x-2 p-4 bg-gray-800 text-white rounded-lg">
              <span role="img" aria-label="phone">
              </span>
              <p>9801234567</p>
            </div>
            <div className="flex items-center space-x-2 p-4 bg-gray-800 text-white rounded-lg">
              <span role="img" aria-label="email">
                ✉️
              </span>
              <p>hostelhub@gmail.com</p>
            </div>
            <div className="flex items-center space-x-2 p-4 bg-gray-800 text-white rounded-lg">
              <span role="img" aria-label="website">
                🌐
              </span>
              <p>hostelhub.com</p>
            </div>
          </div>
        </div>

        <form className="w-full max-w-5xl bg-white pt-16 px-8 pb-8 rounded-lg shadow-md">
          <div className="mb-4">
            <input
              className="w-1/2 px-4 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-1/2 px-4 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-1/2 px-4 py-2  border-2 border-orange-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Subject"
              required
            />
          </div>
          <div className="w-1/2">
            <textarea
              className="w-full h-40 p-4 py-2 border-2 border-orange-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Message"
              required
            ></textarea>
          </div>

          <button
            className="w-1/4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-[#1ABC9C] transition-colors"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
