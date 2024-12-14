import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaWifi, FaBed, FaTable } from "react-icons/fa";
import { GiWashingMachine } from "react-icons/gi";

// Sample Data for Multiple Hostels
const hostelsData = {
  "laxmi-girls-hostel": [
    {
      id: 1,
      roomType: "single",
      images: ["/images/room.jpg", "/images/singleroom.webp"],
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
      roomType: "double",
      images: ["/images/room1.jpg", "/images/doublesharing.jpg"],
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
      roomType: "triple",
      images: ["/images/triplesharing.jpg", "/images/triplesharing.jpg"],
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
  ],

  "paradise-girls-hostel": [
    {
      id: 1,
      roomType: "single",
      images: ["/images/singleroom.webp", "/images/singleroom.webp"],
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
      roomType: "double",
      images: ["/images/doublesharing.jpg", "/images/doublesharing.jpg"],
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
      roomType: "triple",
      images: ["/images/triplesharing.jpg", "/images/triplesharing.jpg"],
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
  ],

  "harmony-girls-hostel": [
    {
      id: 1,
      roomType: "single",
      images: ["/images/singleroom.webp", "/images/singleroom.webp"],
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
      roomType: "double",
      images: ["/images/doublesharing.jpg", "/images/doublesharing.jpg"],
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
      roomType: "triple",
      images: ["/images/triplesharing.jpg", "/images/triplesharing.jpg"],
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
  ],

  "sanvi-girls-hostel": [
    {
      id: 1,
      roomType: "single",
      images: ["/images/singleroom.webp", "/images/singleroom.webp"],
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
      roomType: "double",
      images: ["/images/doublesharing.jpg", "/images/doublesharing.jpg"],
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
      roomType: "triple",
      images: ["/images/triplesharing.jpg", "/images/triplesharing.jpg"],
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
  ],

  "birat-girls-hostel": [
    {
      id: 1,
      roomType: "single",
      images: ["/images/singleroom.webp", "/images/singleroom.webp"],
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
      roomType: "double",
      images: ["/images/doublesharing.jpg", "/images/doublesharing.jpg"],
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
      roomType: "triple",
      images: ["/images/triplesharing.jpg", "/images/triplesharing.jpg"],
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
  ],

  "college-girls-hostel": [
    {
      id: 1,
      roomType: "single",
      images: ["/images/singleroom.webp", "/images/singleroom.webp"],
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
      roomType: "double",
      images: ["/images/doublesharing.jpg", "/images/doublesharing.jpg"],
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
      roomType: "triple",
      images: ["/images/triplesharing.jpg", "/images/triplesharing.jpg"],
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
  ],
  // kathamndu girls hosltels
  "radiant-girls-hostel": [
    {
      id: 1,
      roomType: "single",
      images: ["/images/singleroom.webp", "/images/singleroom.webp"],
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
      roomType: "double",
      images: ["/images/doublesharing.jpg", "/images/doublesharing.jpg"],
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
      roomType: "triple",
      images: ["/images/triplesharing.jpg", "/images/triplesharing.jpg"],
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
  ],

  "peaceful-girls-hostel": [
    {
      id: 1,
      roomType: "single",
      images: ["/images/singleroom.webp", "/images/singleroom.webp"],
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
      roomType: "double",
      images: ["/images/doublesharing.jpg", "/images/doublesharing.jpg"],
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
      roomType: "triple",
      images: ["/images/triplesharing.jpg", "/images/triplesharing.jpg"],
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
  ],

  "happy-home-girls-hostel": [
    {
      id: 1,
      roomType: "single",
      images: ["/images/singleroom.webp", "/images/singleroom.webp"],
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
      roomType: "double",
      images: ["/images/doublesharing.jpg", "/images/doublesharing.jpg"],
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
      roomType: "triple",
      images: ["/images/triplesharing.jpg", "/images/triplesharing.jpg"],
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
  ],

  "best-girls-hostel": [
    {
      id: 1,
      roomType: "single",
      images: ["/images/singleroom.webp", "/images/singleroom.webp"],
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
      roomType: "double",
      images: ["/images/doublesharing.jpg", "/images/doublesharing.jpg"],
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
      roomType: "triple",
      images: ["/images/triplesharing.jpg", "/images/triplesharing.jpg"],
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
  ],

  "comfort-girls-hostel": [
    {
      id: 1,
      roomType: "single",
      images: ["/images/singleroom.webp", "/images/singleroom.webp"],
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
      roomType: "double",
      images: ["/images/doublesharing.jpg", "/images/doublesharing.jpg"],
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
      roomType: "triple",
      images: ["/images/triplesharing.jpg", "/images/triplesharing.jpg"],
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
  ],

  "biju-girls-hostel": [
    {
      id: 1,
      roomType: "single",
      images: ["/images/singleroom.webp", "/images/singleroom.webp"],
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
      roomType: "double",
      images: ["/images/doublesharing.jpg", "/images/doublesharing.jpg"],
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
      roomType: "triple",
      images: ["/images/triplesharing.jpg", "/images/triplesharing.jpg"],
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
  ],
};

const Roomdetails = () => {
  const navigate = useNavigate();
  const { hostelName, roomType } = useParams();

  // Normalize hostel name to lowercase for consistent lookup
  const hostelRooms = hostelsData[hostelName.toLowerCase()];
  console.log(
    "Hostel Name:",
    hostelName,
    "Room Type:",
    roomType,
    "Rooms:",
    hostelRooms
  );

  // Find the room details based on the room type
  const detail = hostelRooms?.find((room) => room.roomType === roomType);

  if (!detail) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-700 font-[poppins]">Oops! Room details not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400]"
        >
          Go Back
        </button>
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-[#E8F8F5] py-12 px-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-8 pt-12 font-[poppins]">
        Details for {roomType} Room at {hostelName.replace("-", " ")}
      </h1>
      <Slider {...sliderSettings} className="mb-8">
        {detail.images.map((img, index) => (
          <div
            key={index}
            className="flex justify-center items-center h-[400px]" // Centers content both horizontally and vertically
          >
            <img
              src={img}
              alt={`Room Image ${index + 1}`}
              className="rounded-lg shadow-md max-h-full w-full object-contain" // Ensures the image is fully visible and doesn't overflow
            />
          </div>
        ))}
      </Slider>

      <div className="bg-[#2C3E50] py-6 px-6 rounded-lg shadow-md grid grid-cols-2 sm:grid-cols-5 text-center text-white font-[poppins]">
        {detail.features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div>{feature.icon}</div>
            <p className="font-semibold text-sm font-[poppins]">{feature.title}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-[#2C3E50] text-white rounded-lg hover:bg-[#34495E] font-[poppins]"
        >
          Back to Rooms
        </button>
      </div>
    </div>
  );
};

export default Roomdetails;
