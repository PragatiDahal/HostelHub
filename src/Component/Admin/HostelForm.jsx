import React, { useState } from 'react';
import axios from 'axios';

function HostelForm({ hostel = {} }) {
  const [formData, setFormData] = useState({
    name: hostel.name || '',
    location: hostel.location || '',
    price: hostel.price || '',
    gender: hostel.gender || '',
    facilities: hostel.facilities || [],
    description: hostel.description || '',
    rating: hostel.rating || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = hostel.name ? 'put' : 'post';
    const url = hostel.name ? `http://localhost:5000/api/hostels/${hostelName}` : 'http://localhost:5000/api/hostels';

    axios[method](url, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <option value="girl">Girl</option>
        <option value="boy">Boy</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default HostelForm;

