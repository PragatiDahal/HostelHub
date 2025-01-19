import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server"; // For converting React components to HTML strings

const getClusterColor = (clusterIndex) => {
  const colors = ["green", "red", "blue", "purple","orange"];
  return colors[clusterIndex % colors.length];
};

const createCustomIcon = (clusterIndex) => {
  const color = getClusterColor(clusterIndex);
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
    className: "custom-icon", // Optional class for additional styling
    html: iconMarkup,
    iconSize: [30, 30],
    iconAnchor: [15, 15], // Center the icon
  });
};

const Cluster = () => {
  const [clusters, setClusters] = useState([]);
  const [threshold, setThreshold] = useState(5);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/shortestpath/clusters?threshold=${threshold}`
        );
        setClusters(response.data.clusters);
      } catch (err) {
        console.error("Error fetching clusters:", err);
        setError("Unable to fetch clusters. Please try again.");
      }
    };
    fetchClusters();
  }, [threshold]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Hostel Clusters</h1>

      <div className="flex justify-center mb-4">
        <input
          type="number"
          className="border rounded-lg p-2 mr-2"
          placeholder="Set Threshold (km)"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setThreshold(threshold)}
        >
          Update Threshold
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <MapContainer
        center={[27.7, 85.4]}
        zoom={12}
        className="h-[500px] w-full rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {clusters.map((cluster, clusterIndex) => (
          <React.Fragment key={clusterIndex}>
            {cluster.map((hostel, hostelIndex) => (
              <Marker
                key={hostelIndex}
                position={[hostel.latitude, hostel.longitude]}
                icon={createCustomIcon(clusterIndex)} // Use the custom React Icon here
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
  );
};

export default Cluster;
