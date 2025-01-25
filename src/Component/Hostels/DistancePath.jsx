import React, { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"; // Ensure to include the CSS for routing
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import ErrorBoundary from "./ErrorBoundary";
import "leaflet-routing-machine"; // Load routing machine globally

const DistancePath = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hostels, setHostels] = useState([]);
  const fallbackPosition = [27.7, 85.3];
  const { hostelName } = useParams();

  // Fetch hostel details
  const fetchHostelsWithDistances = async (location) => {
    try {
      let response;
      if (hostelName) {
        response = await axios.get(
          `http://localhost:5000/api/hosteldetail/${hostelName}`
        );
      } else {
        response = await axios.get(`http://localhost:5000/api/hosteldetail`);
      }

      const hostelsData = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setHostels(hostelsData);
    } catch (error) {
      console.error("Error fetching hostel details:", error.message);
    }
  };

  // Get user location
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

  // Routing component
  const RoutingComponent = () => {
    const map = useMap();

    useEffect(() => {
      if (userLocation && hostels.length > 0) {
        hostels.forEach((hostel) => {
          const { latitude, longitude } = hostel.location || {};
          const position =
            latitude && longitude ? [latitude, longitude] : fallbackPosition;

          // Add routing from user to hostel (using Leaflet Routing Machine)
          L.Routing.control({
            waypoints: [
              L.latLng(userLocation.latitude, userLocation.longitude),
              L.latLng(latitude, longitude),
            ],
            routeWhileDragging: true,
            geocoder: null, // Optional: Disable geocoding
            lineOptions: {
              styles: [{ color: "green", weight: 7 }], // Green color for the path
            },
          }).addTo(map);
        });
      }
    }, [userLocation, hostels, map]);

    return null;
  };

  // Create a custom icon for user and hostels with different colors
  const createUserIcon = () => {
    return new L.DivIcon({
      className: "leaflet-div-icon",
      html: `<div style="background-color: blue; border-radius: 50%; width: 25px; height: 25px; display: flex; justify-content: center; align-items: center; color: white;">U</div>`,
      iconSize: [25, 25],
      iconAnchor: [12, 12],
    });
  };

  const createHostelIcon = () => {
    return new L.DivIcon({
      className: "leaflet-div-icon",
      html: `<div style="background-color: red; border-radius: 50%; width: 25px; height: 25px; display: flex; justify-content: center; align-items: center; color: white;">H</div>`,
      iconSize: [25, 25],
      iconAnchor: [12, 12],
    });
  };

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
            <Marker
              position={[userLocation.latitude, userLocation.longitude]}
              icon={createUserIcon()}
            >
              <Popup>Your Location</Popup>
            </Marker>
          )}
          {hostels.map((hostel, index) => {
            const { latitude, longitude } = hostel.location || {};
            const position =
              latitude && longitude ? [latitude, longitude] : fallbackPosition;
            return (
              <Marker
                key={index}
                position={position}
                icon={createHostelIcon()}
              >
                <Popup>
                  {hostel.name}
                  <br />
                  {hostel.location?.address || "No address available"}
                </Popup>
              </Marker>
            );
          })}
          <RoutingComponent />
        </MapContainer>
      </div>
    </ErrorBoundary>
  );
};

export default DistancePath;
