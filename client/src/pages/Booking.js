import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Booking() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [event, setEvent] = useState("");
  const [time, setTime] = useState("");
  const [members, setMembers] = useState(1);
  const [price, setPrice] = useState(500);

  // ✅ GET EVENT FROM URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedEvent = params.get("event");
    if (selectedEvent) setEvent(selectedEvent);
  }, []);

  // 💰 TOTAL PRICE
  const total = members * price;

  const book = () => {
    if (!event || !time) {
      alert("Please fill all details");
      return;
    }

    axios.post("http://localhost:5000/book", {
      userId: user.id,
      name: user.name,
      event,
      time,
      members,
      price: total
    })
    .then(() => {
      alert("Booking Confirmed 🎉");
    })
    .catch(() => alert("Error"));
  };

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "white" }}>
      <Navbar />

      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px"
      }}>
        <div style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
          width: "380px",
          boxShadow: "0 0 15px rgba(0,0,0,0.4)"
        }}>

          <h2 style={{ marginBottom: "20px" }}>🎟️ Book Event</h2>

          {/* EVENT */}
          <div style={{ marginBottom: "15px" }}>
            <label>Event</label>
            <input
              value={event}
              readOnly
              style={inputStyle}
            />
          </div>

          {/* TIME SLOTS ✅ */}
          <div style={{ marginBottom: "15px" }}>
            <label>Select Time</label>
            <select
              onChange={(e) => setTime(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select Time</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
              <option value="8:00 PM">8:00 PM</option>
            </select>
          </div>

          {/* MEMBERS */}
          <div style={{ marginBottom: "15px" }}>
            <label>Members</label>
            <input
              type="number"
              value={members}
              min="1"
              onChange={(e) => setMembers(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* TICKET TYPE */}
          <div style={{ marginBottom: "15px" }}>
            <label>Ticket Type</label>
            <select
              onChange={(e) => setPrice(e.target.value)}
              style={inputStyle}
            >
              <option value="500">Standard - ₹500</option>
              <option value="1000">VIP - ₹1000</option>
              <option value="1500">Gold - ₹1500</option>
              <option value="2000">Premium - ₹2000</option>
            </select>
          </div>

          {/* TOTAL */}
          <div style={{
            background: "#020617",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            <h3>Total: ₹{total}</h3>
          </div>

          {/* BUTTON */}
          <button
            onClick={book}
            style={{
              background: "#6366f1",
              color: "white",
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Confirm Booking
          </button>

        </div>
      </div>
    </div>
  );
}

// ✨ INPUT STYLE
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "6px",
  border: "none",
  outline: "none"
};

export default Booking;