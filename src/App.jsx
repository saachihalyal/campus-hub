import { useState, useEffect } from 'react';
import { Calendar, Award, FileText, Search, Plus, QrCode } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [points, setPoints] = useState(245);
  const [attendedEvents, setAttendedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const events = [
    { id: 1, title: 'Tech Talk: AI in Healthcare', category: 'Workshop', time: 'Tomorrow 10 AM', location: 'Auditorium', points: 30 },
    { id: 2, title: 'Coding Competition', category: 'Competition', time: 'Today 2 PM', location: 'Lab 301', points: 50 },
    { id: 3, title: 'Dance Club Performance', category: 'Cultural', time: 'Friday 6 PM', location: 'Open Ground', points: 20 },
    { id: 4, title: 'Startup Pitch Workshop', category: 'Workshop', time: 'Saturday 11 AM', location: 'Seminar Hall', points: 40 },
  ];

  const badges = [
    { name: 'First Attendee', icon: '🏆', color: 'yellow' },
    { name: 'Code Warrior', icon: '💻', color: 'blue' },
    { name: 'Cultural Star', icon: '🎭', color: 'pink' },
  ];

  useEffect(() => {
    const savedPoints = localStorage.getItem('campusPoints');
    const savedAttended = localStorage.getItem('attendedEvents');
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedAttended) setAttendedEvents(JSON.parse(savedAttended));
  }, []);

  const saveData = (newPoints, newAttended) => {
    setPoints(newPoints);
    setAttendedEvents(newAttended);
    localStorage.setItem('campusPoints', newPoints);
    localStorage.setItem('attendedEvents', JSON.stringify(newAttended));
  };

  const rsvpEvent = (event) => {
    if (attendedEvents.find(e => e.id === event.id)) return alert('Already RSVPed!');
    const newPoints = points + event.points;
    const newAttended = [...attendedEvents, event];
    saveData(newPoints, newAttended);
    alert(`✅ RSVPed! +${event.points} Campus Points added`);
  };

  const filteredEvents = events.filter(event => 
    (filterCategory === 'All' || event.category === filterCategory) &&
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-black p-6 flex justify-between items-center border-b border-purple-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500 rounded-2xl flex items-center justify-center text-3xl">🎓</div>
          <div>
            <h1 className="text-3xl font-bold text-purple-400">Campus Hub</h1>
            <p className="text-xs text-purple-300">Jain College of Engineering</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gray-900 px-5 py-2 rounded-3xl">
          <Award size={20} className="text-yellow-400" />
          <span className="font-bold text-xl">{points}</span>
          <span className="text-sm text-gray-400">Campus Points</span>
        </div>
      </div>

      <div className="flex border-b border-gray-700 text-sm">
        <button onClick={() => setActiveTab('discover')} className={`flex-1 py-4 ${activeTab === 'discover' ? 'border-b-4 border-purple-500 text-purple-400' : ''}`}>Discover Events</button>
        <button onClick={() => setActiveTab('badges')} className={`flex-1 py-4 ${activeTab === 'badges' ? 'border-b-4 border-purple-500 text-purple-400' : ''}`}>My Badges</button>
        <button onClick={() => setActiveTab('resume')} className={`flex-1 py-4 ${activeTab === 'resume' ? 'border-b-4 border-purple-500 text-purple-400' : ''}`}>My Resume</button>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {activeTab === 'discover' && (
          <>
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-4 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-3xl py-4 pl-12 text-white placeholder-gray-400"
                />
              </div>
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-3xl px-6 text-white"
              >
                <option value="All">All</option>
                <option value="Workshop">Workshop</option>
                <option value="Competition">Competition</option>
                <option value="Cultural">Cultural</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredEvents.map(event => (
                <div key={event.id} className="bg-gray-900 rounded-3xl p-6 flex justify-between items-center hover:scale-[1.02] transition">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-sm text-gray-400">{event.time} • {event.location}</p>
                    <span className="inline-block mt-3 px-4 py-1 bg-purple-900 text-purple-300 text-xs rounded-3xl">{event.category}</span>
                  </div>
                  <button 
                    onClick={() => rsvpEvent(event)}
                    className="bg-purple-500 hover:bg-purple-600 text-black px-8 py-3 rounded-3xl font-medium flex items-center gap-2 whitespace-nowrap"
                  >
                    <Plus size={18} /> RSVP (+{event.points})
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'badges' && (
          <div>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2"><Award size={24} /> My Badges</h2>
            <div className="grid grid-cols-3 gap-4">
              {badges.map((badge, i) => (
                <div key={i} className="bg-gray-900 rounded-3xl p-6 text-center hover:scale-105 transition">
                  <div className="text-6xl mb-4">{badge.icon}</div>
                  <p className="font-medium">{badge.name}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-gray-900 rounded-3xl p-8 text-center">
              <QrCode size={80} className="mx-auto mb-4 text-purple-400" />
              <p className="text-lg font-medium mb-2">Show this QR at event entry</p>
              <div className="mx-auto w-52 h-52 bg-white text-black flex items-center justify-center text-xs font-mono border-8 border-purple-500 rounded-2xl">
                CAMPUS-HUB-2026<br/>STUDENT-VERIFIED
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="bg-gray-900 rounded-3xl p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2"><FileText size={24} /> Verified Extracurricular Resume</h2>
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-6xl font-bold text-purple-400">{points}</p>
                <p className="text-sm text-gray-400">Campus Points Earned</p>
              </div>
              <div>
                <h3 className="font-medium mb-4">Events Attended ({attendedEvents.length})</h3>
                {attendedEvents.map((e, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-gray-700">
                    <span>{e.title}</span>
                    <span className="text-purple-400">+{e.points} pts</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => alert('✅ Resume PDF downloaded! (In full version it would generate a real PDF)')}
                className="w-full bg-purple-500 text-black py-6 rounded-3xl font-bold text-lg hover:bg-purple-600 transition"
              >
                DOWNLOAD VERIFIED RESUME
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-8 right-8 bg-purple-500 text-black w-14 h-14 rounded-3xl flex items-center justify-center shadow-2xl text-3xl">+</div>
    </div>
  );
}

export default App;