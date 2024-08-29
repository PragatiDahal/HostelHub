import React from 'react';
import { FaSearch, FaStar } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdCancel } from 'react-icons/md';

const Offer = () => {
  const features = [
    {
      id: 1,
      title: 'Search and Booking',
      description: 'lorem Epsum lorem Epsum Akrith lorem',
      icon: <FaSearch size={40} />,
    },
    {
      id: 2,
      title: 'Review and Ratings',
      description: 'lorem Epsum lorem Epsum Akrith lorem',
      icon: <FaStar size={40} />,
    },
    {
      id: 3,
      title: 'Map Integration',
      description: 'lorem Epsum lorem Epsum Akrith lorem',
      icon: <FaLocationDot size={40} />,
    },
    {
      id: 4,
      title: 'Cancellation Policy',
      description: 'lorem Epsum lorem Epsum Akrith lorem',
      icon: <MdCancel size={40} />,
    },
  ];

  return (
    <div className="bg-[#E8F8F5] pt-12 pb-16">
      <div className="font-bold font-[poppins] text-[#2C3E50] text-center text-4xl mb-8">What we offer?</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 text-center">
        {features.map(({ id, title, description, icon }) => (
          <div
            key={id}
            className="bg-[#2C3E50] rounded-lg shadow-md p-6 flex flex-col items-center"
          >
            <div className="mb-4 text-[#E67E22]">{icon}</div>
            <h3 className="font-semibold text-lg font-[poppins] text-white mb-2">{title}</h3>
            <p className="text-white font-[poppins]">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
