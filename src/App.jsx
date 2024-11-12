import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import About from "./Component/About";
import Contact from "./Component/Contact";
import Footer from "./Component/Footer";
import Hostel1 from "./Component/Hostels/Hostel1";
import Blog from "./Component/Blog/Blog";
import BlogDetail from "./Component/Blog/BlogDeatail";
import UploadBlog from "./Component/Blog/UploadBlog";
import Hostels from "./Component/Hostels";
import UserSignUp from "./Component/Login/UserSignUp";
import UserSignIn from "./Component/Login/UserSignIn";
import AdminSignIn from "./Component/Login/AdminSignIn";
import HostelRegister from "./Component/Login/HostelRegister";
import Dashboard from "./Component/Admin/Dashboard";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="usersignin" element={<UserSignIn />} />
          <Route path="usersignup" element={<UserSignUp />} />
          <Route path="adminsignin" element={<AdminSignIn />} />
          <Route path="hostelregister" element={<HostelRegister />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="hostels" element={<Hostels />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="uploadblog" element={<UploadBlog />} />
          {/* Route for Hostel1 which handles the list and detail view */}
          <Route path="/hosteldetail/*" element={<Hostel1 />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
