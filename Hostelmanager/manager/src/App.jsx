import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManagerDashboard from "./Component/ManagerDashboard";
import Managerlogin from "./Component/Managerlogin";
import Hostelregister from "./Component/Hostelregister";
import HostelRoomAvailability from "./Component/HostelRoomAvailability";
import HostelRoom from "./Component/HostelRoom";
import UpdateRoomAvailability from "./Component/UpdateRoomAvailability";
import BookingRequests from "./Component/BookingRequests";

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Managerlogin />} />
      <Route path="dashboard" element={<ManagerDashboard/>}/>
      <Route path="hostelregister" element={<Hostelregister/>}/>
      <Route path="roomavailable" element={<HostelRoomAvailability/>}/>
      <Route path="hostelroom" element={<HostelRoom/>}/>
      <Route path="updateroom" element={<UpdateRoomAvailability/>}/>
      <Route path="booking" element={<BookingRequests/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
