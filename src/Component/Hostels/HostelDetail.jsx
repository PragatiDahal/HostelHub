import React, { useState } from "react";
import reviewImage from '../../assets/bug2.png'; // Import your image here

const HostelDetail = () => {
  const [activeTab, setActiveTab] = useState("facilities");

  const hostelData = {
    name: "ABC Hostel",
    about:
      "ABC is located in the heart of Koteshwor. It is the perfect choice for those seeking comfort and harmony in their living environment. Our hostel offers a welcoming atmosphere, designed to provide a home-like feel while ensuring a peaceful stay. Conveniently situated within 2 km of colleges, schools, and libraries, ABC Hostel is an excellent option for students and professionals alike. With four different types of bedrooms, we offer flexible pricing based on your room selection, allowing you to choose the accommodation that best fits your needs and budget.",
    rooms: {
      single: {
        description: "A cozy single room with all the essential amenities.",
        price: "5000 NPR",
        image: "/path-to-image-single.jpg", // replace with actual path
      },
      double: {
        description: "Spacious double sharing room perfect for students.",
        price: "7000 NPR",
        image: "/path-to-image-double.jpg", // replace with actual path
      },
      triple: {
        description: "Affordable triple sharing room with great comfort.",
        price: "9000 NPR",
        image: "/path-to-image-triple.jpg", // replace with actual path
      },
    },
    location: {
      address: "Koteshwor, Kathmandu",
      mapLink: "https://maps.google.com", // replace with actual map link
    },
  };

  const tabs = ["facilities", "gallery", "review", "events", "contact"];

  return (
    <div className="mx-auto p-6 bg-[#E8F8F5]">
      {/* Hostel Image */}
      <div className="flex justify-center">
        <img
          src="/path-to-hostel-image.jpg" // replace with actual hostel image path
          alt="Hostel Image"
          className="w-3/4 h-64 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* About Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-[#2C3E50]">{hostelData.name}</h2>
        <p className="mt-4 text-gray-700">{hostelData.about}</p>
      </div>

      {/* Rooms Section */}
      <div className="mt-8">
        {Object.keys(hostelData.rooms).map((roomType) => (
          <div key={roomType} className="mb-8">
            <h3 className="text-lg font-semibold text-[#2C3E50] capitalize">
              {roomType} room
            </h3>
            <div className="flex mt-4">
              <img
                src={hostelData.rooms[roomType].image}
                alt={`${roomType} room`}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="ml-4">
                <p className="text-gray-700">
                  {hostelData.rooms[roomType].description}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Price:</strong> {hostelData.rooms[roomType].price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Section */}
      <div className="w-full mt-10 bg-white shadow-lg rounded-lg">
        <div className="flex justify-around border-b-2 border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`py-4 w-1/4 text-center text-[#2C3E50] ${
                activeTab === tab ? "border-b-4 border-[#1ABC9C] font-bold" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Facilities Tab */}
          {activeTab === "facilities" && (
            <div>
              <h3 className="font-bold text-lg text-[#2C3E50]">Facilities</h3>
              <ul className="list-disc pl-5 text-[#2C3E50]">
                <li>Free Wifi</li>
                <li>Laundry Service</li>
                <li>24/7 Security</li>
                <li>Shared Kitchen</li>
              </ul>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/path-to-gallery-image1.jpg"
                alt="Gallery 1"
                className="w-full rounded-md"
              />
              <img
                src="/path-to-gallery-image2.jpg"
                alt="Gallery 2"
                className="w-full rounded-md"
              />
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={reviewImage}
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-[#2C3E50]">
                    Shreya Sapkota
                  </h3>
                  <p className="text-[#2C3E50]">
                    "This hostel is fantastic! Clean, friendly staff, and the
                    location is perfect!"
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <img
                  src={reviewImage}
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-[#2C3E50]">
                    Unnati Neupane
                  </h3>
                  <p className="text-[#2C3E50]">
                    "I had a wonderful stay here. The rooms are cozy, and the
                    facilities are great!"
                  </p>
                </div>
              </div>
              {/* Add more reviews as needed */}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div>
              <h3 className="font-bold text-lg text-[#2C3E50]">Upcoming Events</h3>
              <ul className="list-disc pl-5 text-[#2C3E50]">
                <li>Game Night - Friday, 8 PM</li>
                <li>Cooking Workshop - Saturday, 10 AM</li>
                <li>Cultural Meetup - Sunday, 6 PM</li>
              </ul>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div>
              <h3 className="font-bold text-lg text-[#2C3E50]">Contact Information</h3>
              <p className="text-[#2C3E50]">
                <strong>Phone:</strong> 9876543210
              </p>
              <p className="text-[#2C3E50]">
                <strong>Email:</strong> contact@abchostel.com
              </p>
              <p className="text-[#2C3E50]">
                <strong>Address:</strong> {hostelData.location.address}
              </p>
              <a
                href={hostelData.location.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1ABC9C] hover:underline"
              >
                View on Google Maps
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Location Section */}
      <div className="mt-10">
        <h3 className="font-bold text-lg text-[#2C3E50]">Location</h3>
        <iframe
          src="https://maps.google.com"
          width="100%"
          height="400"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
          className="rounded-lg mt-4"
        ></iframe>
      </div>
    </div>
  );
};

export default HostelDetail;
