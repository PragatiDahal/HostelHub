import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/hostels')
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
    <div className=" mx-auto p-12 bg-[#E8F8F5]">
      <h1 className="text-4xl font-bold pt-12 font-[poppins] text-[#2C3E50]">Hostel List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hostels.map((hostel) => (
          <div key={hostel._id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-[poppins] text-[#2C3E50]">{hostel.name}</h2>
            <img 
              src={hostel.image || 'default-fallback-image-url.jpg'} 
              alt={hostel.name} 
              className="w-full h-48 object-cover rounded"
            />
            <p className="font-[poppins] text-[#2C3E50]">{hostel.location}</p>
            <p className="font-[poppins] text-[#2C3E50]">Price: {hostel.price}</p>
            <p className="font-[poppins] text-[#2C3E50]">Ratings: {hostel.ratings}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center pb-6 pt-12">
        <Link to="/hostelform">
          <button className="bg-[#1ABC9C] text-white text-xl px-6 py-2 rounded-full font-[poppins]">
            Add new hostels
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
