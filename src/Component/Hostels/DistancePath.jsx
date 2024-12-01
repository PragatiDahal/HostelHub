import React, { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import ErrorBoundary from "./ErrorBoundary";

const DistancePath = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [hostels, setHostels] = useState([]);
    const [distancePath, setDistancePath] = useState([]);
    const fallbackPosition = [27.7, 85.3]; // Default Kathmandu position
    const { hostelName } = useParams();
  
    // Log the hostel name from the route parameter
    useEffect(() => {
      console.log("Hostel Name from route:", hostelName);
    }, [hostelName]);
  
    const fetchHostelsWithDistances = async (location) => {
      console.log("Payload sent to API:", location);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/hosteldistance",
          { userLocation: location },
          { headers: { "Content-Type": "application/json" } }
        );
    
        const validHostels = response.data.filter(
          (hostel) =>
            hostel.location &&
            typeof hostel.location.lat === "number" &&
            typeof hostel.location.lon === "number"
        );
    
        setHostels(validHostels);
      } catch (error) {
        console.error("Error fetching hostels:", error.response?.data || error.message);
        setHostels([]); // Fallback to empty array
      }
    };
    
    // Fetch all hostel data
    const fetchHostels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hosteldetail");
        if (response.data && Array.isArray(response.data)) {
          setHostels(response.data);
        } else {
          console.error("Invalid hostel data format:", response.data);
          setHostels([]);
        }
      } catch (error) {
        console.error("Error fetching hostels:", error);
        setHostels([]);
      }
    };
  
    // Get user's current location and fetch the shortest path
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          fetchHostelsWithDistances({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Provide a fallback location
          const fallbackLocation = { latitude: 27.7, longitude: 85.3 };
          setUserLocation(fallbackLocation);
          fetchHostelsWithDistances(fallbackLocation);
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
          <MapContainer
            center={userLocation || fallbackPosition}
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
            {hostels.map((hostel, index) => {
              const { lat, lon } = hostel.location || {};
              const position = lat && lon ? [lat, lon] : fallbackPosition;
              return (
                <Marker key={index} position={position}>
                  <Popup>
                    {hostel.name}
                    <br />
                    {hostel.location?.address || "No address available"}
                  </Popup>
                </Marker>
              );
            })}
  
            {/* Distance path polyline */}
            {distancePath.length > 1 &&
              distancePath.every((point) => point.latitude && point.longitude) && (
                <Polyline
                  positions={distancePath.map((point) => [
                    point.latitude,
                    point.longitude,
                  ])}
                  color="blue"
                />
              )}
          </MapContainer>
        </div>
      </ErrorBoundary>
    );
  };

export default DistancePath