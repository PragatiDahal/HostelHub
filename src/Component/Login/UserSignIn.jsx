import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useAuth } from "../Contexts/AuthContext";
import { StoreContext } from "../Contexts/StoreContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UserSignIn = () => {
  const { token, setToken } = useContext(StoreContext) || {
    token: null,
    setToken: () => console.warn("setToken is not available"),
  };
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    let formErrors = {};
    if (!formData.userName.trim())
      formErrors.userName = "Username is required *";
    if (!formData.password.trim())
      formErrors.password = "Password is required *";
    return formErrors;
  };

  // Handling Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (Object.keys(validationError).length > 0) {
      setError(validationError);
    } else {
      try {
        const result = await axios.post(
          "http://localhost:5000/api/login",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (result.data.message === "login sucessfully") {
          toast.success(result.data.message);
          const needToken = result.data.token;

          // Store token consistently
          localStorage.setItem("authToken", needToken);

          // Update AuthContext
          login(needToken);

          // Navigate to the home page
          navigate("/home");
        } else {
          toast.error(result.data.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevVal) => ({ ...prevVal, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <ToastContainer />
      <div className="w-full min-h-screen bg-[#E8F8F5] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-[#a7e8dc] flex flex-col md:flex-row items-center mx-auto rounded-lg overflow-hidden">
          {/* Left content section */}
          <div className="flex justify-center items-center w-full md:w-1/2 h-full p-4">
            <img
              src="https://i.pinimg.com/564x/fa/5f/e9/fa5fe9b6c9dcdba7fb9a1cbf12c9ddee.jpg"
              className="w-auto h-auto max-w-full max-h-full rounded-lg"
              alt="login"
            />
          </div>
          {/* Right content section */}
          <div className="w-full md:w-1/2 p-8 bg-[#a7e8dc] rounded-lg">
            <h2 className="text-3xl font-bold text-[#2C3E50] text-center">
              Sign In
            </h2>

            <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[#2C3E50] font-medium mb-2">
                  <FaUserCircle className="inline mr-2" />
                  Username*
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  placeholder="Enter your username"
                />
                {error.userName && (
                  <p className="text-red-500 text-sm">{error.userName}</p>
                )}
              </div>
              <div>
                <label className="block text-[#2C3E50] font-medium mb-2">
                  <RiLockPasswordFill className="inline mr-2" />
                  Password*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-600"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {error.password && (
                  <p className="text-red-500 text-sm">{error.password}</p>
                )}
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
                  <a
                    href="#"
                    className="text-[#E67E22] hover:underline text-sm"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-[#2C3E50] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                >
                  Login
                </button>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-[#2C3E50]">
                  Don't have an account?{" "}
                  <Link
                    to="/usersignup"
                    className="text-[#E67E22] hover:underline"
                  >
                    Signup
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignIn;
