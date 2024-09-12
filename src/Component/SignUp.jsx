import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-[#E8F8F5] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-[#a7e8dc] flex flex-col md:flex-row items-center mx-auto rounded-lg overflow-hidden">
          {/* Left content section */}
          <div className="flex justify-center items-center w-full md:w-1/2 h-full p-4">
            <img
              src="https://knowledgemission.kerala.gov.in/img/official-login.jpg"
              className="w-auto h-auto max-w-full max-h-full rounded-lg"
              alt="login"
            />
          </div>
          {/* Right content section */}
          <div className="w-full md:w-1/2 p-8 bg-[#a7e8dc] rounded-lg">
            <h2 className="text-3xl font-bold mb-4 text-center text-[#2C3E50] font-[poppins]">
              Create an account
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
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
              />
              <button
                type="submit"
                className="w-full bg-[#2C3E50] text-white font-[poppins] py-2 rounded-md hover:bg-[#1A2D41] transition duration-200"
              >
                Signup
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-[#2C3E50] font-[poppins]">Or Signup with</p>
              <div className="flex justify-center mt-4 space-x-4">
                <button className="flex items-center justify-center bg-white border border-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300">
                  <img
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="ml-2 text-[#2C3E50] font-[poppins]">
                    Google
                  </span>
                </button>
                <button className="flex items-center justify-center bg-white border border-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300">
                  <img
                    src="https://img.icons8.com/color/16/000000/facebook.png"
                    alt="Facebook"
                    className="w-5 h-5"
                  />
                  <span className="ml-2 text-[#2C3E50] font-[poppins]">
                    Facebook
                  </span>
                </button>
              </div>
              <p className="mt-4 text-sm text-[#2C3E50] font-[poppins]">
                Already have an account?{" "}
                <Link
                  to="/Signin"
                  className="text-[#E67E22] hover:underline font-[poppins]"
                >
                  Signin
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
