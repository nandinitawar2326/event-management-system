import React from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.navbar}>

      {/* 🔷 LOGO */}
      <div style={styles.logo}>
        🎟️ <span style={{ marginLeft: "5px" }}>EventHub</span>
      </div>

      {/* 🔗 NAV LINKS */}
      <div style={styles.links}>

        <a href="/" style={styles.link}>
          🏠 Home
        </a>

        {user && (
          <a href="/my-bookings" style={styles.link}>
            📖 My Bookings
          </a>
        )}

        {/* 🔐 ADMIN LINK */}
        {user?.role === "admin" && (
          <a href="/admin" style={styles.adminLink}>
            📊 Admin
          </a>
        )}

        {/* 👤 USER NAME */}
        {user && (
          <span style={styles.username}>
            👤 {user.name}
          </span>
        )}

        {/* 🔐 AUTH BUTTONS */}
        {!user ? (
          <>
            <a href="/login" style={styles.loginBtn}>
              Login
            </a>

            <a href="/signup" style={styles.signupBtn}>
              Signup
            </a>
          </>
        ) : (
          <button
            style={styles.logoutBtn}
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    background: "linear-gradient(90deg, #020617, #0f172a, #1e293b)",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center"
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    transition: "0.3s"
  },

  adminLink: {
    textDecoration: "none",
    color: "#facc15",
    fontWeight: "bold"
  },

  username: {
    color: "#94a3b8",
    fontSize: "14px"
  },

  loginBtn: {
    textDecoration: "none",
    color: "white",
    border: "1px solid #6366f1",
    padding: "6px 12px",
    borderRadius: "6px"
  },

  signupBtn: {
    textDecoration: "none",
    background: "#6366f1",
    color: "white",
    padding: "6px 12px",
    borderRadius: "6px"
  },

  logoutBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Navbar;