import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

const ShortestPathMap = () => {
  const [hostels, setHostels] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [shortestPath, setShortestPath] = useState([]);


  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchShortestPath(latitude, longitude);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  // Fetch all hostels from the database
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hosteldetail/${hostelName}`);
        setHostels(response.data.data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };
    fetchHostels();
  }, []);

  return (
    <MapContainer center={[27.7, 85.3]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* User location marker */}
      {userLocation && (
        <Marker position={[userLocation.latitude, userLocation.longitude]}>
          <Popup>Your Location</Popup>
        </Marker>
      )}

      {/* Hostel markers */}
      {hostels.map((hostel) => (
        <Marker
          key={hostel.name}
          position={[hostelLocation.latitude, hostelLocation.longitude]}
        >
          <Popup>
            {hostel.name}
            <br />
            {hostel.location}
          </Popup>
        </Marker>
      ))}

      {/* Shortest path polyline */}
      {shortestPath && (
        <Polyline
          positions={[
            [userLocation.latitude, userLocation.longitude],
            ...hostels.map((hostel) => [hostel.latitude, hostel.longitude]),
          ]}
          color="blue"
        />
      )}
    </MapContainer>
  );
};

export default ShortestPathMap;
