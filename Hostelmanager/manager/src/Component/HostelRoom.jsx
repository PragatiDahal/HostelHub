import React, { useState } from "react";
import axios from "axios";

const HostelRoom = () => {
  // State for form fields
  const [hostelName, setHostelName] = useState("");
  const [rooms, setRooms] = useState([{ type: "", available: "" }]); // Array for rooms
  const [errorMessage, setErrorMessage] = useState("");

  // Handle room type changes
  const handleRoomChange = (index, e) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][e.target.name] = e.target.value;
    setRooms(updatedRooms);
  };

  // Add a new room to the list
  const addRoom = () => {
    setRooms([...rooms, { type: "", available: "" }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hostelName || rooms.some((room) => !room.type || !room.available)) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const newHostelRoom = {
      name: hostelName,
      rooms: rooms.map((room) => ({
        type: room.type,
        available: parseInt(room.available),
      })),
    };

    try {
      await axios.post("http://localhost:5000/api/hostelroom", newHostelRoom);
      setHostelName("");
      setRooms([{ type: "", available: "" }]); // Reset rooms
      setErrorMessage("");
      alert("Hostel room added successfully!");
    } catch (err) {
      setErrorMessage("Error adding hostel room. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Hostel Room</h1>

      {/* Display Error Message */}
      {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Hostel Name:</label>
          <input
            type="text"
            value={hostelName}
            onChange={(e) => setHostelName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <h3 className="font-semibold">Room Types:</h3>
          {rooms.map((room, index) => (
            <div key={index} className="space-y-2">
              <div>
                <label className="block font-semibold">Room Type (Single/Double/Triple):</label>
                <input
                  type="text"
                  name="type"
                  value={room.type}
                  onChange={(e) => handleRoomChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold">Available Rooms:</label>
                <input
                  type="number"
                  name="available"
                  value={room.available}
                  onChange={(e) => handleRoomChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
          ))}

          {/* Add Room Button */}
          <button
            type="button"
            onClick={addRoom}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Another Room
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Hostel Room
        </button>
      </form>
    </div>
  );
};

export default HostelRoom;
