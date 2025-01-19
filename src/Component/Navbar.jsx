// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useAuth } from "./Contexts/AuthContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState(false); // State for logout message
  const { isLoggedIn, logout } = useAuth() || {}; // Safely destructure

  const Links = [
    { id: 1, link: "home" },
    { id: 2, link: "hostels" },
    { id: 3, link: "filteredhostel" },
    { id: 4, link: "about" },
    { id: 5, link: "contact" },
    { id: 6, link: "blog" },
  ];

  const handleSigninClick = () => {
    setDropdown(!dropdown); // Toggle the dropdown on click
  };

  const handleLogout = () => {
    logout();
    setDropdown(false);
    setLogoutMessage(true); // Show logout message
    setTimeout(() => setLogoutMessage(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className="bg-[#2C3E50] text-white flex justify-between items-center w-full h-16 fixed top-0 left-0">
      {/* Logo */}
      <h1 className="text-3xl font-bold font-[poppins] px-4 mx-4">
        Hostel <span className="text-[#1ABC9C]">Hub</span>
      </h1>

      {/* Main Links */}
      <ul className="hidden md:flex space-x-4">
        {Links.map(({ id, link }) => (
          <li
            key={id}
            className="px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-[#1ABC9C] duration-200 font-[poppins]"
          >
            <Link to={link}>{link}</Link>
          </li>
        ))}

        {/* Dropdown */}
        <li
          className="relative px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-[#1ABC9C] duration-200 font-[poppins]"
          onClick={handleSigninClick}
        >
          <div className="flex items-center space-x-2">
            <FaUser size={20} />
            <span>Signin</span>
          </div>

          {dropdown && (
            <ul className="absolute top-10 left-0 w-40 bg-[#1ABC9C] text-white rounded-lg shadow-lg">
              {isLoggedIn ? (
                <>
                  <li className="px-4 py-2 hover:bg-[#2C3E50]">
                    <Link to="/profile" onClick={() => setDropdown(false)}>
                      User Profile
                    </Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-[#2C3E50]"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </>
              ) : (
                <>
                  <li className="px-4 py-2 hover:bg-[#2C3E50]">
                    <Link to="/usersignin" onClick={() => setDropdown(false)}>
                      User Login
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-[#2C3E50]">
                    <Link
                      to="/hostelregister"
                      onClick={() => setDropdown(false)}
                    >
                      Hostel Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </li>
      </ul>

      {/* Logout Message */}
      {logoutMessage && (
        <div className="absolute top-20 right-10 bg-[#1ABC9C] text-white px-4 py-2 rounded-lg shadow-lg">
          You have logged out successfully!
        </div>
      )}

      {/* Mobile Menu Toggle */}
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-white md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Menu */}
      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-[#2C3E50] text-white font-[poppins]">
          {Links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl hover:text-[#1ABC9C] font-[poppins]"
            >
              <Link onClick={() => setNav(false)} to={link}>
                {link}
              </Link>
            </li>
          ))}

          {/* Mobile Dropdown */}
          <li
            className="px-4 cursor-pointer capitalize py-6 text-4xl hover:text-[#1ABC9C] font-[poppins]"
            onClick={handleSigninClick}
          >
            <div className="flex items-center justify-center space-x-1">
              <FaUser size={30} />
              <span>Signin</span>
            </div>

            {dropdown && (
              <ul className="w-full mt-4 text-center">
                {isLoggedIn ? (
                  <>
                    <li className="px-4 py-2 hover:text-[#1ABC9C]">
                      <Link
                        to="/profile"
                        onClick={() => {
                          setNav(false);
                          setDropdown(false);
                        }}
                      >
                        User Profile
                      </Link>
                    </li>
                    <li
                      className="px-4 py-2 hover:text-[#1ABC9C]"
                      onClick={() => {
                        handleLogout();
                        setNav(false);
                      }}
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <>
                    <li className="px-4 py-2 hover:text-[#1ABC9C]">
                      <Link
                        to="/usersignin"
                        onClick={() => {
                          setNav(false);
                          setDropdown(false);
                        }}
                      >
                        User Login
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:text-[#1ABC9C]">
                      <Link
                        to="/hostelregister"
                        onClick={() => {
                          setNav(false);
                          setDropdown(false);
                        }}
                      >
                        Hostel Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
