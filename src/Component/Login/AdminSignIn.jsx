import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignIn = () => {
  const navigate = useNavigate();

  // State for storing user input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validCredentials = {
    username: "admin",
    password: "admin123",
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Validate input fields
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    // Check credentials
    if (
      username === validCredentials.username &&
      password === validCredentials.password
    ) {
      localStorage.setItem("authToken", "dummy-auth-token");
      setError("");
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#E8F8F5] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#a7e8dc] flex flex-col md:flex-row items-center mx-auto rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="flex justify-center items-center w-full md:w-1/2 h-full p-4">
          <img
            src="https://i.pinimg.com/564x/41/35/80/4135802515db3c9e692e6c65596629e2.jpg"
            className="w-auto h-auto max-w-full max-h-full rounded-lg"
            alt="login"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-8 bg-[#a7e8dc] rounded-lg">
          <h2 className="text-3xl font-bold text-[#2C3E50] text-center">
            Admin LogIn
          </h2>
          <form className="space-y-6 mt-8" onSubmit={handleLogin}>
            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Username Input */}
            <div>
              <label className="block text-[#2C3E50] font-medium mb-2">
                Username*
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[#2C3E50] font-medium mb-2">
                Password*
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                placeholder="Enter your password"
              />
            </div>

            {/* Remember Me and Forgot Password */}
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
              <a href="#" className="text-[#E67E22] hover:underline text-sm">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#2C3E50] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
            >
              Login to my account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
