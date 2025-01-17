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
    axios
      .get("http://localhost:5000/api/hostels")
      .then((res) => {
        setHostels(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load hostels");
        setLoading(false);
      });
  }, []);

  // Handle deletion of a hostel
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hostel?")) {
      axios
        .delete(`http://localhost:5000/api/hostels/${id}`)
        .then(() => {
          setHostels(hostels.filter((hostel) => hostel._id !== id));
        })
        .catch((err) => {
          console.error("Failed to delete hostel", err);
          alert("Error deleting hostel.");
        });
    }
  };

  // Handle form input changes for adding or editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHostel({ ...hostel, [name]: value });
  };

  // Handle form submission (both add and edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = hostel._id ? "put" : "post";
    const url = hostel._id
      ? `http://localhost:5000/api/hostels/${hostel._id}`
      : "http://localhost:5000/api/hostels";

    axios[method](url, hostel)
      .then((res) => {
        alert(`${hostel._id ? "Updated" : "Added"} hostel successfully!`);
        setHostels((prevHostels) =>
          hostel._id
            ? prevHostels.map((h) => (h._id === hostel._id ? res.data : h))
            : [...prevHostels, res.data]
        );
        setEditingHostel(false);
        setAddingHostel(false);
        resetHostelForm();
      })
      .catch((err) => {
        console.error("Failed to update hostel:", err.response?.data);
        alert("Error adding or updating hostel");
      });
  };

  // Reset hostel form
  const resetHostelForm = () => {
    setHostel({
      name: "",
      image: "",
      location: "",
      price: "",
      gender: "",
      facilities: "",
      description: "",
    });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/adminsignin");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1ABC9C] text-white flex flex-col">
        <h1 className="text-2xl font-bold p-6">Admin Dashboard</h1>
        <nav className="flex flex-col space-y-4 px-6">
          <button
            onClick={() => {
              setEditingHostel(false);
              setAddingHostel(false);
            }}
            className="hover:bg-[#16a085] p-2 rounded text-left"
          >
            Dashboard
          </button>
          <Link to="/hostels" className="hover:bg-[#16a085] p-2 rounded">
            Hostels
          </Link>
          <Link to="/users" className="hover:bg-[#16a085] p-2 rounded">
            Users
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
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={hostel.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
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
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
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
                  placeholder="Write a brief description of the hostel"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#1ABC9C] text-white px-4 py-2 rounded hover:bg-[#16a085]"
              >
                {addingHostel ? "Add Hostel" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddingHostel(false);
                  setEditingHostel(false);
                  resetHostelForm();
                }}
                className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Hostel Management</h1>
            <button
              onClick={() => setAddingHostel(true)}
              className="mt-4 bg-[#1ABC9C] text-white px-4 py-2 rounded"
            >
              Add New Hostel
            </button>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {hostels.map((hostelItem) => (
                <div
                  key={hostelItem._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h2 className="text-xl font-semibold">{hostelItem.name}</h2>
                  <img
                    src={
                      hostelItem.image
                        ? `http://localhost:5000/uploads/${hostelItem.image}`
                        : "default-image.jpg"
                    }
                    alt={hostelItem.name}
                    className="w-full h-32 object-cover rounded-md my-2"
                  />
                  <p>{hostelItem.location}</p>
                  <p>{hostelItem.price}</p>
                  <button
                    onClick={() => {
                      setHostel(hostelItem);
                      setEditingHostel(true);
                    }}
                    className="mt-2 bg-[#1ABC9C] text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hostelItem._id)}
                    className="mt-2 ml-2 bg-[#2C3E50] text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
