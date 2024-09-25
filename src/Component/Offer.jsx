import React from 'react';
import { FaShoppingCart, FaWifi,FaCar } from 'react-icons/fa';
import { GiWashingMachine } from "react-icons/gi";
import { MdCancel } from 'react-icons/md';

const Offer = () => {
  const features = [
    {
      id: 1,
      title: '20% off groceries',
      description: 'Get 20% off your grocery shopping from popular stores like Big Mart, ensuring you have everything you need at unbeatable prices.',
      icon: <FaShoppingCart size={40} />,
    },
    {
      id: 2,
      title: '25% off high-speed internet',
      description: 'Stay online effortlessly with a 25% discount on high-speed internet from World Link, perfect for work, study, or entertainment.',
      icon: <FaWifi size={40} />,
    },
    {
      id: 3,
      title: '15% off laundry services',
      description: 'Save 15% on laundry services, so you can focus on enjoying your stay without worrying about laundry chores.',
      icon: <GiWashingMachine size={40} />,
    },
    {
      id: 4,
      title: '10% off transportation deals',
      description: 'Get around easily with a 10% discount on rides from Indrive. Whether you’re commuting or exploring the city, we’ve got your transport covered!',
      icon: <FaCar size={40} />,
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
