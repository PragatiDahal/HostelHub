import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import HostelCard from './HostelCard';
import HostelDetail from './HostelDetail'; 

const hostels = [
  { name: 'Sunrise Boys Hostel', location: 'Balkumari, Lalitpur', price: 7000, description: 'A prime hostel...', image: 'sunrise.jpg', facilities: ['wifi', 'Laundry', 'Security', 'Sharedkitchen'], rating: '★★★★☆' },
  { name: 'Nice Boys Hostel', location: 'Jawalakhel, Lalitpur', price: 8000, description: 'A nice hostel...', image: 'nice.jpg', facilities: ['wifi', 'Laundry', 'Security', 'Sharedkitchen'], rating: '★★★★☆' },
  { name: 'Mighty Boys Hostel', location: 'Kupandol, Lalitpur', price: 7000, description: 'A mighty hostel...', image: 'mighty.jpg', facilities: ['wifi', 'Laundry', 'Security', 'Sharedkitchen'], rating: '★★★★☆' },
];

const HostelList = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {hostels.map((hostel, index) => (
      <HostelCard key={index} hostel={hostel} />
    ))}
  </div>
);

const HostelDetailWrapper = () => {
  const { hostelName } = useParams(); // Get the hostel name from the URL
  const hostel = hostels.find(h => h.name.toLowerCase().replace(/\s+/g, '-') === hostelName); // Find the matching hostel
  return <HostelDetail hostel={hostel} />;
};

const Hostel1 = () => {
  return (
    <Routes>
      <Route path="/" element={<HostelList />} />
      <Route path=":hostelName" element={<HostelDetailWrapper />} />
    </Routes>
  );
};

export default Hostel1;
