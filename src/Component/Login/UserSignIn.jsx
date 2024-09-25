import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig'; // Import the initialized auth from your config

const UserSignIn = () => {
  // State to hold form data and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Sign in the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);

      // Redirect to a different page after successful login
      navigate("/home");
    } catch (error) {
      setError("Failed to sign in. Please check your email and password.");
      console.error("Sign-in error:", error);
    }
  };

  return (
    <>
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
            <h2 className="text-3xl font-bold text-[#2C3E50] text-center">Sign In</h2>
            
            {/* Display error message if any */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            
            <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[#2C3E50] font-medium mb-2">Email*</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-[#2C3E50] font-medium mb-2">Password*</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  Login
                </button>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-[#2C3E50]">
                  Don't have an account?{" "}
                  <Link to="/usersignup" className="text-[#E67E22] hover:underline">
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
}

export default UserSignIn;
