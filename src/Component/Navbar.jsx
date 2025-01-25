// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useAuth } from "./Contexts/AuthContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState(false); // Logout message state
  const { isLoggedIn, user, logout } = useAuth() || {}; // Auth context values

  const Links = [
    { id: 1, link: "home" },
    { id: 2, link: "hostels" },
    { id: 3, link: "filteredhostel" },
    { id: 4, link: "about" },
    { id: 5, link: "contact" },
    { id: 6, link: "blog" },
  ];

  const handleLogout = () => {
    logout();
    setDropdown(false);
    setLogoutMessage(true); // Show logout message
    setTimeout(() => setLogoutMessage(false), 3000); // Hide after 3 seconds
  };

  const handleDropdown = () => setDropdown(!dropdown); // Toggle dropdown

  return (
    <div className="bg-[#2C3E50] text-white flex justify-between items-center w-full h-16 fixed top-0 left-0 z-50">
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

        {/* Profile or Sign In */}
        <li className="relative px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-[#1ABC9C] duration-200 font-[poppins]">
          {isLoggedIn ? (
            <div
              className="flex items-center space-x-2"
              onClick={handleDropdown}
            >
              {/* Show user profile icon */}
              <FaUserCircle size={24} />
              {/* <span>{user?.name || "User"}</span> */}

              {/* Dropdown Menu */}
              {dropdown && (
                <ul className="absolute top-10 left-0 w-40 bg-[#1ABC9C] text-white rounded-lg shadow-lg">
                  {/* <li className="px-4 py-2 hover:bg-[#2C3E50]">
                    <Link to="/profile" onClick={() => setDropdown(false)}>
                      User Profile
                    </Link>
                  </li> */}
                  <li
                    className="px-4 py-2 hover:bg-[#2C3E50]"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div onClick={handleDropdown}>
              <div className="flex items-center space-x-2">
                <FaUserCircle size={20} />
                <span>Sign In</span>
              </div>
              {dropdown && (
                <ul className="absolute top-10 left-0 w-40 bg-[#1ABC9C] text-white rounded-lg shadow-lg">
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
                </ul>
              )}
            </div>
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

          {/* Profile or Sign In */}
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl hover:text-[#1ABC9C] font-[poppins]">
            {isLoggedIn ? (
              <div
                onClick={handleDropdown}
                className="flex flex-col items-center"
              >
                <FaUserCircle size={40} />
                {/* <span>{user?.name || "User"}</span> */}

                {dropdown && (
                  <ul className="w-full mt-4 text-center">
                    {/* <li className="px-4 py-2 hover:text-[#1ABC9C]">
                      <Link to="/profile" onClick={() => setNav(false)}>
                        User Profile
                      </Link>
                    </li> */}
                    <li
                      className="px-4 py-2 hover:text-[#1ABC9C]"
                      onClick={() => {
                        handleLogout();
                        setNav(false);
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div onClick={() => setNav(false)}>
                <Link to="/usersignin">Sign In</Link>
              </div>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;