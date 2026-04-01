import { useState, useEffect } from "react";
<<<<<<< HEAD
import "./App.css";
import { Calendar, Users, Trophy, Plus, QrCode, Settings, User, Bell, Star , Award, QrCode} from "lucide-react";

function App() {
  // === DATA (Jain College events from your screenshot + more) ===
  const initialEvents = [
    {
      id: 1,
      title: "Tech Talk: AI in Healthcare",
      date: "Tomorrow 10 AM",
      location: "Auditorium",
      type: "Workshop",
      rsvpCount: 30,
      description: "Learn how AI is transforming healthcare with real case studies from doctors and engineers.",
      category: "Tech",
      points: 10,
    },
    {
      id: 2,
      title: "Coding Competition",
      date: "Today 2 PM",
      location: "Lab 301",
      type: "Competition",
      rsvpCount: 50,
      description: "Solve 5 exciting problems in 2 hours. Win exciting prizes!",
      category: "Tech",
      points: 15,
    },
    {
      id: 3,
      title: "Dance Club Performance",
      date: "Friday 6 PM",
      location: "Open Ground",
      type: "Cultural",
      rsvpCount: 20,
      description: "Annual dance showcase by the Jain Dance Club. Open to all!",
      category: "Cultural",
      points: 5,
    },
    {
      id: 4,
      title: "Startup Pitch Workshop",
      date: "Saturday 11 AM",
      location: "Seminar Hall",
      type: "Workshop",
      rsvpCount: 15,
      description: "Pitch your startup idea and get feedback from real investors.",
      category: "Tech",
      points: 10,
    },
  ];

  // === STATES ===
  const [events, setEvents] = useState(initialEvents);
  const [filter, setFilter] = useState("All");
  const badges = [
  { name: 'First Attendee', icon: '🏆', color: 'yellow' },
  { name: 'Code Warrior', icon: '💻', color: 'blue' },
  { name: 'Cultural Star', icon: '🎭', color: 'pink' },
];
  const [search, setSearch] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [points, setPoints] = useState(245); // your screenshot points
  const [activeTab, setActiveTab] = useState("discover");
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [themeColor, setThemeColor] = useState("#7c3aed"); // vibrant purple
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [notifications, setNotifications] = useState([]);
=======

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
>>>>>>> 3c4ee7bb365311489ecb7876985fa04540f79cdc

  // Load from localStorage
  useEffect(() => {
<<<<<<< HEAD
    const savedRegistered = JSON.parse(localStorage.getItem("registeredEvents")) || [];
    const savedPoints = JSON.parse(localStorage.getItem("points")) || 245;
    const savedProfile = JSON.parse(localStorage.getItem("profile")) || { name: "Moon", email: "moon@jain.ac.in" };
    setRegisteredEvents(savedRegistered);
    setPoints(savedPoints);
    setProfile(savedProfile);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));
    localStorage.setItem("points", JSON.stringify(points));
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [registeredEvents, points, profile]);

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || event.category === filter;
    return matchesSearch && matchesFilter;
  });

  // RSVP handler (now adds points + animation)
  const handleRSVP = (event) => {
    if (registeredEvents.some((e) => e.id === event.id)) return;

    setRegisteredEvents([...registeredEvents, event]);
    setPoints((prev) => prev + event.points);

    // Confetti effect (simple)
    console.log("🎉 +", event.points, "points! Total:", points + event.points);

    // Close modal
    setSelectedEvent(null);
  };

  // Add new event (for organizers/students)
  const addNewEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now(), rsvpCount: 0 }]);
  };

  // Apply for volunteering
  const applyVolunteer = (event) => {
    setNotifications([...notifications, `Your volunteer application for "${event.title}" is under review!`]);
    alert("✅ Application submitted! You will be notified in Profile.");
  };

  // Fake QR ticket
  const showQR = (event) => {
    alert(`📱 QR Ticket for ${event.title}\n\nScan this at the gate!\n\n(Imagine a real QR code here - we can add one in next step)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100" style={{ "--theme": themeColor }}>
      {/* NAVBAR */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 text-white rounded-2xl flex items-center justify-center text-2xl">🏛️</div>
            <h1 className="text-3xl font-bold text-gray-800">Campus Hub</h1>
            <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">Jain College of Engineering</span>
          </div>

          <div className="flex items-center gap-8 text-lg">
            <button onClick={() => setActiveTab("discover")} className={`flex items-center gap-2 ${activeTab === "discover" ? "text-violet-600 font-bold" : "text-gray-600"}`}>
              <Calendar size={22} /> Discover
            </button>
            <button onClick={() => setActiveTab("myevents")} className={`flex items-center gap-2 ${activeTab === "myevents" ? "text-violet-600 font-bold" : "text-gray-600"}`}>
              <Star size={22} /> My Events
            </button>
            <button onClick={() => setActiveTab("badges")} className={`flex items-center gap-2 ${activeTab === "badges" ? "text-violet-600 font-bold" : "text-gray-600"}`}>
              <Trophy size={22} /> Badges
            </button>
            <button onClick={() => setShowProfileModal(true)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <User size={22} />
            </button>
          </div>

          <div className="flex items-center gap-3 bg-white px-6 py-2 rounded-3xl shadow-inner">
            <div className="text-2xl">⭐</div>
            <div>
              <p className="font-bold text-3xl text-violet-600">{points}</p>
              <p className="text-xs -mt-1 text-gray-500">Campus Points</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* TAB CONTENT */}
        {activeTab === "discover" && (
          <>
            {/* Search & Filter */}
            <div className="flex gap-4 mb-8">
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-6 py-4 rounded-3xl border focus:outline-none focus:border-violet-400 text-lg"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-8 py-4 rounded-3xl border focus:outline-none"
              >
                <option value="All">All</option>
                <option value="Tech">Tech</option>
                <option value="Cultural">Cultural</option>
              </select>
            </div>

            {/* Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden"
                >
                  <div className="h-2 bg-gradient-to-r from-violet-500 to-indigo-500"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-semibold">{event.title}</h3>
                      <span className="bg-emerald-100 text-emerald-700 text-sm px-4 py-1 rounded-2xl">{event.type}</span>
                    </div>
                    <p className="text-gray-500 mt-1">{event.date} • {event.location}</p>
                    <div className="flex items-center gap-2 mt-6 text-sm">
                      <Users size={18} />
                      <span className="font-medium">{event.rsvpCount} students joined</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRSVP(event); }}
                      className="mt-6 w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-3xl font-semibold flex items-center justify-center gap-2"
                    >
                      + RSVP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* My Events Tab */}
        {activeTab === "myevents" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">My Events &amp; Volunteering</h2>
            {registeredEvents.length === 0 ? (
              <p className="text-gray-500">No events yet. Go discover some!</p>
            ) : (
              registeredEvents.map((event) => (
                <div key={event.id} className="bg-white p-6 rounded-3xl mb-4 flex justify-between items-center">
                  <div>
                    <h3>{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => showQR(event)} className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-3xl">
                      <QrCode size={20} /> Ticket
                    </button>
                    <button onClick={() => applyVolunteer(event)} className="flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-700 rounded-3xl">
                      Volunteer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
{/* ==================== BADGES TAB (YOUR PART) ==================== */}
{activeTab === 'badges' && (
  <div>
    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
      <Award size={24} /> My Badges
    </h2>

    <div className="grid grid-cols-3 gap-4">
      {badges.map((badge, i) => (
        <div
          key={i}
          className="bg-gray-900 rounded-3xl p-6 text-center hover:scale-105 transition"
        >
          <div className="text-6xl mb-4">{badge.icon}</div>
          <p className="font-medium">{badge.name}</p>
        </div>
      ))}
    </div>

    {/* QR BOX */}
    <div className="mt-12 bg-gray-900 rounded-3xl p-8 text-center">
      <QrCode size={80} className="mx-auto mb-4 text-purple-400" />

      <p className="text-lg font-medium mb-2">
        Show this QR at event entry
      </p>

      <div className="mx-auto w-52 h-52 bg-white text-black flex items-center justify-center text-xs font-mono border-8 border-purple-500 rounded-2xl">
        CAMPUS-HUB-2026<br />
        STUDENT-VERIFIED
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Tap to scan in real app
      </p>
    </div>
  </div>
)}
        {/* Badges Tab */}
        {activeTab === "badges" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3"><Trophy /> My Badges</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl text-center">🏆 First RSVP</div>
              <div className="bg-white p-8 rounded-3xl text-center">🔥 100 Points</div>
              <div className="bg-white p-8 rounded-3xl text-center">🎤 Event Host</div>
            </div>
          </div>
        )}

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-5 py-4 rounded-3xl border mb-4"
              />
              <input
                type="email"
                placeholder="Gmail ID"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-5 py-4 rounded-3xl border mb-6"
              />
              <div className="flex justify-between text-sm mb-8">
                <div>Campus Points: <span className="font-bold">{points}</span></div>
                <button onClick={() => setIsOrganizer(!isOrganizer)} className="text-violet-600 underline">
                  {isOrganizer ? "Switch to Student Mode" : "I want to Organize Events"}
                </button>
              </div>

              {/* Notifications */}
              {notifications.length > 0 && (
                <div className="mb-6">
                  <h4 className="flex items-center gap-2 mb-3"><Bell /> Notifications</h4>
                  {notifications.map((n, i) => <p key={i} className="text-sm bg-yellow-50 p-3 rounded-2xl mb-2">{n}</p>)}
                </div>
              )}

              <div className="flex gap-4">
                <button onClick={() => setShowProfileModal(false)} className="flex-1 py-4 border rounded-3xl">Close</button>
                <button onClick={() => setShowProfileModal(false)} className="flex-1 py-4 bg-violet-600 text-white rounded-3xl">Save Profile</button>
              </div>
            </div>
          </div>
        )}

        {/* Organizer Section */}
        {isOrganizer && (
          <div className="mt-12 border-t pt-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3"><Plus /> Organizer Dashboard</h2>
            
            {/* Add Event Form */}
            <div className="bg-white p-8 rounded-3xl mb-12">
              <h3 className="font-semibold mb-4">Add New Event</h3>
              <input id="newTitle" placeholder="Event Title" className="w-full mb-4 px-5 py-4 rounded-3xl border" />
              <div className="grid grid-cols-2 gap-4">
                <input id="newDate" placeholder="Date & Time" className="px-5 py-4 rounded-3xl border" />
                <input id="newLocation" placeholder="Location" className="px-5 py-4 rounded-3xl border" />
              </div>
              <button
                onClick={() => {
                  const title = document.getElementById("newTitle").value;
                  const date = document.getElementById("newDate").value;
                  const location = document.getElementById("newLocation").value;
                  if (title) {
                    addNewEvent({ title, date, location, type: "Workshop", description: "New event added by you!", category: "Tech", points: 10 });
                    alert("Event added successfully!");
                  }
                }}
                className="mt-6 w-full py-4 bg-emerald-600 text-white rounded-3xl"
              >
                Publish Event
              </button>
            </div>

            {/* Simple Analytics */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl text-center">Total Events: <span className="text-4xl font-bold text-violet-600">{events.length}</span></div>
              <div className="bg-white p-6 rounded-3xl text-center">Total RSVPs: <span className="text-4xl font-bold text-violet-600">{events.reduce((a, e) => a + e.rsvpCount, 0)}</span></div>
              <div className="bg-white p-6 rounded-3xl text-center">Most Popular: AI in Healthcare</div>
            </div>
          </div>
        )}

        {/* Theme Customizer */}
        <button
          onClick={() => {
            const colors = ["#7c3aed", "#ec4899", "#14b8a6", "#f59e0b"];
            const random = colors[Math.floor(Math.random() * colors.length)];
            setThemeColor(random);
            alert("Theme color updated! (Refresh to see full effect)");
          }}
          className="fixed bottom-8 right-8 bg-white shadow-2xl px-6 py-4 rounded-3xl flex items-center gap-3 text-xl"
        >
          <Settings /> Customize Look
        </button>
      </div>

      {/* EVENT DETAIL MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full mx-4 rounded-3xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold">{selectedEvent.title}</h2>
              <p className="text-gray-500">{selectedEvent.date} • {selectedEvent.location}</p>
              <p className="mt-8 text-gray-700">{selectedEvent.description}</p>
              <div className="mt-8 flex items-center gap-2 text-2xl">
                <Users /> <span className="font-bold">{selectedEvent.rsvpCount} students have joined</span>
              </div>
            </div>
            <div className="p-8 border-t flex gap-4">
              <button onClick={() => handleRSVP(selectedEvent)} className="flex-1 py-5 bg-violet-600 text-white rounded-3xl text-xl">Join Event (+{selectedEvent.points} pts)</button>
              <button onClick={() => applyVolunteer(selectedEvent)} className="flex-1 py-5 border-2 border-amber-400 text-amber-700 rounded-3xl text-xl">Apply as Volunteer</button>
            </div>
            <button onClick={() => setSelectedEvent(null)} className="absolute top-6 right-6 text-4xl text-gray-400">✕</button>
          </div>
        </div>
      )}
=======
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
>>>>>>> 3c4ee7bb365311489ecb7876985fa04540f79cdc
    </div>
  );
}

export default App;
      
  
