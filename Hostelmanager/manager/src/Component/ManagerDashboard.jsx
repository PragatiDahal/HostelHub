import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

function ManagerDashboard() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hostelStats, setHostelStats] = useState(null);
  const navigate = useNavigate();

  // Fetch hostel statistics for pie chart
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hosteldetail")
      .then((res) => {
        const stats = {
          Kathmandu: { Male: 0, Female: 0 },
          Bhaktapur: { Male: 0, Female: 0 },
          Lalitpur: { Male: 0, Female: 0 },
        };
        res.data.forEach((hostel) => {
          if (stats[hostel.location]) {
            stats[hostel.location][hostel.gender] += 1;
          }
        });
        setHostelStats(stats);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch hostel statistics.");
        setLoading(false);
      });
  }, []);

  // Fetch all hostels with price and gender
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hostels") // Update the endpoint to fetch price and gender
      .then((res) => {
        setHostels(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch hostels.");
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/managerlogin");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1ABC9C] text-white flex flex-col">
        <h1 className="text-2xl font-bold p-6">Manager Dashboard</h1>
        <nav className="flex flex-col space-y-4 px-6">
          <Link to="/hostelregister" className="hover:bg-[#16a085] p-2 rounded">
            Hostel Register
          </Link>
          <Link to="/roomavailable" className="hover:bg-[#16a085] p-2 rounded">
            Room Availability 
          </Link>
          <Link to="/hostelroom" className="hover:bg-[#16a085] p-2 rounded">
            Add Hostel Room
          </Link>
          <Link to="/updateroom" className="hover:bg-[#16a085] p-2 rounded">
            Update Hostel Room
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
        <h1 className="text-3xl font-bold mb-4">Hostel Overview</h1>

        {/* Pie Chart */}
        <div className="mb-6">
          {hostelStats && (
            <Pie
              data={{
                labels: [
                  "Kathmandu Boys",
                  "Kathmandu Girls",
                  "Bhaktapur Boys",
                  "Bhaktapur Girls",
                  "Lalitpur Boys",
                  "Lalitpur Girls",
                ],
                datasets: [
                  {
                    label: "Hostel Distribution",
                    data: [
                      hostelStats.Kathmandu.Male,
                      hostelStats.Kathmandu.Female,
                      hostelStats.Bhaktapur.Male,
                      hostelStats.Bhaktapur.Female,
                      hostelStats.Lalitpur.Male,
                      hostelStats.Lalitpur.Female,
                    ],
                    backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#4BC0C0",
                      "#9966FF",
                      "#FF9F40",
                    ],
                    hoverOffset: 4,
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
            />
          )}
        </div>

        {/* Hostel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map((hostel) => (
            <div
              key={hostel._id}
              className="bg-white shadow-md rounded p-4 hover:shadow-lg"
            >
              <img
                src={
                  hostel.image
                    ? `http://localhost:5000/uploads/${hostel.image}`
                    : "default-image.jpg"
                }
                alt={hostel.name}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="text-xl font-bold mt-4">{hostel.name}</h2>
              <p className="mt-2 text-gray-700">
                <strong>Price:</strong> {hostel.price}
              </p>
              <p className="mt-2 text-gray-700">
                <strong>Gender:</strong> {hostel.gender}
              </p>
              <p className="mt-2 text-gray-700">
                <strong>Facilities:</strong> {hostel.facilities || "N/A"}
              </p>
              <button
                className="mt-4 bg-[#1ABC9C] text-white px-4 py-2 rounded"
                onClick={() => navigate(`/hosteldetail/${hostel._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ManagerDashboard;
