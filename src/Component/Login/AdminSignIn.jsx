import React from 'react'

const AdminSignIn = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-[#E8F8F5] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-[#a7e8dc] flex flex-col md:flex-row items-center mx-auto rounded-lg overflow-hidden">
          {/* Left content section */}
          <div className="flex justify-center items-center w-full md:w-1/2 h-full p-4">
            <img 
              src="https://i.pinimg.com/564x/d1/54/66/d154660a6ae3104de2b0a314667a5ab6.jpg" 
              className="w-auto h-auto max-w-full max-h-full rounded-lg" 
              alt="login" 
            />
          </div>
          {/* Right content section */}
          <div className="w-full md:w-1/2 p-8 bg-[#a7e8dc] rounded-lg">
            <h2 className="text-3xl font-bold text-[#2C3E50] text-center">Admin LogIn</h2>
            <form className="space-y-6 mt-8">
              <div>
                <label className="block text-[#2C3E50] font-medium mb-2">Username*</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-[#2C3E50] font-medium mb-2">Password*</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="w-4 h-4 text-teal-500 focus:ring-teal-400 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-[#2C3E50]">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="#" className="text-[#E67E22] hover:underline text-sm">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-[#2C3E50] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                >
                  Login to my account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSignIn