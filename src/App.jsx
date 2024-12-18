import React from "react";
import "leaflet/dist/leaflet.css";
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
import BlogDetail from "./Component/Blog/BlogDeatail"; // Ensure correct file name
import UploadBlog from "./Component/Blog/UploadBlog";
import Hostels from "./Component/Hostels";
import UserSignUp from "./Component/Login/UserSignUp";
import UserSignIn from "./Component/Login/UserSignIn";
import AdminSignIn from "./Component/Login/AdminSignIn";
import HostelRegister from "./Component/Login/HostelRegister";
import Dashboard from "./Component/Admin/Dashboard";
import HostelForm from "./Component/Admin/HostelForm";
import DistancePath from "./Component/Hostels/DistancePath";
import Roomdetails from "./Component/Hostels/Roomdetails";
import { AuthProvider } from "./Component/Contexts/AuthContext";
// import { StoreContextProvider } from "./Component/Contexts/StoreContext";
import HostelBooking from "./Component/Hostels/HostelBooking";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
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
            <Route
              path="/hosteldetail/:hostelName/:roomType"
              element={<Roomdetails />}
            />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="hostelform" element={<HostelForm />} />
            <Route
              path="/distancepath/:hostelName"
              element={<DistancePath />}
            />
            <Route path="/hostelbooking" element={<HostelBooking />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
