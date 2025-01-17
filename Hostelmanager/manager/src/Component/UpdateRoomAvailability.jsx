import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const UpdateRoomAvailability = ({ hostelId, hostelName, rooms = [] }) => {
  const [roomUpdates, setRoomUpdates] = useState(
    rooms.map((room) => ({ type: room.type, available: room.available }))
  );
  const [message, setMessage] = useState("");
  const [updateStatus, setUpdateStatus] = useState([]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/hostelroom/${hostelId}/rooms`,
        { roomUpdates }
      );

      setRoomUpdates(
        response.data.updatedRooms.map(({ type, newAvailable }) => ({
          type,
          available: newAvailable,
        }))
      );

      setUpdateStatus(response.data.updatedRooms);
      setMessage(
        `Room availability updated successfully for hostel: ${response.data.hostelName}`
      );
    } catch (error) {
      console.error(
        "Error updating room availability:",
        error.response || error
      );
      setMessage("Failed to update room availability.");
    }
  };

  const handleChange = (index, value) => {
    const updatedRooms = [...roomUpdates];
    updatedRooms[index].available = value;
    setRoomUpdates(updatedRooms);
  };

  return (
    <div>
      <h3>Update Room Availability for {hostelName}</h3>
      {roomUpdates.map((room, index) => (
        <div key={room.type} className="mb-4">
          <label>
            {room.type} Rooms:
            <input
              type="number"
              value={room.available}
              onChange={(e) => handleChange(index, e.target.value)}
              className="border p-2 rounded ml-2"
            />
          </label>
        </div>
      ))}
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update All
      </button>
      {message && <p>{message}</p>}
      {updateStatus.length > 0 && (
        <div>
          <h4>Update Details:</h4>
          <ul>
            {updateStatus.map((status) => (
              <li key={status.type}>
                {status.type} Rooms: Updated to {status.newAvailable} Available
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

UpdateRoomAvailability.propTypes = {
  hostelName: PropTypes.string.isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      available: PropTypes.number.isRequired,
    })
  ),
};

export default UpdateRoomAvailability;
