import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        <h2 className="text-2xl font-bold text-[#2C3E50] font-[poppins]">
          {hostelData.name}
        </h2>
        <p className="mt-4 text-gray-700 font-[poppins]">{hostelData.about}</p>
      </div>

      {/* Rooms Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-[#2C3E50] mb-4 font-[poppins]">
          Rooms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostelData.rooms &&
            Object.keys(hostelData.rooms).map((roomType) => (
              <div
                key={roomType}
                className="bg-[#2C3E50] rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
              >
                <img
                  src={hostelData.rooms[roomType].image || reviewImage}
                  alt={`${roomType} room`}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white capitalize mb-2 font-[poppins]">
                    {roomType} Room
                  </h3>
                  <p className="text-white mb-2">
                    {hostelData.rooms[roomType].description}
                  </p>
                  <p className="text-white mb-1 font-[poppins]">
                    <strong>Base Price:</strong>{" "}
                    {hostelData.rooms[roomType].price}
                  </p>
                  <p className="text-white font-[poppins]">
                    <strong>Dynamic Price:</strong>{" "}
                    {hostelData.rooms[roomType].dynamicPrice}
                  </p>
                  {/* Add View Details Button */}
                  <button className="mt-2 px-4 py-2 bg-[#1ABC9C] text-white rounded-lg hover:bg-[#16A085] font-[poppins]">
                    <Link to={`/hosteldetail/${hostelName}/${roomType}`}>
                      View Details
                    </Link>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/*  "Book Now" Button */}
      <div className="flex justify-center mt-6">
        <button className="px-6 py-3 bg-[#1ABC9C] text-white rounded-lg hover:bg-[#16A085] font-[poppins]">
          Book Now
        </button>
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
              <h3 className="font-bold text-lg text-[#2C3E50] font-[poppins]">
                Facilities
              </h3>
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
                    <h3 className="font-semibold text-[#2C3E50] font-[poppins]">
                      {review.name}
                    </h3>
                    <p className="text-[#2C3E50] font-[poppins]">
                      {review.comment}
                    </p>
                    <p className="text-sm text-gray-500">
                      Sentiment Score: {review.sentimentScore}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && hostelData.events && (
            <div>
              <h3 className="font-bold text-lg text-[#2C3E50] font-[poppins]">
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
              <h3 className="font-bold text-lg text-[#2C3E50] font-[poppins]">
                Contact Information
              </h3>
              <p className="text-[#2C3E50] font-[poppins]">
                <strong>Phone:</strong> {hostelData.contact.phone}
              </p>
              <p className="text-[#2C3E50] font-[poppins]">
                <strong>Email:</strong> {hostelData.contact.email}
              </p>
              <p className="text-[#2C3E50] font-[poppins]">
                <strong>Address:</strong> {hostelData.contact.address}
              </p>
              <iframe
                src={hostelData.contact.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1ABC9C] hover:underline"
              >
                View on Google Maps
              </iframe>
            </div>
          )}
        </div>
      </div>

      {/* Location Section */}
      <div className="mt-10">
      <h3 className="font-bold text-lg text-[#2C3E50] font-[poppins]">
          Location
        </h3>
        <iframe
          src={hostelData.location.mapLink} // Ensure this is the embed link
          width="100%"
          height="400"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
          className="rounded-lg mt-4"
        ></iframe>
        <div className="flex justify-center mt-6">
          <Link to={`/distancepath/${hostelName}`}>
            <button className="px-6 py-3 bg-[#1ABC9C] text-white rounded-lg hover:bg-[#16A085] font-[poppins]">
              Show the Route on Map
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HostelDetail;
