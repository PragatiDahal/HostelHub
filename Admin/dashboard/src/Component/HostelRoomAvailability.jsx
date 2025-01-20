import React, { useState, useEffect } from "react";
import axios from "axios";
// import UpdateRoomAvailability from "./UpdateRoomAvailability";

const HostelRoomAvailability = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hostel data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hostelroom") // Ensure your backend route matches
      .then((res) => {
        setHostels(res.data); // Set the fetched data
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load hostels data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Hostel Room Availability</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hostels.map((hostel) => (
          <div
            key={hostel._id}
            className="border border-gray-300 rounded-lg shadow-lg p-4 bg-[#E8F8F5]"
          >
            <h2 className="text-xl font-semibold">{hostel.name}</h2>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Room Availability:</h3>
              <ul className="list-disc list-inside mt-2">
                {hostel.rooms.map((room, index) => (
                  <li key={index} className="text-gray-700">
                    {room.type.charAt(0).toUpperCase() + room.type.slice(1)}:{" "}
                    <span className="font-bold">
                      {room.available} Available
                    </span>
                    {/* <UpdateRoomAvailability
                      hostelId={hostel._id}
                      roomType={room.type}
                      currentAvailable={room.available}
                    /> */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostelRoomAvailability;
