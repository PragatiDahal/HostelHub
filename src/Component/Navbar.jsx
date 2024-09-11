import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const Links = [
    { id: 1, link: "home" },
    { id: 2, link: "hostels" },
    { id: 3, link: "about" },
    { id: 4, link: "contact" },
    { id: 5, link: "login", icon: <FaUser size={20} /> },
  ];

  return (
    <div className="bg-[#2C3E50] text-white flex justify-between items-center w-full h-16 fixed top-0 left-0">
      <h1 className="text-3xl font-bold font-[poppins] px-4 mx-4">
        Hostel <span className="text-[#1ABC9C]">Hub</span>
      </h1>

      <ul className="hidden md:flex space-x-4">
        {Links.map(({ id, link, icon }) => (
          <li
            key={id}
            className="px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-[#1ABC9C] duration-200 font-[poppins]"
          >
            <Link to={link}>{icon || link}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-white md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

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
        </ul>
      )}
    </div>
  );
};

export default Navbar;
