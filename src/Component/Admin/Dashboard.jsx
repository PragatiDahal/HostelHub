import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/hostels')
      .then((res) => {
        console.log(res.data); // Log response to check data structure
        setHostels(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load hostels");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Hostel List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hostels.map((hostel) => (
          <div key={hostel._id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl">{hostel.name}</h2>
            <img 
              src={hostel.image || 'default-fallback-image-url.jpg'} 
              alt={hostel.name} 
              className="w-full h-48 object-cover rounded"
            />
            <p>{hostel.location}</p>
            <p>Price: {hostel.price}</p>
            <p>Ratings: {hostel.ratings}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
