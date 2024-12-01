import React, { useState } from "react";
import axios from "axios"

const HostelRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hostelName: "",
    panNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.hostelName.trim()) {
      newErrors.hostelName = "Hostel Name is required";
    }

    if (!formData.panNumber.trim()) {
      newErrors.panNumber = "PAN number is required";
    } else if (!/^\d+$/.test(formData.panNumber)) {
      newErrors.panNumber = "PAN number must be numeric";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for the field being edited
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      const result = await axios.post("http://localhost:5000/api/hostelregister", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (result.status === 200 || result.status === 201) {
        setMessage("Registration successful!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          hostelName: "",
          panNumber: "",
        });
        setErrors({});
      } else {
        setMessage(result.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error: Unable to connect to the server.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#E8F8F5] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#a7e8dc] flex flex-col md:flex-row items-center mx-auto rounded-lg overflow-hidden shadow-lg">
        <div className="flex justify-center items-center w-full md:w-1/2 h-full p-4">
          <img
            src="https://i.pinimg.com/564x/39/72/41/397241b7a954983c13e5504203513ecf.jpg"
            className="w-auto h-auto max-w-full max-h-full rounded-lg"
            alt="Hostel room"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 bg-[#a7e8dc] rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#2C3E50] font-[Poppins]">
            Register your Hostel
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="w-full">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="hostelName"
                placeholder="Hostel name"
                value={formData.hostelName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
              {errors.hostelName && (
                <p className="text-red-500 text-sm">{errors.hostelName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="panNumber"
                placeholder="PAN number of your hostel"
                value={formData.panNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
              {errors.panNumber && (
                <p className="text-red-500 text-sm">{errors.panNumber}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#2C3E50] text-white py-2 rounded-md hover:bg-[#1A2D41] transition duration-200"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HostelRegister;
