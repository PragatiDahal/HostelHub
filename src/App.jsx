import React from "react"
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./Component/Navbar"
import Home from "./Component/Home";
import Featured from "./Component/Featured";

function App() {
 

  return (
    <>
    <Router>
      <Navbar/>
      <Home/>
      <Featured/>
      </Router>
    </>
  )
}

export default App
