import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingHostel, setEditingHostel] = useState(false);
  const [addingHostel, setAddingHostel] = useState(false);
  const [hostel, setHostel] = useState({
    name: "",
    image: "",
    location: "",
    price: "",
    gender: "",
    facilities: "",
    description: "",
  });
  const navigate = useNavigate();

  // Fetch all hostels
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hostels");
        setHostels(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setError("Failed to load hostels");
      } finally {
        setLoading(false);
      }
    };
    fetchHostels();
  }, []);

  // Handle deletion of a hostel
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hostel?")) {
      try {
        await axios.delete(`http://localhost:5000/api/hostels/${id}`);
        setHostels((prevHostels) =>
          prevHostels.filter((hostel) => hostel._id !== id)
        );
      } catch (error) {
        console.error("Failed to delete hostel", error);
        alert("Error deleting hostel.");
      }
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHostel((prevHostel) => ({ ...prevHostel, [name]: value }));
  };

  // Handle image input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHostel((prevHostel) => ({ ...prevHostel, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = hostel._id ? "put" : "post";
    const url = hostel._id
      ? `http://localhost:5000/api/hostels/${hostel._id}`
      : "http://localhost:5000/api/hostels";

    const formData = {
      name: hostel.name,
      image: hostel.image,
      location: hostel.location,
      price: hostel.price,
      gender: hostel.gender,
      facilities: hostel.facilities,
      description: hostel.description,
    };

    try {
      const response = await axios[method](url, formData);
      const updatedHostels = hostel._id
        ? hostels.map((h) => (h._id === hostel._id ? response.data : h))
        : [...hostels, response.data];

      setHostels(updatedHostels);
      alert(`${hostel._id ? "Updated" : "Added"} hostel successfully!`);
      setEditingHostel(false);
      setAddingHostel(false);
      setHostel({
        name: "",
        image: "",
        location: "",
        price: "",
        gender: "",
        facilities: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to update hostel:", error.response?.data);
      alert("Error adding or updating hostel");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1ABC9C] text-white flex flex-col">
        <h1 className="text-2xl font-bold p-6">Admin Dashboard</h1>
        <nav className="flex flex-col space-y-4 px-6">
        <Link to="/dashboard" className="hover:bg-[#16a085] p-2 rounded">
            Dashboard
          </Link>
          <Link to="/users" className="hover:bg-[#16a085] p-2 rounded">
            Users
          </Link>
          <Link to="/contacts" className="hover:bg-[#16a085] p-2 rounded">
            Contact
          </Link>
          <Link to="/booking" className="hover:bg-[#16a085] p-2 rounded">
            Bookings
          </Link>
          <Link to="/hostelregister" className="hover:bg-[#16a085] p-2 rounded">
            Hostel Register
          </Link>
          <Link to="/hostelroom" className="hover:bg-[#16a085] p-2 rounded">
            Add Hostel Room
          </Link>
          <Link to="/hostelroomavailable" className="hover:bg-[#16a085] p-2 rounded">
            Hostel Room Available
          </Link>
          <button
            onClick={handleLogout}
            className="hover:bg-[#16a085] p-2 rounded text-left"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {addingHostel || editingHostel ? (
          <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">
              {addingHostel ? "Add New Hostel" : "Edit Hostel"}
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={hostel.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Upload Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border rounded"
                />
                {hostel.image && (
                  <img
                    src={hostel.image}
                    alt="Hostel Preview"
                    className="mt-2 w-32 h-32 object-cover"
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={hostel.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={hostel.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={hostel.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Boy">Boy</option>
                  <option value="Girl">Girl</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Facilities</label>
                <textarea
                  name="facilities"
                  value={hostel.facilities}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="e.g., Wi-Fi, Laundry, Gym"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={hostel.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Write a brief description"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#16a085] text-white py-2 rounded"
              >
                {addingHostel ? "Add Hostel" : "Update Hostel"}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold">Hostels</h2>
            <button
              onClick={() => setAddingHostel(true)}
              className="mt-4 bg-[#16a085] text-white py-2 px-4 rounded"
            >
              Add Hostel
            </button>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostels.map((hostel) => (
                <div
                  key={hostel._id}
                  className="border border-gray-200 p-4 rounded shadow"
                >
                  <h3 className="font-semibold text-lg">{hostel.name}</h3>
                  <img
                    src={
                      hostel.image
                        ? `http://localhost:5000/uploads/${hostel.image}` // If the image exists, use the full path
                        : "default-image.jpg" // If not, use the default image
                    }
                    alt={hostel.name}
                    className="w-full h-40 object-cover mt-2 rounded"
                  />
                  <p>{hostel.location}</p>
                  <p>{hostel.price}</p>
                  <p>{hostel.gender}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => {
                        setEditingHostel(true);
                        setHostel(hostel);
                      }}
                      className="text-[#16a085]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(hostel._id)}
                      className="text-[#2C3E50]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
