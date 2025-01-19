import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingRequests = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch booking requests
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings")
      .then((res) => {
        setBookingRequests(res.data.bookings); // Set the fetched data
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load booking requests");
        setLoading(false);
      });
  }, []);

  // Handle Accept button click
  const handleAccept = (id) => {
    axios
      .put(`http://localhost:5000/api/bookings/accept/${id}`)
      .then((res) => {
        alert("Booking accepted successfully!");
        setBookingRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== id)
        );
      })
      .catch((err) => {
        console.error("Error accepting booking:", err);
        alert("Error accepting booking.");
      });
  };

  // Handle Reject button click
  const handleReject = (id) => {
    axios
      .put(`http://localhost:5000/api/bookings/reject/${id}`)
      .then((res) => {
        alert("Booking rejected successfully!");
        setBookingRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== id)
        );
      })
      .catch((err) => {
        console.error("Error rejecting booking:", err);
        alert("Error rejecting booking.");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6 bg-[#E8F8F5] pm-12">
      <h1 className="text-2xl font-semibold mb-6">Booking Requests</h1>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">User Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Hostel Name</th>
            <th className="px-4 py-2 border-b">Location</th>
            <th className="px-4 py-2 border-b">Room Type</th>
            <th className="px-4 py-2 border-b">Booking Date</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookingRequests.map((request) => (
            <tr key={request._id} className="border-b">
              <td className="px-4 py-2">{request.userInfo.name}</td>
              <td className="px-4 py-2">{request.userInfo.email}</td>
              <td className="px-4 py-2">{request.hostel.name}</td>
              <td className="px-4 py-2">{request.hostel.location}</td>
              <td className="px-4 py-2">{request.roomType.join(", ")}</td>
              <td className="px-4 py-2">{new Date(request.bookingDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 flex gap-4">
                <button
                  onClick={() => handleAccept(request._id)}
                  className="bg-[#1ABC9C] text-white px-4 py-2 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request._id)}
                  className="bg-[#2C3E50] text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingRequests;
