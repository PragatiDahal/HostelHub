import axios from "axios";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

const ShortestPathMap = () => {
  const [hostels, setHostels] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [shortestPath, setShortestPath] = useState([]);

  // Fetch shortest path from backend
  const fetchShortestPath = async (latitude, longitude) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/hosteldetail/shortest-path",
        {
          latitude,
          longitude,
        }
      );
      setShortestPath(response.data); // Should be an array of [lat, lng] points
    } catch (error) {
      console.error("Error calculating shortest path:", error);
      setData([]); // Fallback to empty data on error
    }
  };

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchShortestPath(latitude, longitude); // Fetch the route after getting the user's location
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  // Fetch hostels
  const fetchHostels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/hosteldetail"
      );
      const data = response.data?.data; // Use optional chaining to avoid undefined errors
      if (Array.isArray(data)) {
        setHostels(data); // Only set hostels if it's a valid array
      } else {
        console.error("Hostels data is not an array:", data);
        setHostels([]); // Set an empty array to avoid errors
      }
    } catch (error) {
      console.error("Error fetching hostels:", error);
      setHostels([]); // Fallback to an empty array on error
    }
  };
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
      {Array.isArray(hostels) &&
        hostels.map((hostelData) => (
          <Marker
            key={hostelData.name}
            position={[hostelData.location.latitude, hostelData.location.longitude]} // Replace with correct properties
          >
            <Popup>
              {hostelData.name}
              <br />
              {hostelData.location.address}
            </Popup>
          </Marker>
        ))}

      {/* Shortest path polyline */}
      {shortestPath.length > 1 && (
        <Polyline
          positions={shortestPath} // Use shortestPath directly if it's an array of coordinates
          color="blue"
        />
      )}
    </MapContainer>
  );
};

export default ShortestPathMap;
