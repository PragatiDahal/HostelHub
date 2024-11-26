import axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

const ShortestPathMap = () => {
  const [hostelData, setHostels] = useState([]); // Stores hostel data
  const [userLocation, setUserLocation] = useState(null); // Stores user's location
  const [shortestPath, setShortestPath] = useState([]); // Stores the shortest path coordinates

  // Fetch shortest path from backend
  const fetchShortestPath = async (latitude, longitude) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/hosteldetail/shortestpath",
        { latitude, longitude }
      );
      setShortestPath(response.data); // Response should be an array of [lat, lng] points
    } catch (error) {
      console.error("Error calculating shortest path:", error);
      setShortestPath([]); // Fallback to empty array on error
    }
  };

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchShortestPath(latitude, longitude); // Fetch route after getting user location
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  // Fetch hostel data
  const fetchHostels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/hosteldetail"
      );
      const data = response.data?.data; // Use optional chaining to handle undefined errors
      if (Array.isArray(data)) {
        setHostels(data); // Only set hostels if data is a valid array
      } else {
        console.error("Hostels data is not an array:", data);
        setHostels([]); // Set empty array to avoid errors
      }
    } catch (error) {
      console.error("Error fetching hostels:", error);
      setHostels([]); // Fallback to empty array on error
    }
  };

  // Fetch hostels on component mount
  useEffect(() => {
    fetchHostels();
  }, []);

  return (
    <MapContainer
      center={[27.7, 85.3]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* User location marker */}
      {userLocation && (
        <Marker position={[userLocation.latitude, userLocation.longitude]}>
          <Popup>Your Location</Popup>
        </Marker>
      )}

      {/* Hostel markers */}
      {Array.isArray(hostelData) &&
        hostelData.map((hostel) => (
          <Marker
            key={hostel.name}
            position={[hostel.location.latitude, hostel.location.longitude]} // Replace with actual API response fields
          >
            <Popup>
              {hostel.name}
              <br />
              {hostel.location.address}
            </Popup>
          </Marker>
        ))}

      {/* Shortest path polyline */}
      {shortestPath.length > 1 && (
        <Polyline positions={shortestPath.map((point) => [point.latitude, point.longitude])} />
      )}
    </MapContainer>
  );
};

export default ShortestPathMap;
