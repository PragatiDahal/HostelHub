import React from "react"
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./Component/Navbar"
import Home from "./Component/Home";

function App() {
 

  return (
    <>
    <Router>
      <Navbar/>
      <Home/>
      </Router>
    </>
  )
}

export default App
