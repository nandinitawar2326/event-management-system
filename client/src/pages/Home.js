import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// images (same as yours)
import music from "../images/music.jpg.jpg";
import tech from "../images/tech.jpg.jpg";
import workshop from "../images/workshop.jpg.jpg";
import startup from "../images/startup.jpg.jpg";
import comedy from "../images/comedy.jpg.jpg";
import food from "../images/food.jpg.jpg";
import fashion from "../images/fashion.jpg.jpg";
import gaming from "../images/gaming.jpg";
import art from "../images/art.jpg.jpg";
import dance from "../images/dance.jpg.jpg";
import photo from "../images/photo.jpg.jpg";
import hackathon from "../images/hackathon.jpg.jpg";
import business from "../images/business.jpg.jpg";
import standup from "../images/standup.jpg.jpg";
import concert from "../images/concert.jpg.jpg";
import mic from "../images/mic.jpg.jpg";
import ai from "../images/ai.jpg.jpg";
import yoga from "../images/yoga.jpg.jpg";
import film from "../images/film.jpg.jpg";
import summit from "../images/summit.jpg.jpg";
import concert2 from "../images/concert2.jpg.jpg";
import marketing from "../images/marketing.jpg.jpg";
import streetfood from "../images/streetfood.jpg.jpg";
import dance2 from "../images/dance2.jpg.jpg";
import photo2 from "../images/photo2.jpg.jpg";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [current, setCurrent] = useState(0);

  // 🎬 Banner
  const bannerEvents = [
    { img: music, title: "Music Fest 🎶" },
    { img: food, title: "Food Carnival 🍔" },
    { img: tech, title: "Tech Expo 🚀" },
    { img: concert, title: "Live Concert 🎤" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % bannerEvents.length);
    }, 8000);
    return () => clearTimeout(timer);
  }, [current, bannerEvents.length]);

  // 🎯 Events
  const events = [
    { title: "Music Fest", category: "Music", date: "10 April", location: "Mumbai", img: music },
    { title: "Tech Seminar", category: "Tech", date: "15 April", location: "Pune", img: tech },
    { title: "Workshop", category: "Business", date: "20 April", location: "Delhi", img: workshop },
    { title: "Startup Meetup", category: "Business", date: "18 April", location: "Bangalore", img: startup },
    { title: "Comedy Night", category: "Comedy", date: "22 April", location: "Hyderabad", img: comedy },
    { title: "Food Festival", category: "Food", date: "25 April", location: "Ahmedabad", img: food },
    { title: "Fashion Show", category: "Business", date: "28 April", location: "Jaipur", img: fashion },
    { title: "Gaming Expo", category: "Tech", date: "30 April", location: "Chennai", img: gaming },
    { title: "Art Exhibition", category: "Business", date: "2 May", location: "Kolkata", img: art },
    { title: "Dance Competition", category: "Music", date: "5 May", location: "Mumbai", img: dance },
    { title: "Photography Walk", category: "Business", date: "7 May", location: "Goa", img: photo },
    { title: "Coding Hackathon", category: "Tech", date: "10 May", location: "Pune", img: hackathon },
    { title: "Business Conference", category: "Business", date: "12 May", location: "Delhi", img: business },
    { title: "Standup Comedy Show", category: "Comedy", date: "15 May", location: "Bangalore", img: standup },
    { title: "Live Concert", category: "Music", date: "18 May", location: "Hyderabad", img: concert },
    { title: "Open Mic Night", category: "Comedy", date: "20 May", location: "Mumbai", img: mic },
    { title: "AI Conference", category: "Tech", date: "22 May", location: "Bangalore", img: ai },
    { title: "Yoga Retreat", category: "Health", date: "25 May", location: "Rishikesh", img: yoga },
    { title: "Film Festival", category: "Entertainment", date: "28 May", location: "Goa", img: film },
    { title: "Entrepreneur Summit", category: "Business", date: "30 May", location: "Delhi", img: summit },
    { title: "Music Concert Night", category: "Music", date: "2 June", location: "Hyderabad", img: concert2 },
    { title: "Digital Marketing Workshop", category: "Business", date: "5 June", location: "Pune", img: marketing },
    { title: "Street Food Carnival", category: "Food", date: "7 June", location: "Indore", img: streetfood },
    { title: "Dance Workshop", category: "Music", date: "10 June", location: "Chennai", img: dance2 },
    { title: "Photography Exhibition", category: "Art", date: "12 June", location: "Jaipur", img: photo2 }
  ];

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || e.category === category)
  );

  return (
    <div style={{ background: "#0f172a", color: "white", minHeight: "100vh" }}>

      <Navbar />

      {/* SEARCH */}
      <div style={{ textAlign: "center", padding: "20px" }}>
        <input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "60%",
            padding: "12px",
            borderRadius: "25px",
            border: "none"
          }}
        />
      </div>
      


      {/* BANNER */}
      <div style={{ width: "90%", margin: "auto" }}>
        <img src={bannerEvents[current].img}
        alt={bannerEvents[current].title} 
          style={{ width: "100%", height: "300px", borderRadius: "12px" }}
        />
        <h2>{bannerEvents[current].title}</h2>
      </div>

      {/* CATEGORY */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginTop: "20px"
      }}>
        {["All", "Music", "Tech", "Food", "Comedy", "Business"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              background: category === c ? "#6366f1" : "#1e293b",
              padding: "8px 15px",
              borderRadius: "20px",
              border: "none",
              color: "white"
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 🔥 NEW SCROLL SECTION */}
      <div style={{ padding: "30px" }}>
        <h2>Trending Events</h2>

        <div style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto"
        }}>
          {events.slice(0, 10).map((e, i) => (
            <div key={i} style={{
              minWidth: "200px",
              background: "#1e293b",
              borderRadius: "10px"
            }}>
              <img src={e.img} alt={e.title} style={{ width: "100%", height: "140px" }} />
              <div style={{ padding: "10px" }}>
                <h4>{e.title}</h4>
                <p>{e.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ALL EVENTS */}
      <div style={{ padding: "30px" }}>
        <h2>All Events</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {filtered.map((e, i) => (
            <div key={i} style={{ background: "#1e293b", borderRadius: "10px" }}>
              <img src={e.img} alt={e.title } style={{ width: "100%", height: "170px" }} />
              <div style={{ padding: "10px" }}>
                <h3>{e.title}</h3>
                <p>{e.date}</p>
                <p>{e.location}</p>

                <button
                  onClick={() => window.location.href = `/booking?event=${e.title}`}
                  style={{
                    background: "#6366f1",
                    color: "white",
                    padding: "10px",
                    width: "100%",
                    border: "none",
                    borderRadius: "6px"
                  }}
                >
                  Book Now
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔻 FOOTER */}
      <div style={{ background: "#020617", padding: "40px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "30px"
        }}>

          <div>
            <h2 style={{ color: "#6366f1" }}>EventHub</h2>
            <p>Discover & book amazing events easily.</p>
          </div>

          <div>
            <h3>Explore</h3>
            <p>Events</p>
            <p>Categories</p>
            <p>Offers</p>
          </div>

          <div>
            <h3>Support</h3>
            <p>Help Center</p>
            <p>Privacy Policy</p>
          </div>

          <div>
            <h3>Contact</h3>
            <p>support@eventhub.com</p>
            <p>+91 9876543210</p>
          </div>

        </div>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          © 2026 EventHub
        </p>
      </div>

    </div>
  );
}

export default Home;