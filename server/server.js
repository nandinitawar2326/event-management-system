const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());


// ✅ MySQL CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nandini123",
  database: "event_db"
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB Error:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});


// 🔐 ADMIN MIDDLEWARE (OPTIONAL 🔥)
const isAdmin = (req, res, next) => {
  const role = req.headers.role;

  if (role !== "admin") {
    return res.status(403).send("Access Denied ❌");
  }

  next();
};


// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});


// 🔐 SIGNUP
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err) => {
        if (err) {
          console.log("❌ Signup Error:", err);
          return res.status(500).send("Signup Failed");
        }

        res.send("Signup Success");
      }
    );

  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});


// 🔐 LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.length === 0) {
        return res.send("User not found");
      }

      const valid = await bcrypt.compare(password, result[0].password);

      if (!valid) {
        return res.send("Wrong password");
      }

      res.send({ user: result[0] }); // ✅ includes role
    }
  );
});


// 🎟️ BOOK EVENT
app.post("/book", (req, res) => {
  const { userId, name, event, time, members, price } = req.body;

  db.query(
    "INSERT INTO bookings (userId, name, event, time, members, price) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, name, event, time, members, price],
    (err) => {
      if (err) {
        console.log("❌ Booking Error:", err);
        return res.status(500).send("Error");
      }

      res.send("Booking Confirmed 🎉");
    }
  );
});


// 📄 USER BOOKINGS
app.get("/my-bookings/:id", (req, res) => {
  const userId = req.params.id;

  db.query(
    "SELECT * FROM bookings WHERE userId = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.log("❌ Fetch Error:", err);
        return res.status(500).send("Error");
      }

      res.send(result);
    }
  );
});


// ❌ CANCEL BOOKING
app.delete("/cancel-booking/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM bookings WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log("❌ Delete Error:", err);
        return res.status(500).send("Error deleting booking");
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("Booking not found");
      }

      res.send("Booking Cancelled ❌");
    }
  );
});


// 📊 ADMIN BOOKINGS (OPTIONAL PROTECT 🔐)
app.get("/admin/bookings", (req, res) => {
  db.query("SELECT * FROM bookings", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});


// 👥 ADMIN USERS
app.get("/admin/users", (req, res) => {
  db.query(
    "SELECT id, name, email, role FROM users",
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(result);
    }
  );
});


// 🚀 START SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});