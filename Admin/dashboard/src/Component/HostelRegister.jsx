import React, { useState, useEffect } from 'react';
import axios from "axios";

function HostelRegister() {
  const [hostelRequests, setHostelRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hostel registration requests
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hostelregister")
      .then((res) => {
        setHostelRequests(res.data); // Set the fetched data
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load hostel registration requests");
        setLoading(false);
      });
  }, []);

  // Handle Approve button click
  const handleApprove = (id) => {
    axios
      .put(`http://localhost:5000/api/hostelregister/approve/${id}`)
      .then((res) => {
        alert("Hostel approved successfully!");
        setHostelRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== id)
        );
      })
      .catch((err) => {
        console.error("Error approving hostel:", err);
        alert("Error approving hostel.");
      });
  };

  // Handle Decline button click
  const handleDecline = (id) => {
    axios
      .put(`http://localhost:5000/api/hostelregister/decline/${id}`)
      .then((res) => {
        alert("Hostel declined successfully!");
        setHostelRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== id)
        );
      })
      .catch((err) => {
        console.error("Error declining hostel:", err);
        alert("Error declining hostel.");
      });
  };

  // Handle Delete button click
const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/hostelregister/delete/${id}`)
      .then((res) => {
        alert("Hostel deleted successfully!");
        setHostelRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== id)
        );
      })
      .catch((err) => {
        console.error("Error deleting hostel:", err);
        alert("Error deleting hostel.");
      });
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6 bg-[#E8F8F5] pm-12">
      <h1 className="text-2xl font-semibold mb-6">Hostel Registration Requests</h1>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">First Name</th>
            <th className="px-4 py-2 border-b">Last Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Phone</th>
            <th className="px-4 py-2 border-b">Hostel Name</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hostelRequests.map((request) => (
            <tr key={request._id} className="border-b">
              <td className="px-4 py-2">{request.firstName}</td>
              <td className="px-4 py-2">{request.lastName}</td>
              <td className="px-4 py-2">{request.email}</td>
              <td className="px-4 py-2">{request.phone}</td>
              <td className="px-4 py-2">{request.hostelName}</td>
              <td className="px-4 py-2 flex gap-4">
                <button
                  onClick={() => handleApprove(request._id)}
                  className="bg-[#1ABC9C] text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecline(request._id)}
                  className="bg-[#2C3E50] text-white px-4 py-2 rounded"
                >
                  Decline
                </button>
                <button
                  onClick={() => handleDelete(request._id)}
                  className="bg-[#1ABC9C] text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HostelRegister;
