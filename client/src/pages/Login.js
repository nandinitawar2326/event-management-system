import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    if (!email || !password) {
      setError("Please enter all fields");
      return;
    }

    axios.post("http://localhost:5000/login", {
      email,
      password
    })
    .then(res => {
      if (typeof res.data === "string") {
        setError(res.data); // User not found / wrong password
        return;
      }

      // ✅ SAVE USER WITH ROLE
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔐 REDIRECT BASED ON ROLE
      if (res.data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    })
    .catch(() => {
      setError("Login failed");
    });
  };

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "white" }}>
      
      <Navbar />

      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "80px"
      }}>
        <div style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
          width: "320px",
          boxShadow: "0 0 15px rgba(0,0,0,0.4)"
        }}>
          
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            🔐 Login
          </h2>

          {/* EMAIL */}
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {/* ERROR */}
          {error && (
            <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
          )}

          {/* BUTTON */}
          <button
            onClick={login}
            style={{
              background: "#6366f1",
              color: "white",
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Login
          </button>

          {/* SIGNUP LINK */}
          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Don't have an account?{" "}
            <a href="/signup" style={{ color: "#6366f1" }}>
              Signup
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}

// ✨ STYLE
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "none",
  outline: "none"
};

export default Login;