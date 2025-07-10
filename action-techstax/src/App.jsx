import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventsPage from "./components/page";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow p-4">
          <nav className="flex gap-4">
            {/* <Link to="/" className="text-blue-500 hover:underline">Home</Link> */}
            <Link to="/" className="text-blue-500 hover:underline">Events</Link>
          </nav>
        </header>

        <main className="p-6">
          <Routes>
            {/* <Route path="/" element={<h2 className="text-xl">Welcome to the Webhook Tracker</h2>} /> */}
            <Route path="/" element={<EventsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
