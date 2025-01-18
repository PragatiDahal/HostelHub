import React, { useState } from "react";
import axios from "axios";

function HostelForm() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    gender: "",
    facilities: [],
    description: "",
    rating: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [facilityInput, setFacilityInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // File size validation (5MB limit)
        setErrorMessage("File size should not exceed 5MB.");
        return;
      }
      setImageFile(file);
      setErrorMessage("");
    }
  };

  const handleAddFacility = () => {
    if (facilityInput.trim()) {
      setFormData({
        ...formData,
        facilities: [...formData.facilities, facilityInput.trim()],
      });
      setFacilityInput(""); // Reset facility input
    }
  };

  const handleRemoveFacility = (facility) => {
    setFormData({
      ...formData,
      facilities: formData.facilities.filter((f) => f !== facility),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("location", formData.location);
    formPayload.append("price", formData.price);
    formPayload.append("gender", formData.gender);
    formPayload.append("facilities", JSON.stringify(formData.facilities));
    formPayload.append("description", formData.description);
    formPayload.append("rating", formData.rating);

    if (imageFile) {
      formPayload.append("image", imageFile);
    }

    axios
      .post("http://localhost:5000/api/hostels", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setSuccessMessage("Hostel added successfully!");
        setFormData({
          name: "",
          location: "",
          price: "",
          gender: "",
          facilities: [],
          description: "",
          rating: "",
        });
        setImageFile(null);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Failed to add hostel. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="girl">Girl</option>
        <option value="boy">Boy</option>
      </select>

      <div>
        <label>Facilities</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={facilityInput}
            onChange={(e) => setFacilityInput(e.target.value)}
            placeholder="Add a facility"
            className="px-3 py-2 border rounded flex-grow"
          />
          <button
            type="button"
            onClick={handleAddFacility}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="mt-2 space-y-1">
          {formData.facilities.map((facility, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
            >
              <span>{facility}</span>
              <button
                type="button"
                onClick={() => handleRemoveFacility(facility)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        placeholder="Rating"
        type="number"
        step="0.1"
        min="0"
        max="5"
        className="w-full px-3 py-2 border rounded"
        required
      />

      {/* Image Upload Input */}
      <input
        type="file"
        id="imageUpload"
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <label htmlFor="imageUpload" className="cursor-pointer text-blue-500">
        Choose an image
      </label>
      {imageFile && <p>Selected File: {imageFile.name}</p>}

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Add Hostel
      </button>
    </form>
  );
}

export default HostelForm;
