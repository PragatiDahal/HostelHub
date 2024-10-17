import React from 'react';
import { Link } from 'react-router-dom';

const HostelCard = ({ hostel }) => {
  // Ensure hostel is defined before using its properties
  if (!hostel) {
    return <p>Loading...</p>;
  }

  // Ensure the image path is relative to the 'public' folder
  const imagePath = `/images/${hostel.image}`;

  // Create a dynamic link based on hostel name, formatted to remove spaces (for example: /hostels/abc-hostel)
  const hostelLink = `/hostels/${hostel.name?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Render the image using the constructed imagePath */}
      <img className="w-full h-48 object-cover rounded-lg" src={imagePath} alt={hostel.name} />
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold font-[poppins] text-[#2C3E50]">{hostel.name}</h3>
        <p className="text-sm text-[#2C3E50] font-[poppins] mt-1">{hostel.location}</p>
        <p className="text-sm text-[#2C3E50] font-[poppins] mt-1">Price: NPR {hostel.price}/month</p>
        <p className="text-sm text-[#2C3E50] font-[poppins] mt-1">{hostel.description}</p>

        {/* Facilities */}
        <div className="flex items-center justify-start mt-4 space-x-2 text-sm font-[poppins] text-[#2C3E50]">
          {hostel.facilities?.map((facility, index) => (
            <span key={index} className="bg-[#E8F8F5] p-1 rounded">{facility}</span>
          )) || <p>No facilities available</p>}
        </div>

        {/* Rating */}
        <div className="mt-4">
          <p className="text-sm font-[poppins] text-[#2C3E50]">Rating:</p>
          <span className="text-[#E67E22]">{hostel.rating}</span>
        </div>

        {/* Dynamic Button */}
        <div className="mt-4">
          <Link to={hostelLink}>
            <button className="bg-[#1ABC9C] text-white py-2 px-4 rounded-md w-full font-[poppins] hover:bg-[#16a085] duration-200">
              View {hostel.name}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
