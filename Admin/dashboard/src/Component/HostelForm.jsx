import React, { useState, useEffect } from "react";
import axios from "axios";

function HostelForm({ hostel = {}, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    gender: "",
    facilities: "",
    description: "",
    rating: "",
    images: [], // For storing selected images
  });

  // Populate the form with existing hostel data if provided
  useEffect(() => {
    if (hostel) {
      setFormData({
        name: hostel.name || "",
        location: hostel.location || "",
        price: hostel.price || "",
        gender: hostel.gender || "",
        facilities: hostel.facilities || "",
        description: hostel.description || "",
        rating: hostel.rating || "",
        images: [], // Keep images empty for existing data
      });
    }
  }, [hostel]);

  // Handle text field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = hostel && hostel._id ? "put" : "post";
    const url = hostel && hostel._id
      ? `http://localhost:5000/api/hostels/${hostel._id}`
      : "http://localhost:5000/api/hostels";

    // Use FormData to handle both text and file data
    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("gender", formData.gender);
    data.append("facilities", formData.facilities);
    data.append("description", formData.description);
    data.append("rating", formData.rating);
    for (let i = 0; i < formData.images.length; i++) {
      data.append("images", formData.images[i]);
    }

    axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.data);
        alert(
          hostel && hostel._id
            ? "Hostel updated successfully!"
            : "New hostel added successfully!"
        );
        if (onSave) onSave(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while submitting the form.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="block w-full p-2 border rounded"
        required
      />
      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        className="block w-full p-2 border rounded"
        required
      />
      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
        className="block w-full p-2 border rounded"
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="block w-full p-2 border rounded"
        required
      >
        <option value="" disabled>
          Select Gender
        </option>
        <option value="girl">Girl</option>
        <option value="boy">Boy</option>
        <option value="co-ed">Co-ed</option>
      </select>
      <textarea
        name="facilities"
        value={formData.facilities}
        onChange={handleChange}
        placeholder="Facilities (e.g., Wi-Fi, Gym, Laundry)"
        className="block w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="block w-full p-2 border rounded"
        required
      />
      <input
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        placeholder="Rating"
        type="number"
        min="0"
        max="5"
        step="0.1"
        className="block w-full p-2 border rounded"
        required
      />
      <input
        type="file"
        name="images"
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="block w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-[#1ABC9C] text-white rounded"
      >
        {hostel && hostel._id ? "Update Hostel" : "Add Hostel"}
      </button>
    </form>
  );
}

export default HostelForm;
