import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const Links = [
    { id: 1, link: "home" },
    { id: 2, link: "hostels" },
    { id: 3, link: "about" },
    { id: 4, link: "contact" },
    { id: 5, link: "blog" },
  ];

  const handleSigninClick = () => {
    setDropdown(!dropdown); // Toggle the dropdown on click
  };

  return (
    <div className="bg-[#2C3E50] text-white flex justify-between items-center w-full h-16 fixed top-0 left-0">
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

        {/* Dropdown for Signin */}
        <li
          className="relative px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-[#1ABC9C] duration-200 font-[poppins]"
          onClick={handleSigninClick} // Toggle dropdown on click
        >
          <div className="flex items-center space-x-2">
            <FaUser size={20} />
            <span>Signin</span>
          </div>

          {/* Dropdown menu */}
          {dropdown && (
            <ul className="absolute top-10 left-0 w-40 bg-[#1ABC9C] text-white rounded-lg shadow-lg">
              <li className="px-4 py-2 hover:bg-[#2C3E50]">
                <Link to="/usersignin" onClick={() => setDropdown(false)}>User Login</Link>
              </li>
              <li className="px-4 py-2 hover:bg-[#2C3E50]">
                <Link to="/hostelregister" onClick={() => setDropdown(false)}>Hostel Register</Link>
              </li>
              <li className="px-4 py-2 hover:bg-[#2C3E50]">
                <Link to="/adminsignin" onClick={() => setDropdown(false)}>Admin Login</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>

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
              <Link onClick={() => setNav(!nav)} to={link}>
                {link}
              </Link>
            </li>
          ))}

          {/* Signin Dropdown for Mobile */}
          <li
            className="px-4 cursor-pointer capitalize py-6 text-4xl hover:text-[#1ABC9C] font-[poppins]"
            onClick={handleSigninClick} // Toggle dropdown on click
          >
            <div className="flex items-center justify-center space-x-1">
              <FaUser size={30} />
              <span>Signin</span>
            </div>

            {dropdown && (
              <ul className="w-full mt-4 text-center">
                <li className="px-4 py-2 hover:text-[#1ABC9C]">
                  <Link to="/usersignin" onClick={() => { setNav(false); setDropdown(false); }}>
                    User Login
                  </Link>
                </li>
                <li className="px-4 py-2 hover:text-[#1ABC9C]">
                  <Link to="/hostelregister" onClick={() => { setNav(false); setDropdown(false); }}>
                    Hostel Register
                  </Link>
                </li>
                <li className="px-4 py-2 hover:text-[#1ABC9C]">
                  <Link to="/adminsignin" onClick={() => { setNav(false); setDropdown(false); }}>
                    Admin Login
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
