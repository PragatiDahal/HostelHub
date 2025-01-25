import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingRequests = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings")
      .then((res) => {
        setBookingRequests(res.data.bookings || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load booking requests");
        setLoading(false);
      });
  }, []);

  const handleAction = (id, action) => {
    if (
      !window.confirm(`Are you sure you want to ${action.toLowerCase()} this booking?`)
    ) {
      return;
    }

    const url = `http://localhost:5000/api/bookings/${action.toLowerCase()}/${id}`;
    axios
      .put(url)
      .then(() => {
        alert(`Booking ${action.toLowerCase()}ed successfully!`);
        setBookingRequests((prev) => prev.filter((req) => req._id !== id));
      })
      .catch((err) => {
        console.error(`Error ${action.toLowerCase()}ing booking:`, err);
        alert(`Error ${action.toLowerCase()}ing booking.`);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (bookingRequests.length === 0)
    return <p>No booking requests available.</p>;

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
              <td className="px-4 py-2">
                {Array.isArray(request.roomType)
                  ? request.roomType.join(", ")
                  : request.roomType}
              </td>
              <td className="px-4 py-2">
                {request.bookingDate
                  ? new Date(request.bookingDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="px-4 py-2 flex gap-4">
                <button
                  onClick={() => handleAction(request._id, "Accept")}
                  className="bg-[#1ABC9C] text-white px-4 py-2 rounded hover:bg-[#16A085]"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleAction(request._id, "Reject")}
                  className="bg-[#2C3E50] text-white px-4 py-2 rounded hover:bg-[#34495E]"
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
