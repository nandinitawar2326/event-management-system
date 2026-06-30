import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyBookings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:5000/my-bookings/${user.id}`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log("Error fetching bookings:", err);
      });
  }, [user]);

  // ❌ CANCEL FUNCTION
  const cancelBooking = (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    axios.delete(`http://localhost:5000/cancel-booking/${id}`)
      .then(() => {
        // ✅ REMOVE FROM UI
        setBookings(bookings.filter((b) => b.id !== id));
        alert("Booking Cancelled ❌");
      })
      .catch(() => alert("Error cancelling booking"));
  };

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "white" }}>
      
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h2 style={{ marginBottom: "20px" }}>🎟️ My Bookings</h2>

        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          bookings.map((b) => (
            <div
              key={b.id}
              style={{
                background: "#1e293b",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)"
              }}
            >
              <h3>{b.event}</h3>
              <p><b>Time:</b> {b.time}</p>
              <p><b>Members:</b> {b.members}</p>
              <p><b>Price:</b> ₹{b.price}</p>

              {/* ❌ CANCEL BUTTON */}
              <button
                onClick={() => cancelBooking(b.id)}
                style={{
                  marginTop: "10px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Cancel Booking
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBookings;