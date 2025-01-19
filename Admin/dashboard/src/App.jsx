import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import AdminSignIn from "./Component/AdminSignIn";
import User from "./Component/User";
import Contact from "./Component/Contact";
import BookingRequest from "./Component/BookingRequest";

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<AdminSignIn />} />
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="users" element={<User/>}/>
      <Route path="contacts" element={<Contact/>}/>
      <Route path="booking" element={<BookingRequest/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
