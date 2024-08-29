import React from "react"
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./Component/Navbar"
import Home from "./Component/Home";
import Featured from "./Component/Featured";
import Offer from "./Component/Offer";

function App() {
 

  return (
    <>
    <Router>
      <Navbar/>
      <Home/>
      <Featured/>
      <Offer/>
      </Router>
    </>
  )
}

export default App
