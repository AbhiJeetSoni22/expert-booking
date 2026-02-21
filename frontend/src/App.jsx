import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Experts from "./pages/Experts";
import ExpertDetail from "./pages/ExpertDetail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">

        {/* 🔥 Navbar */}
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
          <Link to="/" className="text-xl font-bold">
            ExpertBooking
          </Link>

          <div className="space-x-4">
            <Link
              to="/"
              className="hover:bg-blue-700 px-3 py-1 rounded transition"
            >
              Experts
            </Link>

            <Link
              to="/my-bookings"
              className="hover:bg-blue-700 px-3 py-1 rounded transition"
            >
              My Bookings
            </Link>
          </div>
        </nav>

        {/* 🔥 Pages */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Experts />} />
            <Route path="/expert/:id" element={<ExpertDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </div>

        {/* 🔥 Footer */}
        <footer className="bg-gray-200 text-center py-3 text-sm text-gray-600">
          © {new Date().getFullYear()} Expert Booking System
        </footer>
      </div>
    </Router>
  );
}

export default App;