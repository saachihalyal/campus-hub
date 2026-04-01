import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // 🎯 Event Data
  const eventsData = [
    { id: 1, title: "Hackathon", category: "Tech" },
    { id: 2, title: "Dance Workshop", category: "Cultural" },
    { id: 3, title: "Football Match", category: "Sports" },
  ];

  // 🧠 State
  const [events] = useState(eventsData);
  const [filter, setFilter] = useState("All");
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [points, setPoints] = useState(0);

  // 🔍 Filter Logic
  const filteredEvents =
    filter === "All"
      ? events
      : events.filter((event) => event.category === filter);

  // 📩 RSVP Logic
  const handleRSVP = (event) => {
    const alreadyRegistered = registeredEvents.some(
      (e) => e.id === event.id
    );

    if (!alreadyRegistered) {
      setRegisteredEvents([...registeredEvents, event]);
      setPoints((prev) => prev + 10);
    }
  };

  // 💾 Load from localStorage
  useEffect(() => {
    const savedEvents =
      JSON.parse(localStorage.getItem("registeredEvents")) || [];
    const savedPoints =
      JSON.parse(localStorage.getItem("points")) || 0;

    setRegisteredEvents(savedEvents);
    setPoints(savedPoints);
  }, []);

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "registeredEvents",
      JSON.stringify(registeredEvents)
    );
  }, [registeredEvents]);

  useEffect(() => {
    localStorage.setItem("points", JSON.stringify(points));
  }, [points]);

  return (
    <div className="app">
      <h1>🎓 Campus Event Hub</h1>

      {/* 🏆 Points */}
      <h2>Campus Points: {points}</h2>

      {/* 🔍 Filters */}
      <div>
        {["All", "Tech", "Cultural", "Sports"].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* 📅 Events */}
      <h2>Events</h2>
      {filteredEvents.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.category}</p>

          <button
            onClick={() => handleRSVP(event)}
            disabled={registeredEvents.some(
              (e) => e.id === event.id
            )}
          >
            {registeredEvents.some((e) => e.id === event.id)
              ? "Registered ✅"
              : "Register"}
          </button>
        </div>
      ))}

      {/* 📩 Registered Events */}
      <h2>My Events</h2>
      {registeredEvents.map((e) => (
        <p key={e.id}>{e.title}</p>
      ))}
    </div>
  );
}

export default App;
