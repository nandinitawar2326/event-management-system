import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {
    axios.post("http://localhost:5000/signup", {
      name,
      email,
      password
    }).then(() => {
      alert("Signup Successful 🎉");
      window.location.href = "/login";
    }).catch((err) => {
      console.log(err);
      alert("Signup Failed ❌");
    });
  };

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "white" }}>
      
      <Navbar />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}>
        <div style={{ background: "#1e293b", padding: "30px", borderRadius: "10px", width: "300px" }}>
          
          <h2>Signup</h2>

          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <button
            onClick={signup}
            style={{
              background: "#6366f1",
              color: "white",
              width: "100%",
              padding: "10px",
              border: "none"
            }}
          >
            Signup
          </button>

        </div>
      </div>
    </div>
  );
}

export default Signup;