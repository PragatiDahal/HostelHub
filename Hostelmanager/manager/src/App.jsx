import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManagerDashboard from "./Component/ManagerDashboard";
import Managerlogin from "./Component/Managerlogin";

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Managerlogin />} />
      <Route path="dashboard" element={<ManagerDashboard/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
