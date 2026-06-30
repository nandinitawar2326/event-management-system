import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

function Admin() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  // 🔐 PROTECT PAGE
  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Access Denied");
      window.location.href = "/";
    }
  }, [user]);

  // 📥 FETCH DATA
  useEffect(() => {
    axios.get("http://localhost:5000/admin/bookings", {
      headers: { role: user?.role }
    })
    .then(res => setBookings(res.data))
    .catch(err => console.log(err));

    axios.get("http://localhost:5000/admin/users", {
      headers: { role: user?.role }
    })
    .then(res => setUsers(res.data))
    .catch(err => console.log(err));
  }, [user]);

  // ❌ DELETE BOOKING
  const deleteBooking = (id) => {
    if (!window.confirm("Delete this booking?")) return;

    axios.delete(`http://localhost:5000/cancel-booking/${id}`)
      .then(() => {
        setBookings(bookings.filter(b => b.id !== id));
      })
      .catch(() => alert("Error deleting booking"));
  };

  // 💰 TOTAL REVENUE
  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);

  // 📊 CHART DATA
  const chartData = bookings.map((b) => ({
    name: b.event,
    revenue: b.price
  }));

  return (
    <div style={{ background: "#0f172a", color: "white", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "30px" }}>

        {/* 👤 ADMIN INFO */}
        <div style={adminBox}>
          <h2>👤 {user?.name}</h2>
          <p>ID: {user?.id}</p>
          <p style={{ color: "#6366f1" }}>Role: {user?.role}</p>
        </div>

        {/* 📊 STATS */}
        <div style={stats}>
          <div style={card}>Bookings: {bookings.length}</div>
          <div style={card}>Users: {users.length}</div>
          <div style={card}>Revenue: ₹{totalRevenue}</div>
        </div>

        {/* 📊 CHART */}
        <h2 style={{ marginTop: "30px" }}>Revenue Chart</h2>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 📋 BOOKINGS */}
        <h2 style={{ marginTop: "30px" }}>Manage Bookings</h2>

        {bookings.length === 0 ? (
          <p>No bookings available</p>
        ) : (
          bookings.map(b => (
            <div key={b.id} style={box}>
              <h3>{b.event}</h3>
              <p><b>User:</b> {b.name}</p>
              <p><b>Time:</b> {b.time}</p>
              <p><b>Members:</b> {b.members}</p>
              <p><b>Price:</b> ₹{b.price}</p>

              <button
                onClick={() => deleteBooking(b.id)}
                style={deleteBtn}
              >
                Delete Booking
              </button>
            </div>
          ))
        )}

        {/* 👥 USERS */}
        <h2 style={{ marginTop: "30px" }}>Users</h2>

        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map(u => (
            <div key={u.id} style={box}>
              <p><b>{u.name}</b></p>
              <p>{u.email}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

// 🎨 STYLES
const adminBox = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "20px"
};

const stats = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap"
};

const card = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "10px",
  minWidth: "150px",
  textAlign: "center"
};

const box = {
  background: "#1e293b",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "10px"
};

const deleteBtn = {
  marginTop: "10px",
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Admin;