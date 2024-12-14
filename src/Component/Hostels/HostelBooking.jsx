import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../Contexts/StoreContext";
// import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const HostelBooking = () => {
  const { selectedHostel, setSelectedHostel, userInfo, setUserInfo, token } =
    useContext(StoreContext);
  // const [redirectMessage, setRedirectMessage] = useState("");

  const [error, setError] = useState({});
  // const { isLoggedIn } = useAuth;
  const navigate = useNavigate();

  // Redirect if the user is not logged in
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     setRedirectMessage("You need to log in to book the hostel."); // Set the message
  //     navigate("/usersignin", { state: { message: "You need to log in to book the hostel." } });
  //   }
  //   else {
  //     // User is logged in: Navigate to hostel booking page
  //     navigate("/hostelbooking");
  //   }
  // }, [isLoggedIn, navigate]);

  const validate = () => {
    let formErrors = {};
    // Validate userName
    if (!userInfo.userName?.trim()) {
      formErrors.userName = "Username is Required *";
    }
    if (!userInfo.firstName.trim()) {
      formErrors.firstName = "First Name is Required *";
    }
    if (!userInfo.lastName.trim()) {
      formErrors.lastName = "Last Name is Required *";
    }
    if (!userInfo.email.trim()) {
      formErrors.email = "Email is Required *";
    } else if (
      !/^([A-Za-z0-9]+(?:[.#_][A-Za-z\d]+)*@[A-Za-z]+)(\.[A-Za-z]{2,3})$/.test(
        userInfo.email
      )
    ) {
      formErrors.email = "Incorrect email format";
    }
    if (!userInfo.phoneNumber.trim()) {
      formErrors.phoneNumber = "Phone number is Required *";
    } else if (!/^[0-9]{10}$/.test(userInfo.phoneNumber)) {
      formErrors.phoneNumber = "Invalid phone Number";
    }
    return formErrors;
  };

  const handleUserInfoChange = (e) => {
    const { value, name } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    setError((prevErr) => ({ ...prevErr, [name]: "" }));
  };

  const handleProceedToBooking = async () => {
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setError(validation);
    } else {
      try {
        const result = await axios.post(
          "http://localhost:5000/api/hostelBooking",
          {
            userName: userInfo.userName, // Extract userName
            hostelName: selectedHostel.name, // Extract hostelName
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(result);
        setSelectedHostel(null);
        navigate("/booking-confirmation");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6 pt-12">
      {/* User Info Form */}
      <div className="lg:w-1/2 p-6 bg-[#E8F8F5] shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 font-[poppins] text-[#2C3E50]">
          Personal Information
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium font-[poppins] text-[#2C3E50]">
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={userInfo.userName || ""}
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
              value={userInfo.firstName || ""}
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
              value={userInfo.lastName || ""}
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
              value={userInfo.email || ""}
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
              value={userInfo.phoneNumber || ""}
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
        </form>
      </div>

      {/* Booking Summary */}
      <div className="lg:w-1/2 p-6 bg-[#E8F8F5] shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 font-[poppins] text-[#2C3E50]">
          Booking Summary
        </h2>
        {selectedHostel ? (
          <div>
            <p className="text-lg">Hostel Name: {selectedHostel.name}</p>
            <p className="text-lg">Location: {selectedHostel.location}</p>
            <p className="text-lg">Price: Rs. {selectedHostel.price}/month</p>
            <p className="text-lg">Room Type: {selectedHostel.roomType}</p>
          </div>
        ) : (
          <p>No hostel selected.</p>
        )}
        {userInfo ? (
          <div>
            <p>User: {userInfo.userName}</p>
          </div>
        ) : (
          <p>Please log in.</p>
        )}
        <button
          type="button"
          onClick={handleProceedToBooking}
          className="mt-6 w-full bg-[#2C3E50] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#34495E] font-[poppins]"
        >
          Proceed to Book
        </button>
      </div>
    </div>
  );
};
export default HostelBooking;
