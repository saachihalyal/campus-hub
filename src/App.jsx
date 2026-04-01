import { useState, useEffect } from "react";

function App() {
  const eventsData = [
    { id: 1, title: "Hackathon", category: "Tech" },
    { id: 2, title: "Dance Workshop", category: "Cultural" },
    { id: 3, title: "Football Match", category: "Sports" },
  ];

  const [events] = useState(eventsData);
  const [filter, setFilter] = useState("All");
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [points, setPoints] = useState(0);

  const filteredEvents =
    filter === "All"
      ? events
      : events.filter((event) => event.category === filter);

  const handleRSVP = (event) => {
    const exists = registeredEvents.some((e) => e.id === event.id);
    if (!exists) {
      setRegisteredEvents([...registeredEvents, event]);
      setPoints(points + 10);
    }
  };

  useEffect(() => {
    const savedEvents =
      JSON.parse(localStorage.getItem("registeredEvents")) || [];
    const savedPoints =
      JSON.parse(localStorage.getItem("points")) || 0;

    setRegisteredEvents(savedEvents);
    setPoints(savedPoints);
  }, []);

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
    <div style={{ textAlign: "center" }}>
      <h1>🎓 Campus Event Hub</h1>
      <h2>Points: {points}</h2>

      <div>
        {["All", "Tech", "Cultural", "Sports"].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>

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

      <h2>My Events</h2>
      {registeredEvents.map((e) => (
        <p key={e.id}>{e.title}</p>
      ))}
    </div>
  );
}

export default App;
      
  
