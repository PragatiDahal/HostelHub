import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import reviewImage from "../../assets/bug2.png";
import axios from "axios";
import { useAuth } from "../../Component/Contexts/AuthContext";

const HostelDetail = () => {
  const { hostelName } = useParams(); // Get hostel name from URL
  const [hostelData, setHostelData] = useState(null);
  const [activeTab, setActiveTab] = useState("facilities");
  const [error, setError] = useState(null); // For error handling
  const [newReview, setNewReview] = useState({ name: "", comment: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const reviewsRef = useRef();
  const nameInputRef = useRef(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/hosteldetail/${hostelName}`)
      .then((response) => {
        setHostelData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load hostel data");
        setLoading(false);
      });
  }, [hostelName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate("/usersignin");
      return;
    }

    if (!newReview.name || !newReview.comment) {
      setError("Please fill in all fields");
      return;
    }

    axios
      .post(
        `http://localhost:5000/api/hosteldetail/${hostelName}/review`,
        newReview
      )
      .then((response) => {
        const data = response.data;
        setHostelData((prev) => ({
          ...prev,
          reviews: [...(prev.reviews || []), data.review],
        }));
        setSuccessMessage("Review added successfully!");
        setNewReview({ name: "", comment: "" });

        // Refocus name input
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
        // Scroll to the reviews section
        if (reviewsRef.current) {
          reviewsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      })
      .catch((error) => {
        const message =
          error.response?.data?.message || "Failed to add review. Try again.";
        setError(message);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

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
        <Link to="/hostelbooking" state={{ selectedHostel: hostelName }}>
          <button className="px-6 py-3 bg-[#1ABC9C] text-white rounded-lg hover:bg-[#16A085] font-[poppins]">
            Book Now
          </button>
        </Link>
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
          {isLoggedIn && (
            <div className="p-6">
              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div>
                  <h3 className="font-bold text-lg text-[#2C3E50] font-[poppins]">
                    {hostelData?.name} Reviews
                  </h3>
                  {successMessage && (
                    <p className="text-green-500 font-[poppins]">
                      {successMessage}
                    </p>
                  )}
                  <form
                    onSubmit={handleSubmitReview}
                    className="space-y-4 mt-4"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={newReview.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                    <textarea
                      name="comment"
                      placeholder="Your Review"
                      value={newReview.comment}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1ABC9C] text-white rounded-lg hover:bg-[#16A085]"
                    >
                      Submit Review
                    </button>
                  </form>
                  <div className="space-y-4 mt-6">
                    {/* Render existing reviews */}
                    {hostelData.reviews.map((review, index) => (
                      <div key={index} className="border p-4 rounded shadow">
                        <h4 className="font-bold">{review.name}</h4>
                        <p>{review.comment}</p>
                        <p className="text-sm text-gray-500">
                          Sentiment Score: {review.sentimentScore}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
        {/* <h3 className="font-bold text-lg text-[#2C3E50] font-[poppins]">
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
        ></iframe> */}
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
