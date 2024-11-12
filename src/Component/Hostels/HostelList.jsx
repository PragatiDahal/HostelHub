import React, { useEffect, useState } from 'react';
import HostelCard from './HostelCard';

const HostelList = () => {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    // Fetch hostels list from API
    fetch(`http://localhost:5000/api/hosteldetail`)
      .then(response => response.json())
      .then(data => setHostels(data))
      .catch(error => console.error('Error fetching hostel list:', error));
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
