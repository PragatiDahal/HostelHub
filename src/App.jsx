import React from "react"
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./Component/Navbar"
import Home from "./Component/Home";
import Featured from "./Component/Hostels/Featured";
import Offer from "./Component/Offer";
import Booking from "./Component/Booking";
import Testimonials from "./Component/Testimonials";
import Footer from "./Component/Footer";

function App() {
 

  return (
    <>
    <Router>
      <Navbar/>
      <Home/>
      <Featured/>
      <Offer/>
      <Booking/>
      <Testimonials/>
      <Footer/>
      </Router>
    </>
  )
}

export default App
