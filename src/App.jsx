import React from "react"
import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom';
import Navbar from "./Component/Navbar"
import Home from "./Component/Home";
import About from"./Component/About";
import Contact from "./Component/Contact";
import Footer from "./Component/Footer";
import Hostel1 from"./Component/Hostels/Hostel1";
import SignUp from "./Component/SignUp";
import Hostels from "./Component/Hostels";
import SignIn from "./Component/SignIn";
function App() {
 

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
      <Route path="*" element={<Navigate to='/'/>} />
      <Route path="/" element={<Home />} />
      <Route path="signin"  element={<SignIn />} />
      <Route path="signup"  element={<SignUp />} />
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
