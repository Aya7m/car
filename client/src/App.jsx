import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBooking from "./pages/MyBooking";
import Footer from "./components/Footer";
import Layout from "./pages/Dashboard/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddCar from "./pages/Dashboard/AddCar";
import ManageCare from "./pages/Dashboard/manageCars";
import ManageBooking from "./pages/Dashboard/ManageBooking";
import Login from "./components/Login";
import {Toaster} from 'react-hot-toast'
import { useAppContext } from "./context/AppContext";

const App = () => {
  const {showLogin}=useAppContext()


  

  // remove navbar from dashboard
  const isOwnerPage = useLocation().pathname.startsWith("/owner");
  return (
    <>
    <Toaster/>
      {showLogin && <Login/>}
      {!isOwnerPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBooking />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCare />} />
          <Route path="manage-bookings" element={<ManageBooking />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
