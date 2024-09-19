import React from 'react'
import { Link } from 'react-router-dom';
const HostelCard = ({ hostel }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <img className="w-full rounded-lg" src={hostel.image} alt={hostel.name} />
        <div className="mt-4">
          <h3 className="text-lg font-semibold font-[poppins] text-[#2C3E50]">{hostel.name}</h3>
          <p className="text-[#2C3E50] font-[poppins]">{hostel.description}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2 text-sm font-[poppins] text-[#2C3E50]">
              {hostel.features.map((feature, index) => (
                <span key={index}>{feature}</span>
              ))}
            </div>
            <div>
              <p className="text-sm font-[poppins] text-[#2C3E50]">Ratings:</p>
              <span className="text-[#E67E22]">{hostel.ratings}</span>
            </div>
          </div>
          <div className="mt-4">
            <Link to ="/hostel1">
          <button className="bg-[#1ABC9C] text-white py-2 px-4 rounded-md w-full font-[poppins] hover:bg-[#16a085] duration-200">View Hostel</button>
          </Link>
        </div>
        </div>
      </div>
    );
  };

export default HostelCard;