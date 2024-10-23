import React, { useState } from "react";
import reviewImage from '../../assets/bug2.png'; // Import your image here

const HostelDetail = ({ hostel }) => {
  const [selectedRoom, setSelectedRoom] = useState("single");
  const [activeTab, setActiveTab] = useState("gallery");

  const mockHostel = {
    name: "Sunrise Boys Hostel",
    location: "Balkumari, Lalitpur",
    description: "This is a cozy hostel located in the heart of the city, offering clean rooms and excellent facilities for students.",
    rooms: {
      single: {
        description: "Single room description...",
        price: 5000,
        image: "single-room.jpg",
      },
      double: {
        description: "Double sharing room description...",
        price: 7000,
        image: "double-room.jpg",
      },
      triple: {
        description: "Triple sharing room description...",
        price: 9000,
        image: "triple-room.jpg",
      },
    },
    facilities: ["Wifi", "Laundry", "Security", "Shared Kitchen"],
    gallery: ["gallery1.jpg", "gallery2.jpg"],
    reviews: [
      { user: "John Doe", comment: "Great place!", rating: 5 },
      { user: "Jane Doe", comment: "Nice and clean", rating: 4 },
    ],
    contact: {
      phone: "1234567890",
      email: "contact@sunrisehostel.com",
    },
    hlocation: {
      address: "Balkumari, Lalitpur",
      mapLink: "https://maps.example.com",
    },
  };

  const {
    name,
    description,
    rooms,
    gallery,
    reviews,
    facilities,
    contact,
    hlocation,
  } = mockHostel;

  return (
    <div className="container mx-auto p-6 bg-[#E8F8F5]">
      {/* Hostel Image */}
      <div className="flex justify-center">
        <img
          src={`/images/${rooms[selectedRoom].image}`}
          alt={`${name} ${selectedRoom} room`}
          className="w-3/4 h-64 object-cover rounded-lg shadow-lg pt-12"
        />
      </div>

      {/* Room Types */}
      <div className="flex justify-center mt-4 space-x-10">
        {Object.keys(rooms).map((roomType) => (
          <button
            key={roomType}
            onClick={() => setSelectedRoom(roomType)}
            className={`text-lg font-semibold ${
              selectedRoom === roomType
                ? "text-black border-b-2 border-[#1ABC9C]"
                : "text-gray-500"
            } hover:text-black`}
          >
            {roomType.charAt(0).toUpperCase() + roomType.slice(1)} room
          </button>
        ))}
      </div>

      {/* Room Details */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">
          {selectedRoom.charAt(0).toUpperCase() + selectedRoom.slice(1)} Room Details
        </h2>
        <p className="text-gray-700 mt-4">{rooms[selectedRoom].description}</p>
        <p className="text-gray-700 mt-4">Price: NPR {rooms[selectedRoom].price}/month</p>
      </div>

      {/* Tabs */}
      <div className="w-full bg-white shadow-lg rounded-lg">
        <div className="flex justify-around border-b-2 border-gray-200">
          {['gallery', 'reviews', 'facilities', 'about', 'contact', 'events'].map(tab => (
            <button
              key={tab}
              className={`py-4 w-1/3 text-center text-[#2C3E50] ${activeTab === tab ? "border-b-4 border-[#1ABC9C] font-bold" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-2 gap-4">
              {gallery.map((image, index) => (
                <img key={index} src={`/images/${image}`} alt={`Gallery ${index}`} className="w-full h-auto rounded-md" />
              ))}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <img src={reviewImage} alt="Reviewer" className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="font-semibold text-[#2C3E50]">{review.user}</h3>
                    <p className="text-[#2C3E50]">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Facilities Tab */}
          {activeTab === "facilities" && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-[#2C3E50]">Facilities</h3>
              <ul className="list-disc pl-5 text-[#2C3E50]">
                {facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-[#2C3E50]">About the Hostel</h3>
              <p className="text-[#2C3E50]">{description}</p>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-[#2C3E50]">Contact Information</h3>
              <p className="text-[#2C3E50]"><strong>Phone:</strong> {contact.phone}</p>
              <p className="text-[#2C3E50]"><strong>Email:</strong> {contact.email}</p>
              <p className="text-[#2C3E50]"><strong>Address:</strong> {hlocation.address}</p>
              <a
                href={hlocation.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1ABC9C] hover:underline"
              >
                View on Google Maps
              </a>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-[#2C3E50]">Upcoming Events</h3>
              <ul className="list-disc pl-5 text-[#2C3E50]">
                <li>Hostel Game Night - Friday, 8 PM</li>
                <li>Cooking Workshop - Saturday, 10 AM</li>
                <li>Cultural Exchange Meetup - Sunday, 6 PM</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelDetail;
