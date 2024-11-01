import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HostelList from './HostelList';
import HostelDetailWrapper from './HostelDetailWrapper';

const Hostel1 = () => {
  return (
    <Routes>
      {/* Route for the list of hostels */}
      <Route path="/" element={<HostelList />} />
      {/* Route for individual hostel details */}
      <Route path="/:hostelName" element={<HostelDetailWrapper />} />
    </Routes>
  );
};

export default Hostel1;


