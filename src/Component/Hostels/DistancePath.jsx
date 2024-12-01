import React, { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import ErrorBoundary from "./ErrorBoundary";

const DistancePath = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hostels, setHostels] = useState([]);
  const [distancePath, setDistancePath] = useState([]);
  const fallbackPosition = [27.7, 85.3]; // Default Kathmandu position
  const { hostelName } = useParams();

  // Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const toRad = (x) => (x * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
  };

  const fetchHostelsWithDistances = async (location) => {
    try {
      let response;
      if (hostelName) {
        response = await axios.get(`http://localhost:5000/api/hosteldetail/${hostelName}`);
      } else {
        response = await axios.get(`http://localhost:5000/api/hosteldetail`);
      }

      const hostelsData = Array.isArray(response.data) ? response.data : [response.data];
      const updatedHostels = hostelsData.map((hostel) => ({
        ...hostel,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          hostel.location.latitude,
          hostel.location.longitude
        ),
      }));

      setHostels(updatedHostels);
    } catch (error) {
      console.error("Error fetching hostel details:", error.message);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };
          setUserLocation(location);

          fetchHostelsWithDistances(location);
        },
        (error) => {
          console.error("Error getting user location:", error);
          const fallbackLocation = { latitude: 27.7, longitude: 85.3 };
          setUserLocation(fallbackLocation);

          fetchHostelsWithDistances(fallbackLocation);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
      const fallbackLocation = { latitude: 27.7, longitude: 85.3 };
      setUserLocation(fallbackLocation);

      fetchHostelsWithDistances(fallbackLocation);
    }
  }, [hostelName]);

  useEffect(() => {
    if (userLocation && hostels.length > 0) {
      const paths = hostels.map((hostel) => ({
        latitude: hostel.location.latitude,
        longitude: hostel.location.longitude,
      }));

      setDistancePath([
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        ...paths,
      ]);
    }
  }, [userLocation, hostels]);

  return (
    <ErrorBoundary>
      <div>
        <MapContainer
          center={userLocation || fallbackPosition}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {userLocation && (
            <Marker position={[userLocation.latitude, userLocation.longitude]}>
              <Popup>Your Location</Popup>
            </Marker>
          )}

          {hostels.map((hostel, index) => {
            const { latitude, longitude } = hostel.location || {};
            const position = latitude && longitude ? [latitude, longitude] : fallbackPosition;
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

          {distancePath.length > 1 && (
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

export default DistancePath;
