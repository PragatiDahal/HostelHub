import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HostelDetail from "./HostelDetail";

const HostelDetailWrapper = () => {
  const { hostelName } = useParams(); // Extract hostel name from route parameters
  const [hostelData, setHostelData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/hosteldetail/${hostelName}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setHostelData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching hostel details:", error);
      }
    };
    fetchHostelDetails();
  }, [hostelName]); // Re-run effect if hostelName changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!hostelData) {
    return <div>Loading...</div>;
  }

  

  return <HostelDetail hostel={hostelData} />;
};

export default HostelDetailWrapper;
