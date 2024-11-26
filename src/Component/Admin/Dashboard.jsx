import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() 
  {
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const navigate = useNavigate();
  
    // Fetch hostels from the API
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
  
    // Delete hostel by name
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this hostel?")) {
        axios
          .delete('http://localhost:5000/api/hostels/${hostelName}')
          .then(() => {
            setHostels(hostels.filter((hostel) => hostel._id !== id));
          })
          .catch((err) => {
            console.error("Failed to delete hostel", err);
            alert("Error deleting hostel.");
          });
      }
    };
  
    // Handle logout
    const handleLogout = () => {
      localStorage.removeItem("authToken");
      navigate("/login");
    };
  
    return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1ABC9C] text-white flex flex-col">
          <h1 className="text-2xl font-bold p-6 font-[poppins]">Admin Dashboard</h1>
          <nav className="flex flex-col space-y-4 px-6">
            <Link to="/dashboard" className="hover:bg-[#16a085] p-2 rounded font-[poppins]">
              Dashboard
            </Link>
            <Link to="/hostels" className="hover:bg-[#16a085] p-2 rounded font-[poppins]">
              Hostels
            </Link>
            <Link to="/users" className="hover:bg-[#16a085] p-2 rounded font-[poppins]">
              Users
            </Link>
            <button
              onClick={handleLogout}
              className="hover:bg-[#16a085]  p-2 rounded text-left font-[poppins]"
            >
              Logout
            </button>
          </nav>
        </aside>
  
        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 font-[poppins]  ">Hostel Management</h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border px-4 py-2 font-[poppins]">Name</th>
                    <th className="border px-4 py-2 font-[poppins]">Location</th>
                    <th className="border px-4 py-2 font-[poppins]">Price</th>
                    <th className="border px-4 py-2 font-[poppins]">Ratings</th>
                    <th className="border px-4 py-2 font-[poppins]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hostels.map((hostel) => (
                    <tr key={hostel._id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2 font-[poppins]">{hostel.name}</td>
                      <td className="border px-4 py-2 font-[poppins]">{hostel.location}</td>
                      <td className="border px-4 py-2 font-[poppins]">{hostel.price}</td>
                      <td className="border px-4 py-2 font-[poppins]">{hostel.ratings}</td>
                      <td className="border px-4 py-2 flex space-x-2 font-[poppins]">
                        <Link to={`/edit-hostel/${hostel._id}`}>
                          <button className="bg-[#1ABC9C] text-white px-3 py-1 rounded font-[poppins]">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(hostel._id)}
                          className="bg-[#2C3E50] text-white px-3 py-1 rounded font-[poppins]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-4">
                <Link to="/hostelform">
                  <button className="bg-[#1ABC9C] text-white px-6 py-2 rounded font-[poppins]">
                    Add New Hostel
                  </button>
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

export default Dashboard;
