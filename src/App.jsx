import React from "react"
import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom';
import Navbar from "./Component/Navbar"
import Home from "./Component/Home";
import About from"./Component/About";
import Contact from "./Component/Contact";
import Footer from "./Component/Footer";
import Hostel1 from"./Component/Hostels/Hostel1";
import Hostels from"./Component/Hostels";
import UserSignUp from "./Component/Login/UserSignUp";
import UserSignIn from "./Component/Login/UserSignIn";
import AdminSignIn from "./Component/Login/AdminSignIn";
import HostelRegister from "./Component/Login/HostelRegister";
function App() {
 

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
      <Route path="*" element={<Navigate to='/'/>} />
      <Route path="/" element={<Home />} />
      <Route path="usersignin"  element={<UserSignIn />} />
      <Route path="usersignup"  element={<UserSignUp />} />
      <Route path="adminsignin"  element={<AdminSignIn />} />
      <Route path="hostelregister"  element={<HostelRegister />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />}/>
      <Route path="hostels" element={<Hostels />} />
      </Routes>
      <Footer/>
      </Router>
    </>
  )
}

export default App
