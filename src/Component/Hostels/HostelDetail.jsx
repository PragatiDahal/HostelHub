import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import reviewImage from "../../assets/bug2.png"; // Import your default review image

const HostelDetail = () => {
  const { hostelName } = useParams(); // Get hostel name from URL
  const [hostelData, setHostelData] = useState(null);
  const [activeTab, setActiveTab] = useState("facilities");
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    // Fetch hostel details by name from API
    fetch(`http://localhost:5000/api/hosteldetail/${hostelName}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch hostel details");
        return res.json();
      })
      .then((data) => {
        setHostelData(data);
        setError(null); // Clear any previous errors
      })
      .catch((error) => setError(error.message));
  }, [hostelName]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!hostelData) {
    return <p>Loading...</p>;
  }

  const tabs = ["facilities", "gallery", "reviews", "events", "contact"];

  return (
    <div className="mx-auto p-6 bg-[#E8F8F5]">
      {/* Hostel Image */}
      <div className="flex justify-center">
        <img
          src={hostelData.image || reviewImage} // Fallback image if none is provided
          alt="Hostel"
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
        {hostelData.rooms && Object.keys(hostelData.rooms).map((roomType) => (
          <div key={roomType} className="mb-8">
            <h3 className="text-lg font-semibold text-[#2C3E50] capitalize">
              {roomType} room
            </h3>
            <div className="flex mt-4">
              <img
                src={hostelData.rooms[roomType].image || reviewImage}
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
                <button className="mt-4 px-4 py-2 bg-[#1ABC9C] text-white rounded hover:bg-[#16A085]">
                  Book Now
                </button>
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
          {activeTab === "facilities" && hostelData.facilities && (
            <div>
              <h3 className="font-bold text-lg text-[#2C3E50]">Facilities</h3>
              <ul className="list-disc pl-5 text-[#2C3E50]">
                {hostelData.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && hostelData.gallery && (
            <div className="grid grid-cols-2 gap-4">
              {hostelData.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full rounded-md"
                />
              ))}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && hostelData.reviews && (
            <div className="space-y-4">
              {hostelData.reviews.map((review, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <img
                    src={review.profileImage || reviewImage}
                    alt="Reviewer"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-[#2C3E50]">
                      {review.name}
                    </h3>
                    <p className="text-[#2C3E50]">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && hostelData.events && (
            <div>
              <h3 className="font-bold text-lg text-[#2C3E50]">
                Upcoming Events
              </h3>
              <ul className="list-disc pl-5 text-[#2C3E50]">
                {hostelData.events.map((event, index) => (
                  <li key={index}>
                    {event.title} - {event.date}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && hostelData.contact && (
            <div>
              <h3 className="font-bold text-lg text-[#2C3E50]">
                Contact Information
              </h3>
              <p className="text-[#2C3E50]">
                <strong>Phone:</strong> {hostelData.contact.phone}
              </p>
              <p className="text-[#2C3E50]">
                <strong>Email:</strong> {hostelData.contact.email}
              </p>
              <p className="text-[#2C3E50]">
                <strong>Address:</strong> {hostelData.contact.address}
              </p>
              <a
                href={hostelData.contact.mapLink}
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
          src={hostelData.location.mapLink}
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
