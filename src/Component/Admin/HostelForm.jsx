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

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = hostel._id ? 'put' : 'post';
    const url = hostel._id ? `/api/hostels/${hostel._id}` : '/api/hostels';

    axios[method](url, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={formData.name} placeholder="Name" />
      <input value={formData.location} placeholder="Location" />
      <input value={formData.price} placeholder="Price" type="number" />
      <select value={formData.gender}>
        <option value="girl">Girl</option>
        <option value="boy">Boy</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default HostelForm;
