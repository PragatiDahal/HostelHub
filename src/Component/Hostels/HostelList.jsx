import React, { useEffect, useState } from "react";
import HostelCard from "./HostelCard";

const HostelList = () => {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    // Fetch hostels list with sentiment scores from API
    fetch(`http://localhost:5000/api/hosteldetail`)
      .then((response) => response.json())
      .then((data) => {
        // Sort hostels by sentiment score (descending order)
        const sortedHostels = data.sort(
          (a, b) => (b.averageSentimentScore || 0) - (a.averageSentimentScore || 0)
        );
        setHostels(sortedHostels);
      })
      .catch((error) => console.error("Error fetching hostel list:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {hostels.map((hostel, index) => (
        <HostelCard key={index} hostel={hostel} />
      ))}
    </div>
  );
};

export default HostelList;

