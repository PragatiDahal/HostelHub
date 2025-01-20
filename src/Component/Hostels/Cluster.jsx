import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

// Helper functions
const getClusterColor = (clusterIndex) => {
  const colors = ["green", "red", "blue", "purple", "orange"];
  return colors[clusterIndex % colors.length];
};

const createCustomIcon = (color) => {
  const iconMarkup = renderToStaticMarkup(
    <div
      style={{
        backgroundColor: color,
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid black",
      }}
    >
      <FaMapMarkerAlt color="white" size="20px" />
    </div>
  );

  return new L.DivIcon({
    className: "custom-icon",
    html: iconMarkup,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const Cluster = () => {
  const [clusters, setClusters] = useState([]);
  const [threshold, setThreshold] = useState(1); // Default threshold = 1km
  const [clusterBy, setClusterBy] = useState("distance"); // Default clustering by distance
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Function to fetch clusters after the user's location is retrieved
    const fetchClusters = async () => {
      if (!userLocation) return; // Wait until user location is available

      try {
        const userLat = userLocation.latitude;
        const userLon = userLocation.longitude;

        const queryParams =
          clusterBy === "distance"
            ? `threshold=${threshold}&userLat=${userLat}&userLon=${userLon}`
            : `clusterBy=address`;

        const response = await axios.get(
          `http://localhost:5000/api/shortestPath/clusters?${queryParams}`
        );

        setClusters(response.data.clusters);
      } catch (err) {
        console.error("Error fetching clusters:", err);
        setError("Unable to fetch clusters. Please try again.");
      }
    };

    // Get the user's current location when clustering by distance
    if (clusterBy === "distance" && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          console.error("Error getting user location:", err);
          setError(
            "Please allow location access for distance-based clustering."
          );
        },
        { enableHighAccuracy: true }
      );
    } else {
      fetchClusters(); // Fetch clusters immediately if clustering by address
    }
  }, [threshold, clusterBy, userLocation]); // Dependency on userLocation ensures the location is available

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex">
      {/* Map and Legend side by side */}
      <div className="w-full lg:w-3/4">
        <h1 className="text-3xl font-bold text-center mb-4">Hostel Clusters</h1>

        {/* Cluster Options */}
        <div className="flex justify-center mb-4">
          <select
            value={clusterBy}
            onChange={(e) => setClusterBy(e.target.value)}
            className="border rounded-lg p-2 mr-2"
          >
            <option value="distance"> Distance</option>
            <option value="address">  Address</option>
          </select>
          {clusterBy === "distance" && (
            <input
              type="number"
              className="border rounded-lg p-2"
              placeholder="Set Threshold (km)"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
            />
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Map */}
        <MapContainer
          center={[27.7, 85.4]} // Default map center (Kathmandu area)
          zoom={12}
          className="h-[calc(100vh-120px)] w-full rounded-lg shadow-lg" // Adjust the height based on the viewport height
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {userLocation && (
            <Marker
              position={[userLocation.latitude, userLocation.longitude]}
              icon={createCustomIcon("black")}
            >
              <Popup>You are here</Popup>
            </Marker>
          )}

          {/* Render Clusters */}
          {Object.entries(clusters).map(([clusterKey, cluster], clusterIndex) => (
            <React.Fragment key={clusterKey}>
              {cluster.map((hostel, hostelIndex) => (
                <Marker
                  key={hostelIndex}
                  position={[hostel.latitude, hostel.longitude]}
                  icon={createCustomIcon(getClusterColor(clusterIndex))}
                >
                  <Popup>
                    <h2 className="font-bold">{hostel.name}</h2>
                    <p>{hostel.address}</p>
                  </Popup>
                </Marker>
              ))}
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Cluster;


