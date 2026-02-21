import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Booking() {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const date = query.get("date");
  const time = query.get("time");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/bookings", {
        expertId: id,
        ...form,
        date,
        time,
      });

      alert("Booking Successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Error booking slot");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4">Book Slot</h2>

        <p className="mb-3 text-gray-600">
          Date: {date} <br /> Time: {time}
        </p>

        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          required
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          name="notes"
          placeholder="Notes"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default Booking;