import React from "react";
import { useParams } from 'react-router-dom';
import { FaWifi, FaBed, FaTable } from "react-icons/fa";
import { GiWashingMachine } from 'react-icons/gi';
const roomDetails = [
  {
    id: 1,
    images: [
      "/images/singleroom.webp",
      "/images/singleroom.webp",
      "/images/singleroom.webp",
    ],
    features: [
      {
        title: "Free WiFi",
        icon: <FaWifi className="text-[#E67E22] text-4xl" />,
      },
      {
        title: "Single Bed",
        icon: <FaBed className="text-[#E67E22] text-4xl" />,
      },
      {
        title: "Laundry Service",
        icon: <GiWashingMachine className="text-[#E67E22] text-4xl" />,
      },
      {
        title: "Study Table",
        icon: <FaTable className="text-[#E67E22] text-4xl" />,
      },
    ],
  },
  {
    id: 2,
    images: [
      "/images/doublesharing.jpg",
      "/images/doublesharing.jpg",
      "/images/doublesharing.jpg",
    ],
    features: [
      {
        title: "Free WiFi",
        icon: <FaWifi className="text-[#E67E22] text-4xl" />,
      },
      {
        title: "Double Bed",
        icon: <FaBed className="text-[#E67E22] text-4xl" />,
      },
      {
        title: "Laundry Service",
        icon: <GiWashingMachine className="text-[#E67E22] text-4xl" />,
      },
      {
        title: "Two Study Tables",
        icon: <FaTable className="text-[#E67E22] text-4xl" />,
      },
    ],
  },
  {
    id: 3,
    images: [
      "/images/triplesharing.jpg",
      "/images/triplesharing.jpg",
      "/images/triplesharing.jpg",
    ],
    features: [
      {
        title: "Free WiFi",
        icon: <FaWifi className="text-[#E67E22] text-4xl" />,
      },
      {
        title: "Triple Bed",
        icon: <FaBed className="text-[#E67E22] text-4xl" />,
      },
      {
        title: "Laundry Service",
        icon: <GiWashingMachine className="text-[#E67E22] text-4xl" />,
      },
      {
        title: "Three Study Tables",
        icon: <FaTable className="text-[#E67E22] text-4xl" />,
      },
    ],
  },
];

const Roomdetails = () => {
  const { id } = useParams();
  const detail = roomDetails.find((room) => room.id === parseInt(id));

  if (!detail) {
    return <p>Details not found!</p>;
  }

  return (
    <div className="bg-[#E8F8F5] py-12 px-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <img
          src={detail.images[0]}
          alt="Room Image 1"
          className="rounded-lg shadow-md w-full"
        />
        <div className="grid grid-cols-2 gap-4">
          <img
            src={detail.images[1]}
            alt="Room Image 2"
            className="rounded-lg shadow-md w-full"
          />
          <img
            src={detail.images[2]}
            alt="Room Image 3"
            className="rounded-lg shadow-md w-full"
          />
        </div>
      </div>
      <div className="bg-[#2C3E50] py-6 px-6 rounded-lg shadow-md grid grid-cols-2 sm:grid-cols-5 text-center text-white">
        {detail.features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div>{feature.icon}</div>
            <p className="font-semibold text-sm">{feature.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roomdetails;
