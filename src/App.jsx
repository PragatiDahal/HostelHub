import React from "react"
import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom';
import Navbar from "./Component/Navbar"
import Home from "./Component/Home";
import About from"./Component/About";
import Contact from "./Component/Contact";
import Footer from "./Component/Footer";
import Hostel1 from"./Component/Hostels/Hostel1";
import LogIn from"./Component/LogIn";

function App() {
 

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
      <Route path="*" element={<Navigate to='/'/>} />
      <Route path="/" element={<Home />} />
      <Route path="login"  element={<LogIn />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />}/>
      </Routes>
      <Footer/>
      </Router>
    </>
  )
}

export default App
