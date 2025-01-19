import React, { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const HostelBooking = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [hostelDetails, setHostelDetails] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [fetchError, setFetchError] = useState("");
  const [bookingInfo, setBookingInfo] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    roomType: "",
  });
  const [message, setMessage] = useState("");

  const hostelName = location.state?.selectedHostel;

  useEffect(() => {
    if (!token) {
      navigate("/usersignin", {
        state: { message: "You need to log in to book the hostel." },
      });
    } else if (!hostelName) {
      navigate("/hostels", {
        state: { message: "Please select a hostel to proceed with booking." },
      });
    } else {
      fetchHostelDetails(hostelName);
    }
  }, [hostelName, token, navigate]);

  const fetchHostelDetails = async (hostelName) => {
    setFetchError("");
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/hosteldetail/${encodeURIComponent(
          hostelName
        )}`
      );
      setHostelDetails(response.data);
      const fetchedRoomTypes = response.data.rooms || [];
      // Ensure the roomTypes is an array
      if (Array.isArray(fetchedRoomTypes)) {
        setRoomTypes(fetchedRoomTypes);
      } else {
        console.error("roomTypes is not an array:", fetchedRoomTypes);
        setRoomTypes([]); // Set as empty array if it's not an array
      }
    } catch (error) {
      setFetchError(
        error.response?.status === 404
          ? "The selected hostel could not be found. Please choose another."
          : "Failed to fetch hostel details. Please try again later."
      );
      console.error("Error fetching hostel details:", error);
    } finally {
      setIsLoading(false);
    }
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo((prev) => ({ ...prev, [name]: value }));
    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    let formErrors = {};
    if (!bookingInfo.userName.trim())
      formErrors.userName = "Username is required.";
    if (!bookingInfo.firstName.trim())
      formErrors.firstName = "First name is required.";
    if (!bookingInfo.lastName.trim())
      formErrors.lastName = "Last name is required.";
    if (!bookingInfo.email.trim()) {
      formErrors.email = "Email is required.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        bookingInfo.email
      )
    ) {
      formErrors.email = "Invalid email format.";
    }
    if (!bookingInfo.phoneNumber.trim())
      formErrors.phoneNumber = "Phone number is required.";
    else if (!/^\d{10}$/.test(bookingInfo.phoneNumber)) {
      formErrors.phoneNumber = "Invalid phone number.";
    }
    if (!bookingInfo.roomType)
      formErrors.roomType = "Please select a room type.";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          userInfo: {
            email: bookingInfo.email,
            name: bookingInfo.userName,
          },
          name: hostelDetails.name,
          location: hostelDetails.location?.address,
          roomType: bookingInfo.roomType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Full Response:", response);

      // Show success message
      // setMessage("Booking successful!");

      // Show an alert
      // alert("Booking is registered successfully!");

      // Clear the booking info after successful submission
      setBookingInfo({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        roomType: "",
      });
      navigate("/payment", {
        state:  bookingInfo ,
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Booking failed. Please try again.";
      setMessage(errorMessage); // Display error (e.g., duplicate booking)
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6 pt-12">
      <div className="lg:w-1/2 p-6 bg-[#E8F8F5] shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-[#2C3E50]">
          Hostel Booking
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {["userName", "firstName", "lastName", "email", "phoneNumber"].map(
            (field) => (
              <div key={field}>
                <label className="block font-medium text-[#2C3E50] capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={bookingInfo[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${field}`}
                  className={`w-full p-2 border ${
                    error[field] ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {error[field] && (
                  <p className="text-red-500 text-sm">{error[field]}</p>
                )}
              </div>
            )
          )}
          <div>
            <label className="block font-medium text-[#2C3E50]">
              Room Type
            </label>
            <select
              name="roomType"
              value={bookingInfo.roomType}
              onChange={handleInputChange}
              required
              className={`w-full p-2 border ${
                error.roomType ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            >
              <option value="">-- Select Room Type --</option>
              <option value="Single Room">Single</option>
              <option value="Double Room">Double</option>
              <option value="Triple Room">Triple</option>
              {roomTypes.map((room, index) => (
                <option key={index} value={room.type}>
                  {room.type}
                </option>
              ))}
            </select>
            {error.roomType && (
              <p className="text-red-500 text-sm">{error.roomType}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 w-full py-2 px-4 rounded-md text-white ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2C3E50] hover:bg-[#34495E]"
            }`}
          >
            {isLoading ? "Submitting..." : "Proceed to Book"}
          </button>
        </form>
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </div>

      <div className="lg:w-1/2 p-6 bg-[#E8F8F5] shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-[#2C3E50]">
          Booking Summary
        </h2>
        {isLoading ? (
          <p>Loading hostel details...</p>
        ) : fetchError ? (
          <p className="text-red-500">{fetchError}</p>
        ) : hostelDetails ? (
          <div>
            <p className="text-lg">Hostel Name: {hostelDetails.name}</p>
            <p className="text-lg">
              Location: {hostelDetails.location?.address}
            </p>
            <p className="text-lg">
              Selected Room: {bookingInfo.roomType || "Not selected"}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {bookingInfo.userName && <p>Welcome, {bookingInfo.userName}</p>}
      </div>
    </div>
  );
};

export default HostelBooking;
