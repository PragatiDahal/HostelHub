import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let formErrors = {};
    if (!formData.userName.trim()) {
      formErrors.userName = "Username is required *";
    } else if (!/[A-Za-z]+[A-Za-z]*/.test(formData.userName)) {
      formErrors.userName = "Invalid Username";
    }

    if (!formData.email.trim()) {
      formErrors.email = "Email is required *";
    } else if (
      !/^([A-Za-z0-9]+(?:[.#_][A-Za-z\d]+)*@[A-Za-z]+)(\.[A-Za-z]{2,3})$/.test(
        formData.email
      )
    ) {
      formErrors.email = "Incorrect email format";
    }

    if (!formData.phoneNumber.trim()) {
      formErrors.phoneNumber = "Phone Number is required *";
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      formErrors.phoneNumber = "Invalid phone number";
    }

    if (!formData.password.trim()) {
      formErrors.password = "Password is required *";
    } else if (formData.password.length < 8) {
      formErrors.password = "At least 8 characters required";
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W_]).{8,}$/.test(
        formData.password
      )
    ) {
      formErrors.password =
        "Use at least an uppercase letter, a lowercase letter, a digit, and a symbol";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      try {
        const result = await axios.post("http://localhost:5000/api/signup", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (result.data === "user registered successfully") {
          toast.success(result.data);
          setTimeout(() => {
            navigate("/usersignin");
          }, 2000);
        } else {
          toast.error(result.data);
        }
      } catch (err) {
        toast.error(err.response?.data || "An error occurred");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  return (
    <>
    <ToastContainer />
    <div className="w-full min-h-screen bg-[#E8F8F5] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#a7e8dc] flex flex-col md:flex-row items-center mx-auto rounded-lg overflow-hidden">
        <div className="flex justify-center items-center w-full md:w-1/2 h-full p-4">
          <img
            src="https://i.pinimg.com/564x/41/35/80/4135802515db3c9e692e6c65596629e2.jpg"
            className="w-auto h-auto max-w-full max-h-full rounded-lg"
            alt="signup"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 bg-[#a7e8dc] rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-center text-[#2C3E50]">
            Register Your Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <FaUserCircle className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Username"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
              {error.userName && (
                <p className="text-red-500 text-xs">{error.userName}</p>
              )}
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
              {error.email && (
                <p className="text-red-500 text-xs">{error.email}</p>
              )}
            </div>
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
              {error.phoneNumber && (
                <p className="text-red-500 text-xs">{error.phoneNumber}</p>
              )}
            </div>
            <div className="relative">
              <RiLockPasswordFill className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                />
              )}
              {error.password && (
                <p className="text-red-500 text-xs">{error.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#2C3E50] text-white py-2 rounded-md hover:bg-[#1A2D41] transition duration-200"
            >
              Signup
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="mt-4 text-sm text-[#2C3E50]">
              Already have an account?{" "}
              <Link to="/Signin" className="text-[#E67E22] hover:underline">
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

export default UserSignUp;
