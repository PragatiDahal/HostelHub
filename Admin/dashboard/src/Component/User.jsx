import React, { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch all users
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/users") // Replace with your API endpoint
        .then((res) => {
          setUsers(res.data); // Set the fetched data
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          setError("Failed to load user data");
          setLoading(false);
        });
    }, []);
  
    // Handle Delete button click
    const handleDelete = (id) => {
      axios
        .delete(`http://localhost:5000/api/users/${id}`) // Replace with your DELETE endpoint
        .then((res) => {
          alert("User deleted successfully!");
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Remove deleted user from the list
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
          alert("Error deleting user.");
        });
    };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
  
    return (
      <div className="container mx-auto p-6 bg-[#F2F4F4]">
        <h1 className="text-2xl font-semibold mb-6">User Management</h1>
  
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Username</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone Number</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user.userName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phoneNumber}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-[#E74C3C] text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  


export default User;
