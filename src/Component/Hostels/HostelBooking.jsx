import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const HostelBooking = () => {
  const { token, userInfo, logout } = useAuth(); // Get token and user info
  const navigate = useNavigate();
  const location = useLocation();
  const [hostelDetails, setHostelDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [userInfoState, setUserInfo] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const hostelName = location.state?.selectedHostel;

  useEffect(() => {
    if (!token) {
      navigate("/usersignin", {
        state: { message: "You need to log in to book the hostel." },
      });
    } else if (hostelName) {
      fetchHostelDetails(hostelName);
    } else {
      navigate("/hostels", {
        state: { message: "Please select a hostel to proceed with booking." },
      });
    }
  }, [hostelName, token, navigate]);

  const fetchHostelDetails = async (hostelName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/hosteldetail/${hostelName}`
      );
      setHostelDetails(response.data);
    } catch (error) {
      console.error("Error fetching hostel details:", error);
    }
  };

  // Handle user info changes
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form input
  const validate = () => {
    let formErrors = {};
    if (!userInfoState.userName?.trim())
      formErrors.userName = "Username is required *";
    if (!userInfoState.firstName?.trim())
      formErrors.firstName = "Firstname is required *";
    if (!userInfoState.lastName?.trim())
      formErrors.lastName = "Lastname is required *";
    if (!userInfoState.email?.trim()) {
      formErrors.email = "Email is required *";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(userInfoState.email)
    ) {
      formErrors.email = "Invalid email format";
    }
    if (!userInfoState.phoneNumber?.trim())
      formErrors.phoneNumber = "Phone number is required *";
    else if (!/^\d{10}$/.test(userInfoState.phoneNumber)) {
      formErrors.phoneNumber = "Invalid phone number";
    }
    return formErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/hostelbooking", {
        userInfo: userInfoState,
        hostelName: hostelName,
      });
      setIsLoading(false);
      alert("Booking successful");
      navigate("/confirmation");
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6 pt-12">
      {/* User Info Form */}
      <div className="lg:w-1/2 p-6 bg-[#E8F8F5] shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 font-[poppins] text-[#2C3E50]">
          Hostel Booking
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium font-[poppins] text-[#2C3E50]">
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={userInfoState.userName || ""}
              onChange={handleUserInfoChange}
              placeholder="Enter your username"
              className="w-full p-2 border border-gray-300 rounded-md font-[poppins]"
            />
            {error.userName && (
              <p className="text-red-500 text-sm font-[poppins]">
                {error.userName}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium font-[poppins] text-[#2C3E50]">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={userInfoState.firstName || ""}
              onChange={handleUserInfoChange}
              placeholder="Enter your first name"
              className="w-full p-2 border border-gray-300 rounded-md font-[poppins]"
            />
            {error.firstName && (
              <p className="text-red-500 text-sm font-[poppins]">
                {error.firstName}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium font-[poppins] text-[#2C3E50]">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={userInfoState.lastName || ""}
              onChange={handleUserInfoChange}
              placeholder="Enter your last name"
              className="w-full p-2 border border-gray-300 rounded-md font-[poppins] text-[#2C3E50]"
            />
            {error.lastName && (
              <p className="text-red-500 text-sm font-[poppins]">
                {error.lastName}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium font-[poppins] text-[#2C3E50]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={userInfoState.email || ""}
              onChange={handleUserInfoChange}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-md font-[poppins] text-[#2C3E50]"
            />
            {error.email && (
              <p className="text-red-500 text-sm font-[poppins]">
                {error.email}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium font-[poppins] text-[#2C3E50]">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={userInfoState.phoneNumber || ""}
              onChange={handleUserInfoChange}
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded-md font-[poppins]"
            />
            {error.phoneNumber && (
              <p className="text-red-500 text-sm font-[poppins]">
                {error.phoneNumber}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 w-full py-2 px-4 rounded-md font-[poppins] text-white ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#2C3E50] hover:bg-[#34495E]"}`}
          >
            {isLoading ? "Submitting..." : "Proceed to Book"}
          </button>
        </form>
      </div>

      {/* Booking Summary */}
      <div className="lg:w-1/2 p-6 bg-[#E8F8F5] shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 font-[poppins] text-[#2C3E50]">
          Booking Summary
        </h2>
        {hostelDetails ? (
          <div>
            <p className="text-lg">Hostel Name: {hostelDetails.name}</p>
            <p className="text-lg">Location: {hostelDetails.location?.address}</p>
          </div>
        ) : (
          <p>No hostel selected.</p>
        )}
        {userInfoState ? (
          <div>
            <p>Welcome {userInfoState.userName}</p>
          </div>
        ) : (
          <p>Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default HostelBooking;
