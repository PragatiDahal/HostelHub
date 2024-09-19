import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseconfig"; // Import the initialized auth from your config file
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const UserSignUp = () => {
  // State to hold form data and error messages
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Validate form fields
  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
  
    if (!formData.firstName.trim()) tempErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) tempErrors.lastName = "Last name is required.";
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email format.";
    }
    if (!formData.phone) {
      tempErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = "Phone number should be 10 digits.";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long.";
    }
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }
  
    setErrors(tempErrors);
    // Return true if no errors
    return Object.keys(tempErrors).length === 0;
  };
  

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
  
    if (validate()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("User created successfully:", userCredential.user);
  
        // Send email verification after user creation
        await sendEmailVerification(userCredential.user);
        console.log("Verification email sent.");
  
        // Redirect to another page or show a success message
      } catch (error) {
        setServerError(error.message);
        console.error("Error creating user:", error);
      }
    }
  };
  

  // After user is successfully created
  useEffect(() => {
    const sendVerificationEmail = async () => {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        console.log("Verification email sent.");
      }
    };
    sendVerificationEmail();
  }, []); // Empty dependency array means it runs once after initial render

  // Google Sign-In Function
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google Sign-In Successful", result.user);
      })
      .catch((error) => {
        console.error("Google Sign-In Error", error);
      });
  };
  
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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50] font-[poppins]"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
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

export default UserSignUp;
