import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import AdminSignIn from "./Component/AdminSignIn";

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<AdminSignIn />} />
      <Route path="dashboard" element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
