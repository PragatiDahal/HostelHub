import React, { useEffect } from "react";
import L from "leaflet";

const Shortestpath = () => {
  useEffect(() => {
    // Use navigator.geolocation to get user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // Initialize Leaflet map
        const map = L.map("map").setView([userLat, userLon], 13);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(map);

        // Add marker for user's location
        L.marker([userLat, userLon]).addTo(map).bindPopup("You are here").openPopup();
      },
      (error) => {
        console.error("Unable to fetch location:", error);
      }
    );
  }, []); // Empty dependency array ensures the effect runs once after the component mounts

  return (
    <div>
      {/* Add a div with id="map" for Leaflet to render the map */}
      <div id="map" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default Shortestpath;
