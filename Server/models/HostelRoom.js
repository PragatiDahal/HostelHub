const mongoose = require('mongoose');

// Define the schema for the room availability
const RoomSchema = new mongoose.Schema({
  type: { type: String, required: true },  // Room type: e.g., 'Single', 'Double', 'Triple'
  available: { type: Number, required: true },  // Number of rooms available
});

// Define the schema for each hostel
const HostelRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Name of the hostel
  rooms: [RoomSchema],  // An array of RoomSchema to store the availability of different room types
}, { collection: "hostelroom" }); // Correct placement of the options object

// Create a model for HostelRoom using the HostelRoomSchema
module.exports = mongoose.model('HostelRoom', HostelRoomSchema);

