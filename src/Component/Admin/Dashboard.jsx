import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard(){
const [hostels, setHostels] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [editingHostel, setEditingHostel] = useState(false);
const [addingHostel, setAddingHostel] = useState(false); // Track adding new hostels
const [hostel, setHostel] = useState({
  name: "",
  location: "",
  price: "",
  
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
      .delete('http://localhost:5000/api/hostels/${id}')
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
  setHostel({ ...hostel, [e.target.name]: e.target.value });
};

// Handle hostel addition
const handleAddSubmit = (e) => {
  e.preventDefault();
  axios
    .post("http://localhost:5000/api/hostels", hostel)
    .then((res) => {
      alert("Hostel added successfully!");
      setHostels([...hostels, res.data]); // Update the hostels list
      setAddingHostel(false); // Exit add mode
      setHostel({ name: "", location: "", price: "" }); // Reset form
    })
    .catch((err) => {
      console.error("Failed to add hostel", err);
      alert("Error adding hostel");
    });
};

// Handle hostel update
const handleEditSubmit = (e) => {
  e.preventDefault();
  axios
    .put('http://localhost:5000/api/hostels/${hostel._id}', hostel)
    .then((res) => {
      alert("Hostel updated successfully!");
      setHostels(
        hostels.map((h) => (h._id === hostel._id ? res.data : h))
      ); // Update the list
      setEditingHostel(false); // Exit edit mode
      setHostel({ name: "", location: "", price: "", ratings: "" }); // Reset form
    })
    .catch((err) => {
      console.error("Failed to update hostel", err);
      alert("Error updating hostel");
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
        // Add/Edit Hostel Form
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">
            {addingHostel ? "Add New Hostel" : "Edit Hostel"}
          </h1>
          <form onSubmit={addingHostel ? handleAddSubmit : handleEditSubmit}>
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
                setHostel({ name: "", location: "", price: "", ratings: "" });
              }}
              className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        // Hostel List with Actions
        <>
          <h1 className="text-3xl font-bold mb-6">Hostel Management</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Location</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hostels.map((hostel) => (
                  <tr key={hostel._id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{hostel.name}</td>
                    <td className="border px-4 py-2">{hostel.location}</td>
                    <td className="border px-4 py-2">${hostel.price}</td>
                    <td className="border px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingHostel(true);
                          setHostel(hostel); // Pre-fill form with hostel details
                        }}
                        className="bg-[#1ABC9C] text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(hostel._id)}
                        className="bg-[#2C3E50] text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setAddingHostel(true)}
                className="bg-[#1ABC9C] text-white px-6 py-2 rounded"
              >
                Add New Hostel
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  </div>
);
}

export default Dashboard;
