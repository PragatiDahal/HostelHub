import axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ErrorBoundary from "./ErrorBoundary"; // Import ErrorBoundary

const ShortestPathMap = () => {
  const [hostelData, setHostels] = useState([]); // Stores hostel data
  const [userLocation, setUserLocation] = useState(null); // Stores user's location
  const [shortestPath, setShortestPath] = useState([]); // Stores the shortest path coordinates
  const fallbackPosition = [27.7, 85.3]; // Default position for fallback

  // Fetch hostel data with validation
  const fetchHostels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/hosteldetail");
      if (response.data && Array.isArray(response.data)) {
        setHostels(response.data);
      } else {
        console.error("Invalid hostel data format:", response.data);
        setHostels([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching hostels:", error);
      setHostels([]);
    }
  };

  // Fetch shortest path with validation
  const fetchShortestPath = async (latitude, longitude) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/hosteldetail/shortestpath",
        { latitude, longitude }
      );
      if (response.data && Array.isArray(response.data)) {
        setShortestPath(response.data);
      } else {
        console.error("Invalid shortest path data format:", response.data);
        setShortestPath([]);
      }
    } catch (error) {
      console.error("Error calculating shortest path:", error);
      setShortestPath([]);
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

  // Fetch hostel data on component mount
  useEffect(() => {
    fetchHostels();
  }, []);

  return (
    <ErrorBoundary>
      <div>
        {/* Main MapContainer */}
        <MapContainer
          center={fallbackPosition} // Default center coordinates
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User location marker */}
          {userLocation?.latitude && userLocation?.longitude && (
            <Marker position={[userLocation.latitude, userLocation.longitude]}>
              <Popup>Your Location</Popup>
            </Marker>
          )}

          {/* Hostel markers with fallback */}
          {Array.isArray(hostelData) &&
            hostelData.map((hostel, index) => {
              const { latitude, longitude } = hostel.location || {};
              const position =
                latitude && longitude ? [latitude, longitude] : fallbackPosition;
              return (
                <Marker key={index} position={position} color="red">
                  <Popup>
                    {hostel.name}
                    <br />
                    {hostel.location?.address || "No address available"}
                  </Popup>
                </Marker>
              );
            })}

          {/* Shortest path polyline */}
          {shortestPath.length > 1 &&
            shortestPath.every((point) => point.latitude && point.longitude) && (
              <Polyline
                positions={shortestPath.map((point) => [point.latitude, point.longitude])}
                color="blue"
              />
            )}
        </MapContainer>
      </div>
    </ErrorBoundary>
  );
};

export default ShortestPathMap;