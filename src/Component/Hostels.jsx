import React, { useState, useEffect } from "react";
import HostelCard from "./Hostels/HostelCard";
import axios from "axios"; // Import axios for API requests

const Hostels = () => {
    // State to store hostels
  const [hostels, setHostels] = useState([]);
  const [searchData, setSearchData] = useState({
    location: "",
    gender: "",
    minPrice: "",
    maxPrice: "",
  });

  // Fetch hostels data from the Express API with search filters
  const fetchHostels = async (searchParams) => {
    try {
      // Remove any empty or null values from searchParams
      const filteredParams = Object.fromEntries(
        Object.entries(searchParams).filter(([key, value]) => value)
      );

      const response = await axios.get("http://localhost:5000/api/hostels", {
        params: filteredParams, // Send only non-empty search parameters
      });

      setHostels(response.data);
    } catch (error) {
      console.error(
        "Error fetching hostels:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Fetch hostels whenever search data changes
  useEffect(() => {
    fetchHostels(searchData); // Call the function using searchData
  }, [searchData]); // Trigger useEffect whenever searchData changes

  // Handle input changes for the search form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSearchData({
      ...searchData,
      [name]: name.includes("Price") && value !== "" ? Number(value) : value, // Convert price values to numbers only when not empty
    });
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchHostels(searchData);
  };

  return (
    <>
      <div className="bg-[#E8F8F5] pt-12 px-4">
        {/* Search Bar */}
        <div className="flex justify-center mb-8 pt-12">
          <form
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-white shadow-md p-4 sm:rounded-full"
            onSubmit={handleSearch} // Trigger search on form submission
          >
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={searchData.location}
              onChange={handleInputChange}
              className="outline-none px-4 py-2 border border-[#E67E22] rounded-full w-full sm:w-auto font-[poppins]"
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender specific"
              value={searchData.gender}
              onChange={handleInputChange}
              className="outline-none px-4 py-2 border border-[#E67E22] rounded-full w-full sm:w-auto font-[poppins]"
            />
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={searchData.minPrice}
              onChange={handleInputChange}
              className="outline-none px-4 py-2 border border-[#E67E22] rounded-full w-full sm:w-auto font-[poppins]"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={searchData.maxPrice}
              onChange={handleInputChange}
              className="outline-none px-4 py-2 border border-[#E67E22] rounded-full w-full sm:w-auto font-[poppins]"
            />
            <button
              type="submit"
              className="bg-[#1ABC9C] text-white px-4 py-2 rounded-full w-full sm:w-auto font-[poppins]"
            >
              Search
            </button>
          </form>
        </div>

        {/* hostels */}
        <div className="text-center mb-6">
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {hostels && hostels.length > 0 ? (
            hostels.map((hostel, index) => (
              <HostelCard key={index} hostel={hostel} />
            ))
          ) : (
            <p>No hostels found.</p>
          )}
        </div>

        {/* View More Button */}
        <div className="flex justify-center pb-6">
          <button className="bg-[#1ABC9C] text-white px-6 py-2  rounded-full font-[poppins]">
            View more
          </button>
        </div>
      </div>
    </>
  );
};

export default Hostels