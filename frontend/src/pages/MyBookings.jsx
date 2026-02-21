import { useState } from "react";
import API from "../api/axios";

function MyBookings() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const { data } = await API.get(`/bookings?email=${email}`);
    setBookings(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      <div className="flex gap-3 mb-6">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-72"
        />
        <button
          onClick={fetchBookings}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {bookings.map((b) => (
        <div
          key={b._id}
          className="bg-white p-4 rounded shadow mb-3"
        >
          <h3 className="font-semibold">{b.expert.name}</h3>
          <p>Date: {b.date}</p>
          <p>Time: {b.time}</p>
          <p>Status: 
            <span className={`ml-2 ${
              b.status === "Pending"
                ? "text-yellow-500"
                : b.status === "Confirmed"
                ? "text-green-500"
                : "text-gray-500"
            }`}>
              {b.status}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;