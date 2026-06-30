import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Admin from "./pages/Admin";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 PROTECTED ROUTE (USER)
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  // 👑 ADMIN ROUTE
  const AdminRoute = ({ children }) => {
    return user && user.role === "admin" ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>

        {/* 🏠 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 USER PROTECTED */}
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* 👑 ADMIN PROTECTED */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;